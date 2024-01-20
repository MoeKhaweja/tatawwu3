import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

export default function Users() {
  const [editRows, setEditRows] = useState([]);
  useEffect(() => {
    try {
      const response = axios.get("http://127.0.0.1:8000/admin/");
      console.log(response.data);
    } catch {}
  }, []);
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      role: "admin",
      verified: true,
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      role: "volunteer",
      verified: false,
    },
    // Add more users as needed
  ]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 70, flex: 1 },
    { field: "firstName", headerName: "First name", minWidth: 130, flex: 1 },
    { field: "lastName", headerName: "Last name", minWidth: 130, flex: 1 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "role", headerName: "Role", minWidth: 130, flex: 1 },
    {
      field: "verified",
      headerName: "Verified",
      minWidth: 130,
      renderCell: (params) => (params.value ? "true" : "false"),
      flex: 1,
    },
    {
      field: "identificationImage",
      headerName: "ID Image",
      minWidth: 200,
      renderCell: (params) => (
        <img
          src={params.value}
          alt='ID'
          style={{ width: "50px", height: "50px" }}
        />
      ),
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <>
          {editRows.includes(params.row.id) ? (
            <IconButton
              color='primary'
              onClick={() => handleSave(params.row.id)}
            >
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton
              color='primary'
              onClick={() => handleEdit(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            color='secondary'
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleEdit = (id) => {
    setEditRows((prev) => [...prev, id]);
  };

  const handleSave = (id) => {
    // Handle save operation here
    console.log("Save user:", id, editRows);
    setEditRows((prev) => prev.filter((rowId) => rowId !== id));
  };

  const handleDelete = (id) => {
    // Handle delete operation here
    console.log("Delete user:", id);
  };

  const handleFieldChange = (id, field, value) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, [field]: value } : user))
    );
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        autoHeight
        sx={{
          ".MuiDataGrid-columnHeader": {
            backgroundColor: "#F77C47",
            color: "white",
          },
        }}
        rows={users}
        columns={columns.map((column) => ({
          ...column,
          renderCell: (params) =>
            column.field !== "actions" &&
            column.field !== "identificationImage" &&
            column.field !== "id" &&
            editRows.includes(params.row.id) ? (
              <TextField
                value={params.value}
                onChange={(e) =>
                  handleFieldChange(params.row.id, column.field, e.target.value)
                }
              />
            ) : column.renderCell ? (
              column.renderCell(params)
            ) : (
              params.value
            ),
        }))}
      />
    </div>
  );
}
