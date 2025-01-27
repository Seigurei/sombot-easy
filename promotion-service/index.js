import express from "express";
import got from "got";
import FormData from "form-data";
import fs from "fs/promises";
import { createReadStream } from "fs";
import pg from "pg";

const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const UPLOAD_SERVICE_URL = process.env.UPLOAD_SERVICE_URL;

const dbClient = new pg.Client({
  connectionString: DATABASE_URL,
});

dbClient
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => {
    console.error("Error connecting to PostgreSQL:", err.message);
    throw new Error("Failed to connect to PostgreSQL");
  });

app.use(express.raw({ type: "multipart/form-data", limit: "50mb" }));

app.post("/promotion", async (req, res) => {
  console.log("Received request to /promotion");

  const tempFilePath = `temp/${Date.now()}-upload`;
  console.log(`Temporary file path: ${tempFilePath}`);

  try {
    await fs.writeFile(tempFilePath, req.body);
    console.log("File written to temporary path");

    const form = new FormData();
    form.append("file", createReadStream(tempFilePath));
    console.log("File added to FormData for upload");

    const uploadServiceResponse = await got.post(UPLOAD_SERVICE_URL, {
      body: form,
      headers: form.getHeaders(),
    });

    console.log("Received response from Upload Service");
    console.log("Upload Service Response:", uploadServiceResponse.body);

    const responseBody = JSON.parse(uploadServiceResponse.body);
    const fileUrl = responseBody.file.url;
    console.log(`Extracted file URL: ${fileUrl}`);

    const dbResponse = await dbClient.query(
      "INSERT INTO promotions (file_url, created_at) VALUES ($1, NOW()) RETURNING *",
      [fileUrl],
    );
    console.log("File URL inserted into database:", dbResponse.rows[0]);

    await fs.unlink(tempFilePath);
    console.log("Temporary file deleted");

    res.status(200).json({
      message: "File uploaded and forwarded successfully",
      uploadServiceResponse: responseBody,
    });
  } catch (error) {
    console.error("Error during process:", error.message);
    console.error("Stack trace:", error.stack);

    try {
      await fs.unlink(tempFilePath);
      console.log("Temporary file deleted after error");
    } catch (unlinkError) {
      console.error("Failed to delete temporary file:", unlinkError.message);
    }

    res.status(500).json({
      error: "Failed to upload and forward file",
      details: error.message,
    });

    throw new Error(error.message);
  }
});

app.get("/promotions", async (req, res) => {
  console.log("Received request to /promotions");
  try {
    const result = await dbClient.query("SELECT * FROM promotions");
    console.log("Fetched promotions from database:", result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching promotions:", error.message);
    console.error("Stack trace:", error.stack);

    res
      .status(500)
      .json({ error: "Failed to fetch promotions", details: error.message });

    throw new Error(error.message);
  }
});

app.get("/", (req, res) => {
  console.log("Received request to /");
  res.status(200).json({ message: "Hello from Promotion Service" });
});

app.listen(PORT, () => {
  console.log(`Promotion Service is running on port ${PORT}`);
});
