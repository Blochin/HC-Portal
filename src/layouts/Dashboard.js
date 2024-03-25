import { Dropdown, Sidebar } from "flowbite-react";
import {
  HiArchive,
  HiChevronDown,
  HiDocumentReport,
  HiHome,
  HiKey,
  HiLockClosed,
  HiLogin,
  HiOutlineKey,
  HiUsers,
} from "react-icons/hi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HiBolt, HiUser } from "react-icons/hi2";
import api from "../utils/api";
import { useUser } from "../context/UserContext";
import useWindowResize from "../hooks/useWindowsResize";
import { sidebarTheme } from "../themes/SIdebarTheme";

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
      <Sidebar collapsed={isCollapsed} theme={sidebarTheme}>
        <Sidebar.Logo
          className="mr-3 w-full h-6 sm:h-9 invert"
          href="https://hcportal.eu/"
          img="/logo.png"
          imgAlt="Flowbite logo"
        >
          <div className={"text-gray-200"}>HC PORTAL</div>
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup></Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            {user && (
              <Sidebar.Item icon={HiUser}>
                <Dropdown
                  label={"Settings"}
                  renderTrigger={() => (
                    <div
                      className={
                        " cursor-pointer flex flex-row justify-between items-center"
                      }
                    >
                      <span>{user.first_name}</span>
                      <HiChevronDown />
                    </div>
                  )}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">
                      {user.first_name + " " + user.last_name}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {user.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item onClick={handleLogout}>
                    <div className={"cursor-pointer w-full"}>Logout</div>
                  </Dropdown.Item>
                </Dropdown>
              </Sidebar.Item>
            )}
            <Sidebar.Item
              icon={HiHome}
              active={location.pathname === "/dashboard"}
            >
              <Link to={"/dashboard"}>Home</Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            {user && (
              <Sidebar.Item
                icon={HiLockClosed}
                active={location.pathname === "/dashboard/cryptograms/add"}
              >
                <Link to={"/dashboard/cryptograms/add"}>Add Cryptogram</Link>
              </Sidebar.Item>
            )}
            {user && (
              <Sidebar.Item
                icon={HiUsers}
                active={location.pathname === "/dashboard/cryptograms/my"}
              >
                <Link to={"/dashboard/cryptograms/my"}>My Cryptograms</Link>
              </Sidebar.Item>
            )}
            <Sidebar.Item
              icon={HiArchive}
              active={location.pathname === "/dashboard/cryptograms"}
            >
              <Link to={"/dashboard/cryptograms"}>Cryptograms</Link>
            </Sidebar.Item>
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
            {user && (
              <Sidebar.Item
                icon={HiBolt}
                active={location.pathname === "/dashboard/cipher-keys/my"}
              >
                <Link to={"/dashboard/cipher-keys/my"}>My Cipher Keys</Link>
              </Sidebar.Item>
            )}
            <Sidebar.Item
              icon={HiOutlineKey}
              active={location.pathname === "/dashboard/cipher-keys"}
            >
              <Link to={"/dashboard/cipher-keys"}>Cipher Keys</Link>
            </Sidebar.Item>
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
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="w-full p-1 md:p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
