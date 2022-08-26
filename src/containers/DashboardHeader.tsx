import { useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";
import { logout } from "../helpers/index";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <Navbar color="secondary" dark>
      <NavbarBrand>Air Table</NavbarBrand>

      <Nav navbar style={{ marginLeft: "auto" }}>
        <NavItem>
          <Button onClick={() => logout(navigate)}>Logout</Button>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default DashboardHeader;
