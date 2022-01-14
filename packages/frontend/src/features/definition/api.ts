// A mock function to mimic making an async request for data
import axios from "axios";

export interface Definition {
  documents: Record<string, any>[];
  layout: Record<string, any>;
}

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 1000,
});

export const fetchData = async (): Promise<Definition> => {
  const response = await instance.get("/definition");
  return response?.data;
};

export const saveDocument = async (doc: { name: string; age: string }) => {
  const response = await instance.post("/save-document", doc);
  return response?.data;
};
