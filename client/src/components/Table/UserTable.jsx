import React from "react";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.user_id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => onDelete(user)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
