import { createUser, updateUser, deleteUser } from "../api/adminApi";

export const addNewUser = async (data) => {
  if (!data.username || !data.email || !data.role) {
    throw new Error("All fields are required");
  }
  return await createUser(data);
};

export const modifyUser = async (userId, data) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  return await updateUser(userId, data);
};

export const removeUser = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  return await deleteUser(userId);
};
