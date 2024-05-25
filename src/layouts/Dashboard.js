import { Dropdown, Navbar, Sidebar } from "flowbite-react";
import {
  HiArchive,
  HiChevronDown,
  HiDocumentReport,
  HiHome,
  HiKey,
  HiLockClosed,
  HiLogin,
  HiMenu,
  HiMenuAlt1,
  HiOutlineKey,
  HiUsers,
} from "react-icons/hi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { HiBolt } from "react-icons/hi2";
import api from "../utils/api";
import { useUser } from "../context/UserContext";
import useWindowResize from "../hooks/useWindowsResize";
import { sidebarTheme } from "../themes/SIdebarTheme";
import { useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const isCollapsed = useWindowResize(767);
  const [isHidden, setIsHidden] = useState(false);

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

  const location = useLocation();

  const isCurrentPage = (url) => {
    return location.pathname === url;
  };

  const handleSidebar = () => {
    setIsHidden(!isHidden);
  };

  const renderNavbarMenu = (user) => {
    return (
      <>
        <Link
          className={`text-gray-700 p-2 ${
            isCurrentPage("/dashboard") && "bg-gray-200"
          }`}
          to={"/dashboard"}
        >
          Home
        </Link>
        <Link
          className={`text-gray-700 p-2 ${
            isCurrentPage("/dashboard/cryptograms") && "bg-gray-200"
          }`}
          to={"/dashboard/cryptograms"}
        >
          Cryptograms
        </Link>
        <Link
          className={`text-gray-700 p-2 ${
            isCurrentPage("/dashboard/cipher-keys") && "bg-gray-200"
          }`}
          to={"/dashboard/cipher-keys"}
        >
          Cipher Keys
        </Link>
        {user && (
          <>
            <Link
              className={`text-gray-700 p-2 ${
                isCurrentPage("/dashboard/cryptograms/add") && "bg-gray-200"
              }`}
              to={"/dashboard/cryptograms/add"}
            >
              Add Cryptograms
            </Link>
            <Link
              className={`text-gray-700 p-2 ${
                isCurrentPage("/dashboard/cryptograms/my") && "bg-gray-200"
              }`}
              to={"/dashboard/cryptograms/my"}
            >
              My Cryptograms
            </Link>
            <Link
              className={`text-gray-700 p-2 ${
                isCurrentPage("/dashboard/cipher-keys/add") && "bg-gray-200"
              }`}
              to={"/dashboard/cipher-keys/add"}
            >
              Add Cipher Keys
            </Link>
            <Link
              className={`text-gray-700 p-2 ${
                isCurrentPage("/dashboard/cipher-keys/my") && "bg-gray-200"
              }`}
              to={"/dashboard/cipher-keys/my"}
            >
              My Cipher Keys
            </Link>
          </>
        )}
        <Link
          className={`text-gray-700 p-2 ${
            isCurrentPage("/dashboard/reports") && "bg-gray-200"
          }`}
          to={"/dashboard/reports"}
        >
          Reports
        </Link>
        {user ? (
          <div className={"text-gray-700 p-2"} onClick={handleLogout}>
            Logout
          </div>
        ) : (
          <Link
            className={`text-gray-700 p-2 ${
              isCurrentPage("/dashboard/login") && "bg-gray-200"
            }`}
            to={"/dashboard/login"}
          >
            Login
          </Link>
        )}
      </>
    );
  };

  const renderSidebarMenu = (user) => {
    if (!user) {
      return (
        <Sidebar.ItemGroup>
          <Sidebar.Item
            icon={HiHome}
            active={location.pathname === "/dashboard"}
          >
            <Link to={"/dashboard"}>Home</Link>
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiLockClosed}
            active={location.pathname === "/dashboard/cryptograms"}
          >
            <Link to={"/dashboard/cryptograms"}>Cryptograms</Link>
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiKey}
            active={location.pathname === "/dashboard/cipher-keys"}
          >
            <Link to={"/dashboard/cipher-keys"}>Cipher Keys</Link>
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiArchive}
            active={location.pathname === "/dashboard/reports"}
          >
            <Link to={"/dashboard/reports"}>Reports</Link>
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiLogin}
            active={location.pathname === "/dashboard/login"}
          >
            <Link to={"/dashboard/login"}>Login</Link>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      );
    } else {
      return (
        <>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              icon={HiHome}
              active={location.pathname === "/dashboard"}
            >
              <Link to={"/dashboard"}>Home</Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              icon={HiLockClosed}
              active={location.pathname === "/dashboard/cryptograms/add"}
            >
              <Link to={"/dashboard/cryptograms/add"}>Add Cryptogram</Link>
            </Sidebar.Item>
            <Sidebar.Item
              icon={HiUsers}
              active={location.pathname === "/dashboard/cryptograms/my"}
            >
              <Link to={"/dashboard/cryptograms/my"}>My Cryptograms</Link>
            </Sidebar.Item>
            <Sidebar.Item
              icon={HiArchive}
              active={location.pathname === "/dashboard/cryptograms"}
            >
              <Link to={"/dashboard/cryptograms"}>Cryptograms</Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              icon={HiKey}
              active={location.pathname === "/dashboard/cipher-keys/add"}
            >
              <Link to={"/dashboard/cipher-keys/add"}>Add Cipher Key</Link>
            </Sidebar.Item>
            <Sidebar.Item
              icon={HiOutlineKey}
              active={location.pathname === "/dashboard/cipher-keys/my"}
            >
              <Link to={"/dashboard/cipher-keys/my"}>My Cipher Keys</Link>
            </Sidebar.Item>
            <Sidebar.Item
              icon={HiBolt}
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
        </>
      );
    }
  };

  return (
    <div className={"h-full"}>
      <Navbar
        className={"bg-gray-50 border-gray-300 border-b sticky  top-0 z-10"}
        fluid
        rounded
      >
        <div className={"flex flex-row items-center gap-2 "}>
          <Navbar.Toggle />
          {isHidden && !isCollapsed && (
            <HiMenu
              className={"text-gray-500 cursor-pointer"}
              size={26}
              onClick={handleSidebar}
            />
          )}
          {!isHidden && !isCollapsed && (
            <HiMenuAlt1
              className={"text-gray-500 cursor-pointer"}
              size={26}
              onClick={handleSidebar}
            />
          )}
          <Navbar.Brand href="https://hcportal.eu/">
            <img
              className="mr-3 w-9 h-9  sm:w-10 sm:h-10 invert"
              src="/logo.png"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              HCPortal
            </span>
          </Navbar.Brand>
        </div>
        <div className="flex md:order-2">
          {user && (
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
          )}
        </div>

        {isCollapsed && (
          <Navbar.Collapse className={"text-center"}>
            {renderNavbarMenu(user)}
          </Navbar.Collapse>
        )}
      </Navbar>
      <div className="h-full flex">
        <Sidebar
          hidden={isCollapsed}
          collapsed={isCollapsed || isHidden}
          theme={sidebarTheme}
        >
          <Sidebar.Items>{renderSidebarMenu(user)}</Sidebar.Items>
        </Sidebar>
        <div className="min-h-screen w-full p-2  md:p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
