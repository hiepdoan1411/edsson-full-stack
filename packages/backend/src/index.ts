import express from "express";
import bodyParser from "body-parser";
import documentData from "./data/document.json";
import layoutData from "./data/layout.json";
import { ageValidation, nameValidation } from "./utils/validations";

interface DocumentData {
  name: string;
  age: number;
}

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
const port = 3000;

app.get("/api", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/api/definition", (req, res) => {
  const data = {
    documents: documentData.schema.fields,
    rowsA: layoutData.header.rowsA,
    rowsB: layoutData.header.rowsB,
  };
  res.status(200).json(data);
});

app.post("/api/save-document", (req, res) => {
  const { name, age } = req.body as DocumentData;
  if (!nameValidation(name)) {
    res.status(400).send("Name is invalid!");
  }
  if (!ageValidation(Number(age))) {
    res.status(400).send("Age is invalid!");
  }

  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
