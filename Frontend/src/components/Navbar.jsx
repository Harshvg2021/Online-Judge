// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Navbar.css';

// const Navbar = () => {
//   return (
//     <div className="navbar-container">
//       <div className="navbar-left">
//         <Link to="/" className="navbar-link">
//           <span>OJ</span>
//         </Link>
//       </div>
//       <div className="navbar-right">
//         <Link to="/problems" className="navbar-link">
//           Problems
//         </Link>
//         <Link to="/about-us" className="navbar-link">
//           About Us
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';
import { useScroll } from "framer-motion";


export default function NavbarTop() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Update component state to reflect logout
    navigate('/'); // Redirect to the root path after logout
  };

  return (
    <Navbar>
      <NavbarBrand>
        <Link ><p className="font-bold text-inherit">OJ</p></Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        
        <NavbarItem isActive>
            <Link to="/problems">Problems</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* Conditionally render Login/Signup or Profile Dropdown */}
        {isLoggedIn ? (
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  radius="sm"
                  variant="light"
                >
                  Profile
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[100px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem key="logout" onClick={handleLogout}>
                Logout
              </DropdownItem>
              <DropdownItem key="profile">
                User Profile
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link to='/'>Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                <Link to="/register">Sign up</Link>
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}

