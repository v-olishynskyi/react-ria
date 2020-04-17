// import React from "react";
// import NavbarComponent from "../Navbar/NavbarComponent";

// const Header = () => {
//   return (
//     <header style={{ height: "56px" }}>
//       <NavbarComponent />
//     </header>
//   );
// };

// export default Header;
import React, { useEffect, useState } from "react";
import "./Header.css";
import NavbarComponent from "../Navbar/NavbarComponent";
import { Container } from "reactstrap";

export default () => {
  const [isSticky, setSticky] = useState(false);
  const handleScroll = () => {
    setSticky(window.pageYOffset >= 150);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  return (
    <>
      <Container fluid>
        <div className={`sticky-wrapper${isSticky ? " sticky" : ""}`}>
          <NavbarComponent />
        </div>
      </Container>
    </>
  );
};
