import express from "express";
import got from "got";
import FormData from "form-data";
import fs from "fs";

const app = express();
const PORT = process.env.PORT;
const URL = process.env.BASE_URL;

app.use(express.raw({ type: "multipart/form-data", limit: "50mb" }));

app.post("/promotion", (req, res) => {
  const tempFilePath = `temp/${Date.now()}-upload`;
  fs.writeFileSync(tempFilePath, req.body);

  const form = new FormData();
  form.append("file", fs.createReadStream(tempFilePath));

  got
    .post(URL, {
      body: form,
      headers: form.getHeaders(),
    })
    .then((uploadServiceResponse) => {
      fs.unlinkSync(tempFilePath);
      res.status(200).json({
        message: "File uploaded successfully",
        uploadServiceResponse: JSON.parse(uploadServiceResponse.body),
      });
    })
    .catch((error) => {
      fs.unlinkSync(tempFilePath);
      console.log({ error });
      res.status(500).json({ error: "Failed to upload" });
    });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from Promotion Service" });
});

app.listen(PORT, () =>
  console.log(`Promotion Service is running on port ${PORT}`),
);
