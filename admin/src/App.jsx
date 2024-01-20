import { useState } from "react";

import "./App.css";
import SignIn from "./pages/signIn";
import Users from "./pages/displayUsers";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: "#68B6BA", // Change this to your desired body color
          },
        },
      },
      MuiDataGridHeaderCell: {
        styleOverrides: {
          colCell: {
            backgroundColor: "#999", // Change this to your desired header color
          },
        },
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Users></Users> */}
        <SignIn></SignIn>
      </ThemeProvider>
    </>
  );
}

export default App;
