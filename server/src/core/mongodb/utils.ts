import { ObjectId } from "mongodb";

export const convertToObjectId = (id: ObjectId | string): ObjectId => {
  if (typeof id === "string") {
    return new ObjectId(id);
  } else {
    return id;
  }
};

export const createdTimestamp = () => {
  const now = new Date();
  return { createdAt: now, updatedAt: now };
};

export const updatedTimestamp = () => {
  const now = new Date();
  return { updatedAt: now };
};
