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

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </UserProvider>
    </BrowserRouter>
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
        <Route path={"cryptograms/add"} element={<CreateCryptogramPage />} />
        <Route path={"*"} element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
