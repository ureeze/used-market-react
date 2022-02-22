import { Navbar, Container, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navicationbar() {
  const [current, setCurrent] = useState(true);

  const onLogout = () => {
    console.log("Logout");
    sessionStorage.clear();
    setCurrent(false);
  };

  function token_validation() {
    const token = sessionStorage.getItem("token");
    if (token && token !== null) {
      console.log("nav LogIn");
      setCurrent(true);
    } else {
      console.log("nav LogOut");
      setCurrent(false);
      sessionStorage.clear();
    }
  }

  useEffect(() => {
    console.log("nav토큰 검증");
    token_validation();
  }, []);

  return (
    <Navbar bg="dark" expand="lg" style={{ marginBottom: "40px" }}>
      <Container fluid>
        <Navbar.Brand>
          <div style={home_link}>유즈드-마켓</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        {current ? (
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to={`/write-post`} style={nav_link}>
                판매하기
              </Link>
              <Link to={`/list`} style={nav_link}>
                상품 목록
              </Link>
              <Link to={`/mypage/orders`} style={nav_link}>
                나의 주문
              </Link>
              <Link to={`/mypage/posts`} style={nav_link}>
                나의 판매목록
              </Link>
              <Link to={`/chatrooms`} style={nav_link}>
                채팅방 목록
              </Link>
              <Link to={`/search_result`} style={nav_link}>
                검색
              </Link>
              <Link to={`/`} style={nav_link} onClick={onLogout}>
                로그아웃
              </Link>
            </Nav>
          </Navbar.Collapse>
        ) : null}
      </Container>
    </Navbar>
  );
}

export default Navicationbar;

const nav_link = {
  marginLeft: "15px",
  marginRight: "15px",
  color: "white",
  textDecorationLine: "none",
  fontSize: "15px",
};
const home_link = {
  fontSize: "20px",
  marginLeft: "15px",
  marginRight: "15px",
  color: "white",
  textDecorationLine: "none",
};
