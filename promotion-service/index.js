import express from "express";
import got from "got";
import FormData from "form-data";
import fs from "fs/promises";
import { createReadStream } from "fs";
import * as path from "path";
import pg from "pg";

const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const UPLOAD_SERVICE_URL = process.env.UPLOAD_SERVICE_URL;

const dbClient = new pg.Client({
  connectionString: DATABASE_URL,
});

dbClient.connect().catch((err) => {
  throw new Error("Failed to connect to PostgreSQL");
});

app.use(express.raw({ type: "multipart/form-data", limit: "50mb" }));

app.post("/promotion", async (req, res) => {
  const tempFilePath = `temp/${Date.now()}-upload`;

  try {
    await fs.writeFile(tempFilePath, req.body);

    const form = new FormData();
    form.append("file", createReadStream(tempFilePath));

    const uploadServiceResponse = await got.post(UPLOAD_SERVICE_URL, {
      body: form,
      headers: form.getHeaders(),
    });

    const responseBody = JSON.parse(uploadServiceResponse.body);
    const fileUrl = responseBody.file.url;

    if (!path.extname(fileUrl)) {
      throw new Error("File URL does not contain an extension");
    }

    const dbResponse = await dbClient.query(
      "INSERT INTO promotions (file_url, created_at) VALUES ($1, NOW()) RETURNING *",
      [fileUrl],
    );

    await fs.unlink(tempFilePath);

    res.status(200).json({
      message: "File uploaded and forwarded successfully",
      uploadServiceResponse: responseBody,
    });
  } catch (error) {
    try {
      await fs.unlink(tempFilePath);
    } catch {}

    res.status(500).json({
      error: "Failed to upload and forward file",
      details: error.message,
    });

    throw new Error(error.message);
  }
});

app.get("/promotions", async (req, res) => {
  try {
    const result = await dbClient.query("SELECT * FROM promotions");
    res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch promotions", details: error.message });

    throw new Error(error.message);
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from Promotion Service" });
});

app.listen(PORT, () => {});
