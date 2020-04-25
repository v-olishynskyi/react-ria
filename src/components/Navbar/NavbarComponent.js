import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [positionScroll, setPositionScroll] = useState(window.scrollY);
  const [isFixed, setIsFixed] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 150) setIsFixed(true);
      else setIsFixed(false);
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <Navbar
      color="light"
      fixed={isFixed ? "top" : ""}
      light
      expand="sm"
      // className={"sticky-top"}
    >
      <NavbarBrand tag={Link} to="/">
        Olishynskyi V. B.
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">
              Головна
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/wishlist">
              Список обраних
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
