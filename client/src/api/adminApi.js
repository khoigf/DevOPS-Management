import axios from "axios";
import { API_BASE_URL } from "../utils/apiConfig";

export const getAllUsers = () => axios.get(`${API_BASE_URL}/users`);
export const createUser = (data) => axios.post(`${API_BASE_URL}/users`, data);
export const updateUser = (userId, data) => axios.put(`${API_BASE_URL}/users/${userId}`, data);
export const deleteUser = (userId) => axios.delete(`${API_BASE_URL}/users/${userId}`);
