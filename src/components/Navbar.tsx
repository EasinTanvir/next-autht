"use client";
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UseContextApi } from "@/store/ContextApi";

function Headers() {
  const router = useRouter();

  const logOutHandler = async () => {
    try {
      await axios.get("/api/user/logout");

      router.push("/login");
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      className="bg-body-tertiary py-3"
    >
      <Container>
        <Navbar.Brand as={Link} href="/">
          ProShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex justify-content-between w-100 nav-items">
            <div className="list-items"></div>
            <div className="list-items">
              <Form.Control
                type="search"
                placeholder="Search here ...."
                className="me-2 px-3  "
                aria-label="Search"
              />
            </div>
            <div className="list-items">
              <Nav.Link as={Link} href="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} href="/profile">
                Profile
              </Nav.Link>
              <Nav.Link as={Link} href="/login">
                LogIn
              </Nav.Link>
              <Nav.Link as={Link} href="/signup">
                SignUp
              </Nav.Link>
              <Button onClick={logOutHandler} className="w-25" variant="danger">
                LogOut
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Headers;
