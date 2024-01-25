import { AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/", { replace: true });
  };

  return (
    <AppBar position='fixed' sx={{ backgroundColor: "#0f2837" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <img
          src='/logo.png'
          alt='Logo'
          style={{ width: "60px", padding: "10px" }}
        />

        <Button color='inherit' onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
