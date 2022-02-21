import { useState } from "react";
import {
  Col,
  Row,
  Form,
  FormControl,
  Button,
  ButtonToolbar,
  ButtonGroup,
} from "react-bootstrap";
import SearchedBooks from "./SearchedBooks.js";
import SearchedPosts from "./SearchedPosts.js";
import NavicationBar from "./NavicationBar.js";

function Search() {
  const size = 20;
  const [searchWord, setSearchWord] = useState("");
  const [searchOption, setSearchOption] = useState("books");
  const [result, setResult] = useState({
    option: "",
    list: [],
    totalPages: "",
    totalElements: "",
    size: "",
  });

  let headers = new Headers({
    "Content-Type": "application/json",
    mode: "cors",
  });
  const token = sessionStorage.getItem("token");
  if (token && token !== null) {
    headers.append("Authorization", "Bearer " + token);
  }

  const onChange = (event) => {
    setSearchWord(event.target.value);
  };

  const getSearch = async (page, size) => {
    try {
      const response = await fetch(
        `http://localhost:8080/${searchOption}/all/title?title=` +
          searchWord +
          `&page=` +
          page +
          `&size=` +
          size,
        {
          method: "GET",
          headers: headers,
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw Error("오류가 발생하였습니다.");
      } else {
        console.log(json);
        setResult({
          option: searchOption,
          list: json.content,
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
            getSearch(i - 1, size);
          }}
          key={i}
        >
          {i}
        </Button>
      );
    }
    return pageButtonList;
  };

  console.log(result);

  return (
    <>
      <NavicationBar />
      <Row>
        <Col xs={2}></Col>
        <Col xs={8}>
          <Form className="d-flex" style={{ marginBottom: "20px" }}>
            <Form.Select
              size="sm"
              style={{ width: "100px", marginRight: "10px" }}
              onChange={(e) => {
                setSearchOption(e.target.value);
              }}
            >
              <option value="books">책</option>
              <option value="posts">포스트</option>
            </Form.Select>
            <FormControl
              type="search"
              placeholder="검색"
              className="me-2"
              aria-label="Search"
              onChange={onChange}
            />
            <Button
              variant="success"
              onClick={() => {
                getSearch(0, size);
              }}
            >
              Search
            </Button>
          </Form>

          {result.list.length === 0 ? null : (
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              {result.option === "books" ? (
                <>
                  <h2 style={{ textAlign: "center" }}>도서 검색 결과</h2>
                  <hr></hr>
                  <SearchedBooks result={result.list} />
                  <ButtonToolbar
                    style={{ marginBottom: "20px" }}
                    aria-label="Toolbar with button groups"
                  >
                    <ButtonGroup className="me-2" aria-label="First group">
                      {pageButton()}
                    </ButtonGroup>
                  </ButtonToolbar>
                </>
              ) : result.option === "posts" ? (
                <>
                  <h2 style={{ textAlign: "center" }}>포스트 검색 결과</h2>
                  <hr></hr>
                  <SearchedPosts result={result.list} />
                  <ButtonToolbar
                    style={{ marginBottom: "20px" }}
                    aria-label="Toolbar with button groups"
                  >
                    <ButtonGroup className="me-2" aria-label="First group">
                      {pageButton()}
                    </ButtonGroup>
                  </ButtonToolbar>
                </>
              ) : null}
            </div>
          )}
        </Col>
        <Col xs={2}></Col>
      </Row>
    </>
  );
}

export default Search;
