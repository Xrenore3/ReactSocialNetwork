export const required = (value) =>
  value || typeof value === "number" ? undefined : "Required";

export const maxLengthCreator = (max) => (value) =>
  value && value.length > max ? `Max is ${max}` : undefined;
