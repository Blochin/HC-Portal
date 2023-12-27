import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

const CustomNavbar = () => {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="#">
        <img
          src="/logo.png"
          className="mr-3 h-6 sm:h-9 invert"
          alt="HC Portal Logo"
        />
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#">Reports</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default CustomNavbar;
