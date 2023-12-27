import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationPage from "pages/RegistrationPage";
import { UserProvider } from "context/UserContext";
import LandingPage from "pages/LandingPage";
import LoginPage from "pages/LoginPage";
import Dashboard from "layouts/Dashboard";
import WelcomePage from "pages/WelcomePage";
import CreateCryptogramPage from "pages/CreateCryptogramPage";
import NoPage from "pages/NoPage";
import { DataProvider } from "./context/DataContext";
import CryptogramDetailPage from "./pages/CryptogramDetailPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCipherKeyPage from "./pages/CreateCipherKeyPage";
import CipherKeyDetailPage from "./pages/CipherKeyDetailPage";
import CryptogramListingPage from "./pages/CryptogramListingPage";
import ReportPage from "pages/ReportPage";
import { CryptogramProvider } from "./context/CryptogramContext";
import CipherKeyListingPage from "./pages/CipherKeyListingPage";
import { CipherKeyProvider } from "./context/CipherKeyContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <DataProvider>
            <CryptogramProvider>
              <CipherKeyProvider>
                <AppRoutes />
              </CipherKeyProvider>
            </CryptogramProvider>
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
      <Route path={"/register"} element={<RegistrationPage />} />
      <Route path={"/dashboard"} element={<Dashboard />}>
        <Route index element={<WelcomePage />} />
        <Route
          path={"cryptograms"}
          element={<CryptogramListingPage my={false} />}
        />
        <Route
          path={"cryptograms/my"}
          element={<CryptogramListingPage my={true} />}
        />
        <Route
          path={"cryptograms/add/:id?"}
          element={<CreateCryptogramPage edit={false} />}
        />
        <Route
          path={"cryptograms/edit/:id"}
          element={<CreateCryptogramPage edit={true} />}
        />
        <Route
          path={"cipher-keys"}
          element={<CipherKeyListingPage my={false} />}
        />
        <Route
          path={"cipher-keys/my"}
          element={<CipherKeyListingPage my={true} />}
        />
        <Route
          path={"cipher-keys/add/:id?"}
          element={<CreateCipherKeyPage edit={false} />}
        />
        <Route
          path={"cipher-keys/edit/:id"}
          element={<CreateCipherKeyPage edit={true} />}
        />
        <Route path={"cryptograms/:id"} element={<CryptogramDetailPage />} />
        <Route path={"cipher-keys/:id"} element={<CipherKeyDetailPage />} />
        <Route path={"reports"} element={<ReportPage />} />
        <Route path={"login"} element={<LoginPage />} />

        <Route path={"*"} element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
