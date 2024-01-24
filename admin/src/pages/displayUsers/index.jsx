/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
const dummyUsers = [
  {
    _id: "1",
    firstName: "User1",
    lastName: "LastName1",
    email: "user1@example.com",
    role: "User",
    verified: false,
    identificationImage: "image1.jpg",
  },
  {
    _id: "2",
    firstName: "User2",
    lastName: "LastName2",
    email: "user2@example.com",
    role: "Admin",
    verified: false,
    identificationImage: "image2.jpg",
  },
  {
    _id: "3",
    firstName: "User3",
    lastName: "LastName3",
    email: "user3@example.com",
    role: "User",
    verified: true,
    identificationImage: "image3.jpg",
  },
  {
    _id: "4",
    firstName: "User4",
    lastName: "LastName4",
    email: "user4@example.com",
    role: "Admin",
    verified: false,
    identificationImage: "image4.jpg",
  },
  {
    _id: "5",
    firstName: "User5",
    lastName: "LastName5",
    email: "user5@example.com",
    role: "User",
    verified: true,
    identificationImage: "image5.jpg",
  },
  {
    _id: "6",
    firstName: "User6",
    lastName: "LastName6",
    email: "user6@example.com",
    role: "Admin",
    verified: true,
    identificationImage: "image6.jpg",
  },
  {
    _id: "7",
    firstName: "User7",
    lastName: "LastName7",
    email: "user7@example.com",
    role: "User",
    verified: false,
    identificationImage: "image7.jpg",
  },
  {
    _id: "8",
    firstName: "User8",
    lastName: "LastName8",
    email: "user8@example.com",
    role: "Admin",
    verified: true,
    identificationImage: "image8.jpg",
  },
  {
    _id: "9",
    firstName: "User9",
    lastName: "LastName9",
    email: "user9@example.com",
    role: "User",
    verified: false,
    identificationImage: "image9.jpg",
  },
  {
    _id: "10",
    firstName: "User10",
    lastName: "LastName10",
    email: "user10@example.com",
    role: "Admin",
    verified: true,
    identificationImage: "image10.jpg",
  },
  {
    _id: "11",
    firstName: "User11",
    lastName: "LastName11",
    email: "user11@example.com",
    role: "User",
    verified: true,
    identificationImage: "image11.jpg",
  },
  {
    _id: "12",
    firstName: "User12",
    lastName: "LastName12",
    email: "user12@example.com",
    role: "Admin",
    verified: false,
    identificationImage: "image12.jpg",
  },
  {
    _id: "13",
    firstName: "User13",
    lastName: "LastName13",
    email: "user13@example.com",
    role: "User",
    verified: false,
    identificationImage: "image13.jpg",
  },
  {
    _id: "14",
    firstName: "User14",
    lastName: "LastName14",
    email: "user14@example.com",
    role: "Admin",
    verified: true,
    identificationImage: "image14.jpg",
  },
  {
    _id: "15",
    firstName: "User15",
    lastName: "LastName15",
    email: "user15@example.com",
    role: "User",
    verified: false,
    identificationImage: "image15.jpg",
  },
  {
    _id: "16",
    firstName: "User16",
    lastName: "LastName16",
    email: "user16@example.com",
    role: "Admin",
    verified: true,
    identificationImage: "image16.jpg",
  },
  {
    _id: "17",
    firstName: "User17",
    lastName: "LastName17",
    email: "user17@example.com",
    role: "User",
    verified: true,
    identificationImage: "image17.jpg",
  },
  {
    _id: "18",
    firstName: "User18",
    lastName: "LastName18",
    email: "user18@example.com",
    role: "Admin",
    verified: false,
    identificationImage: "image18.jpg",
  },
  {
    _id: "19",
    firstName: "User19",
    lastName: "LastName19",
    email: "user19@example.com",
    role: "User",
    verified: true,
    identificationImage: "image19.jpg",
  },
  {
    _id: "20",
    firstName: "User20",
    lastName: "LastName20",
    email: "user20@example.com",
    role: "Admin",
    verified: false,
    identificationImage: "image20.jpg",
  },
];

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = await localStorage.getItem("jwt");
        const response = await axios.get("http://127.0.0.1:8000/admin/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(response.data);
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
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleVerifyUser = (userId) => {
    // Add your logic to handle user verification using the userId
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
          {currentUsers.map((user) => (
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
                  style={{ width: "50px", height: "30px", cursor: "pointer" }}
                  onClick={() =>
                    handleImageClick(
                      `http://127.0.0.1:8000/images/${user.identificationImage}`
                    )
                  }
                />
              </td>
              <td>
                <button onClick={() => handleVerifyUser(user._id)}>
                  Verify
                </button>
              </td>
            </tr>
          ))}
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
