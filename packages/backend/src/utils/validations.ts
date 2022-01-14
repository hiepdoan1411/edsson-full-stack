import documentData from "../data/document.json";

export const nameValidation = (value: string): boolean => {
  if (typeof value !== "string") {
    return false;
  }
  return value.length < documentData?.schema?.fields?.[0]?.maxLength;
};

export const ageValidation = (value: number): boolean => {
  return typeof value === "number";
};
