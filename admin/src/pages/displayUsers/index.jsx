/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress, // Import CircularProgress from MUI
} from "@mui/material";
import "./index.css";
import Navbar from "../../components/navBar";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingVerification, setLoadingVerification] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = await localStorage.getItem("jwt");
        const response = await axios.get("http://127.0.0.1:8000/admin/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(response.data);
        setLoadingUsers(false);
      } catch (error) {
        setLoadingUsers(false);
        if (axios.isAxiosError(error)) {
          console.error("Axios Error:", error.message);
        } else {
          console.error("Error:", error.message);
        }
      }
    }

    fetchUsers();
  }, []);

  const handleVerifyUser = async (userId) => {
    try {
      setLoadingVerification(true);
      const token = await localStorage.getItem("jwt");
      const response = await axios.post(
        "http://127.0.0.1:8000/admin/update",
        { userId: userId, verified: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data?.verified === true) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, verified: true } : user
          )
        );
      }

      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message);
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setLoadingVerification(false);
    }

    console.log(`Verifying user with ID: ${userId}`);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar></Navbar>
      {loadingUsers && <CircularProgress />}
      {/* Show loading indicator while fetching users */}
      <table className='user-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Identification Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => {
            if (user.role == "admin") return;
            else {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.verified ? "Yes" : "No"}</td>
                  <td>
                    <img
                      src={`http://127.0.0.1:8000/images/${user.identificationImage}`}
                      alt='ID'
                      style={{
                        width: "50px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleImageClick(
                          `http://127.0.0.1:8000/images/${user.identificationImage}`
                        )
                      }
                    />
                  </td>
                  <td>
                    {user.verified ? (
                      "Verified"
                    ) : (
                      <button onClick={() => handleVerifyUser(user._id)}>
                        {loadingVerification ? (
                          <CircularProgress size={20} color='inherit' />
                        ) : (
                          "Verify"
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <div className='pagination'>
        <ul>
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
            (item, index) => (
              <li key={index}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            )
          )}
        </ul>
      </div>
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
};

export default UserTable;
