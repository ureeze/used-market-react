import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navicationbar.css";

function Navicationbar({ login }) {
  const [current, setCurrent] = useState(login);
  const [searchWord, setSearchWord] = useState("");

  const onChange = (event) => {
    setSearchWord(event.target.value);
  };

  const onLogout = () => {
    sessionStorage.clear();
    setCurrent(false);
  };

  return (
    <div>
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <div className="nav_link" id="home_link">
              유즈드-마켓
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          {current ? (
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Link to={`/write-post`} className="nav_link">
                  판매하기
                </Link>
                <Link to={`/list`} className="nav_link">
                  상품 목록
                </Link>
                <Link to={`/mypage/orders`} className="nav_link">
                  나의 주문
                </Link>
                <Link to={`/mypage/posts`} className="nav_link">
                  나의 판매목록
                </Link>
                <Link to={`/`} className="nav_link" onClick={onLogout}>
                  로그아웃
                </Link>
              </Nav>
              <Form className="d-flex">
                <Form.Select size="sm" style={{width:"100px",marginRight:"10px"}} > 
                  <option value="book">책</option>
                  <option value="post">포스트</option> 
                </Form.Select>
                <FormControl
                  type="search"
                  placeholder="도서 검색"
                  className="me-2"
                  aria-label="Search"
                  onChange={onChange}
                
                />
                <Link to={`/books/search`} state={searchWord}>
                  <Button variant="success">Search</Button>
                </Link>
              </Form>
            </Navbar.Collapse>
          ) : null}
        </Container>
      </Navbar>
    </div>
  );
}

export default Navicationbar;
