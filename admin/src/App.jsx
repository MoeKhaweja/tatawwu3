import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignIn from "./pages/signIn";
import Users from "./pages/displayUsers";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<SignIn></SignIn>} />
          <Route path='/users' element={<Users></Users>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
