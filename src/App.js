import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationPage from "pages/RegistrationPage";
import { UserProvider } from "context/UserContext";
import LandingPage from "pages/LandingPage";
import LoginPage from "pages/LoginPage";
import Dashboard from "layouts/Dashboard";
import WelcomePage from "pages/WelcomePage";
import CryptogramListingPage from "pages/CryptogramListingPage";
import CreateCryptogramPage from "pages/CreateCryptogramPage";
import NoPage from "pages/NoPage";
import { DataProvider } from "./context/DataContext";
import CryptogramDetailPage from "./pages/CryptogramDetailPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCipherKeyPage from "./pages/CreateCipherKeyPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <DataProvider>
            <AppRoutes />
            <ToastContainer />
          </DataProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}
function AppRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<LandingPage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/register"} element={<RegistrationPage />} />
      <Route path={"/dashboard"} element={<Dashboard />}>
        <Route index element={<WelcomePage />} />
        <Route path={"cryptograms"} element={<CryptogramListingPage />} />
        <Route
          path={"cryptograms/add/:id?"}
          element={<CreateCryptogramPage />}
        />
        <Route
          path={"cipher-keys/add/:id?"}
          element={<CreateCipherKeyPage />}
        />
        <Route path={"cryptograms/:id"} element={<CryptogramDetailPage />} />
        <Route path={"*"} element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
