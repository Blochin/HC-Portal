import { Sidebar } from "flowbite-react";
import { HiKey, HiLockClosed } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiLockClosed}>
              <Link to={"/dashboard/cryptograms/add"}>Add Cryptogram</Link>
            </Sidebar.Item>

            <Sidebar.Item icon={HiKey}>
              <Link to={"/dashboard/cipher-keys/add"}>Add Cipher Key</Link>
            </Sidebar.Item>
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
