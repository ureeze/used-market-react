import { Col, Row, ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import PostCard from "./PostCard.js";
import NavicationBar from "./NavicationBar.js";
function List() {
  const size = 20;
  const [result, setResult] = useState({
    posts: [],
    totalPages: "",
    totalElements: "",
    size: "",
  });

  const getBookList = async (page, size) => {
    let headers = new Headers({
      "Content-Type": "application/json",
    });
    const token = sessionStorage.getItem("token");
    if (token && token !== null) {
      headers.append("Authorization", "Bearer " + token);
    }
    try {
      const response = await fetch(
        `http://localhost:8080/posts/all?page=` + page + `&size=` + size,
        {
          method: "GET",
          headers: headers,
        }
      );
      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        throw Error("오류가 발생하였습니다.");
      } else {
        setResult({
          posts: json.content,
          totalPages: json.totalPages,
          totalElements: json.totalElements,
          size: json.size,
        });
      }
    } catch (e) {
      alert(e);
    }
  };

  const pageButton = () => {
    const pageButtonList = [];
    for (let i = 1; i <= result.totalPages; i++) {
      pageButtonList.push(
        <Button
          onClick={() => {
            getBookList(i - 1, size);
          }}
          key={i}
        >
          {i}
        </Button>
      );
    }
    return pageButtonList;
  };

  useEffect(() => {
    getBookList();
  }, []);

  return (
    <>
      <NavicationBar />
      <Row>
        <Col></Col>
        <Col xs={9}>
          <Row xs={1} md={2} className="g-4">
            <PostCard list={result.posts} />
            <ButtonToolbar
              style={{ marginBottom: "20px" }}
              aria-label="Toolbar with button groups"
            >
              <ButtonGroup className="me-2" aria-label="First group">
                {pageButton()}
              </ButtonGroup>
            </ButtonToolbar>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default List;
