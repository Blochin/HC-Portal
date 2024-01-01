import { Sidebar } from "flowbite-react";
import {
  HiArchive,
  HiDocumentReport,
  HiKey,
  HiLockClosed,
  HiLogin,
  HiLogout,
  HiOutlineKey,
  HiUsers,
} from "react-icons/hi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HiBolt } from "react-icons/hi2";
import api from "../utils/api";
import { useUser } from "../context/UserContext";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const handleLogout = () => {
    api
      .get("api/logout")
      .then((response) => {
        logout();
        console.log(response);
        navigate(`/dashboard`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex h-screen">
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Logo
          className="mr-3 h-6 sm:h-9 invert"
          href="#"
          img="/logo.png"
          imgAlt="Flowbite logo"
        >
          <div className={"text-gray-200"}>HC PORTAL</div>
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {user && (
              <Sidebar.Item icon={HiLockClosed}>
                <Link to={"/dashboard/cryptograms/add"}>Add Cryptogram</Link>
              </Sidebar.Item>
            )}

            {user && (
              <Sidebar.Item icon={HiKey}>
                <Link to={"/dashboard/cipher-keys/add"}>Add Cipher Key</Link>
              </Sidebar.Item>
            )}

            <Sidebar.Item icon={HiArchive}>
              <Link to={"/dashboard/cryptograms"}>Cryptograms</Link>
            </Sidebar.Item>

            {user && (
              <Sidebar.Item icon={HiUsers}>
                <Link to={"/dashboard/cryptograms/my"}>My Cryptograms</Link>
              </Sidebar.Item>
            )}

            <Sidebar.Item icon={HiOutlineKey}>
              <Link to={"/dashboard/cipher-keys"}>Cipher Keys</Link>
            </Sidebar.Item>
            {user && (
              <Sidebar.Item icon={HiBolt}>
                <Link to={"/dashboard/cipher-keys/my"}>My Cipher Keys</Link>
              </Sidebar.Item>
            )}

            <Sidebar.Item icon={HiDocumentReport}>
              <Link to={"/dashboard/reports"}>Reports</Link>
            </Sidebar.Item>
            {user && (
              <Sidebar.Item icon={HiLogout}>
                <div onClick={handleLogout} className={"cursor-pointer"}>
                  Logout
                </div>
              </Sidebar.Item>
            )}
            {!user && (
              <Sidebar.Item icon={HiLogin}>
                <Link to={"/dashboard/login"}>Login</Link>
              </Sidebar.Item>
            )}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="flex-grow p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
