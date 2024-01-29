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
  CircularProgress,
} from "@mui/material";
import "./index.css";
import Navbar from "../../components/navBar";

const UserTable = () => {
  const [users, setUsers] = useState([]);
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
        const response = await axios.get("http://51.44.24.252:80/admin/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Add loading property to each user
        const usersWithLoading = response.data.map((user) => ({
          ...user,
          loading: false,
        }));

        setUsers(usersWithLoading);
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

  const handleVerifyUser = async (userId) => {
    try {
      // Find the user by ID
      const userToVerify = users.find((user) => user._id === userId);

      // Update the loading state for the specific user
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, loading: true } : user
        )
      );

      const token = await localStorage.getItem("jwt");
      const response = await axios.post(
        "http://51.44.24.252:80/admin/update",
        { userId: userId, verified: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data?.verified === true) {
        // Update the verified state and loading state for the specific user
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId
              ? { ...user, verified: true, loading: false }
              : user
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
    }
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
      {currentUsers && (
        <>
          {currentUsers.some((user) => user.loading) && <CircularProgress />}
          <table className='user-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Verified</th>
                <th>ID Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => {
                if (user.role === "admin") return null;
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
                        src={`http://51.44.24.252:80/images/${user.identificationImage}`}
                        alt='ID'
                        style={{
                          width: "50px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleImageClick(
                            `http://51.44.24.252:80/images/${user.identificationImage}`
                          )
                        }
                      />
                    </td>
                    <td>
                      {user.verified ? (
                        "Verified"
                      ) : (
                        <button onClick={() => handleVerifyUser(user._id)}>
                          {user.loading ? (
                            <CircularProgress size={20} color='inherit' />
                          ) : (
                            "Verify"
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='pagination'>
            <ul>
              {Array.from({
                length: Math.ceil(users.length / usersPerPage),
              }).map((item, index) => (
                <li key={index}>
                  <button onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
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
