import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

export default function Users() {
  const [editRows, setEditRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = await localStorage.getItem("jwt");
        const response = await axios.get("http://127.0.0.1:8000/admin/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formattedUsers = response.data.map((user) => ({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          verified: user.verified,
          identificationImage: user.identificationImage,
        }));

        setUsers(formattedUsers);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios Error:", error.message);
        } else {
          console.error("Error:", error.message);
        }
      }
    }
    fetchUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 220, flex: 1 },
    { field: "firstName", headerName: "First name", minWidth: 130, flex: 1 },
    { field: "lastName", headerName: "Last name", minWidth: 130, flex: 1 },
    { field: "email", headerName: "Email", minWidth: 250, flex: 1 },
    { field: "role", headerName: "Role", minWidth: 60, flex: 1 },
    {
      field: "verified",
      headerName: "Verified",
      minWidth: 60,
      renderCell: (params) => (params.value ? "true" : "false"),
      flex: 1,
    },
    {
      field: "identificationImage",
      headerName: "ID Image",
      minWidth: 60,
      renderCell: (params) => (
        <img
          src={`http://127.0.0.1:8000/images/${params.value}`}
          alt='ID'
          style={{ width: "50px", height: "30px", cursor: "pointer" }}
          onClick={() =>
            handleImageClick(`http://127.0.0.1:8000/images/${params.value}`)
          }
        />
      ),
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
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

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleFieldChange = (id, field, value) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, [field]: value } : user))
    );
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{
          ".MuiDataGrid-columnHeader": {
            backgroundColor: "#F77C47",
            color: "white",
          },
        }}
        autoHeight
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

      <Dialog open={Boolean(selectedImage)} onClose={handleClose}>
        <DialogTitle>ID Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <img src={selectedImage} alt='ID' style={{ maxWidth: "100%" }} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
