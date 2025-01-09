import axios from "axios";
import { API_BASE_URL } from "../utils/apiConfig";

// Lấy danh sách dự án theo user_id
export const getProjects = async (user_id) => {
  const response = await axios.get(`${API_BASE_URL}/user/projects/all/${user_id}`);
  return response.data;
};

// Lấy thông tin dự án theo project_id
export const getProjectById = async (project_id) => {
  const response = await axios.get(`${API_BASE_URL}/user/projects/${project_id}`);
  return response.data;
};

// Thêm dự án mới
export const addProject = async (user_id, projectData) => {
  const response = await axios.post(`${API_BASE_URL}/user/projects/${user_id}`, projectData);
  return response.data;
};

// Cập nhật thông tin dự án
export const updateProject = async (project_id, projectData) => {
  const response = await axios.put(`${API_BASE_URL}/user/projects/${project_id}`, projectData);
  return response.data;
};

// Xóa dự án
export const deleteProject = async (project_id) => {
  const response = await axios.delete(`${API_BASE_URL}/user/projects/${project_id}`);
  return response.data;
};
