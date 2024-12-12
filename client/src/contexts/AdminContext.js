import React, { createContext, useState, useEffect } from "react";
import { getAllUsers } from "../api/adminApi";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <AdminContext.Provider value={{ users, loading, setUsers }}>
      {children}
    </AdminContext.Provider>
  );
};
