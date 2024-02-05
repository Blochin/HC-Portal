import { Sidebar } from "flowbite-react";
import {
  HiArchive,
  HiDatabase,
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
import useWindowResize from "../hooks/useWindowsResize";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const isCollapsed = useWindowResize(640);

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
      <Sidebar collapsed={isCollapsed} aria-label="Default sidebar example">
        <Sidebar.Logo
          className="mr-3 w-full h-6 sm:h-9 invert"
          href="#"
          img="/logo.png"
          imgAlt="Flowbite logo"
        >
          <div className={"text-gray-200"}>HC PORTAL</div>
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {user && (
              <Sidebar.Item
                icon={HiLockClosed}
                active={location.pathname === "/dashboard/cryptograms/add"}
              >
                <Link to={"/dashboard/cryptograms/add"}>Add Cryptogram</Link>
              </Sidebar.Item>
            )}

            <Sidebar.Item
              icon={HiArchive}
              active={location.pathname === "/dashboard/cryptograms"}
            >
              <Link to={"/dashboard/cryptograms"}>Cryptograms</Link>
            </Sidebar.Item>

            {user && (
              <Sidebar.Item
                icon={HiUsers}
                active={location.pathname === "/dashboard/cryptograms/my"}
              >
                <Link to={"/dashboard/cryptograms/my"}>My Cryptograms</Link>
              </Sidebar.Item>
            )}
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            {user && (
              <Sidebar.Item
                icon={HiKey}
                active={location.pathname === "/dashboard/cipher-keys/add"}
              >
                <Link to={"/dashboard/cipher-keys/add"}>Add Cipher Key</Link>
              </Sidebar.Item>
            )}

            <Sidebar.Item
              icon={HiOutlineKey}
              active={location.pathname === "/dashboard/cipher-keys"}
            >
              <Link to={"/dashboard/cipher-keys"}>Cipher Keys</Link>
            </Sidebar.Item>
            {user && (
              <Sidebar.Item
                icon={HiBolt}
                active={location.pathname === "/dashboard/cipher-keys/my"}
              >
                <Link to={"/dashboard/cipher-keys/my"}>My Cipher Keys</Link>
              </Sidebar.Item>
            )}
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              icon={HiDocumentReport}
              active={location.pathname === "/dashboard/reports"}
            >
              <Link to={"/dashboard/reports"}>Reports</Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            {!user && (
              <Sidebar.Item
                icon={HiLogin}
                active={location.pathname === "/dashboard/login"}
              >
                <Link to={"/dashboard/login"}>Login</Link>
              </Sidebar.Item>
            )}
            {user && (
              <Sidebar.Item icon={HiLogout}>
                <div onClick={handleLogout} className={"cursor-pointer"}>
                  Logout
                </div>
              </Sidebar.Item>
            )}
          </Sidebar.ItemGroup>
          {user && user.first_name === "Administrator" && (
            <Sidebar.ItemGroup>
              <Sidebar.Item
                icon={HiDatabase}
                active={location.pathname === "/dashboard/migration"}
              >
                <Link to={"/dashboard/migration"}>Migration</Link>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          )}
        </Sidebar.Items>
      </Sidebar>
      <div className="flex-grow p-1 md:p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
