import { Col, Row, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NavicationBar from "./NavicationBar.js";

function MyPosts() {
  const baseURL = process.env.REACT_APP_BASE_URL;
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  const token = sessionStorage.getItem("token");
  if (token && token !== null) {
    headers.append("Authorization", "Bearer " + token);
  }
  const [posts, setPosts] = useState([]);

  const getOrderList = async () => {
    try {
      const response = await fetch(`${baseURL}/posts/me`, {
        method: "GET",
        headers: headers,
      });
      const json = await response.json();
      if (!response.ok) {
        throw Error("오류가 발생하였습니다.");
      } else {
        setPosts(json);
      }
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    console.log("서버에서 POST 목록을 가져옴.");
    getOrderList();
  }, []);
  console.log(posts);

  return (
    <>
      <NavicationBar />
      <Row>
        <Col></Col>
        <Col xs={10}>
          <div>
            <h2 style={{ textAlign: "center" }}>작성한 POST 목록</h2>
            <hr
              style={{
                marginTop: "30px",
                marginBottom: "50px",
              }}
            ></hr>
            {posts.length === 0 ? (
              "작성한 POST가 존재 하지 않습니다."
            ) : (
              <Row xs={1} md={2} className="g-4">
                {posts.map((post) => (
                  <Card
                    style={{ width: "18rem", margin: "10px" }}
                    key={post.postId}
                  >
                    <Card.Img
                      variant="top"
                      src={post.book.bookImgUrl}
                      loading="lazy"
                      style={{
                        marginTop: "10px",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>
                        <h6>NO.{post.postId}</h6> <h4>{post.postTitle}</h4>
                      </Card.Title>

                      <Card.Text> {post.book.bookTitle}</Card.Text>
                      <Card.Text
                        style={{
                          marginBottom: "0px",
                        }}
                      >
                        재고 : {post.book.stock}
                      </Card.Text>
                      <Card.Text style={{ color: "red", marginBottom: "0px" }}>
                        POST 상태 :{" "}
                        {post.postStatus === "SELL" ? (
                          <Badge bg="warning">Sell</Badge>
                        ) : post.postStatus === "SOLD_OUT" ? (
                          <Badge bg="secondary">SOLD_OUT</Badge>
                        ) : (
                          <Badge bg="danger">DELETED</Badge>
                        )}
                      </Card.Text>
                      <Card.Text
                        style={{
                          marginBottom: "0px",
                        }}
                      >
                        작성일자 : {post.createdAt}
                      </Card.Text>
                    </Card.Body>
                    <Link
                      to={`/posts/${post.postId}`}
                      style={{
                        marginBottom: "10px",
                        textDecorationLine: "none",
                        color: "black",
                      }}
                    >
                      <Button style={{ width: "100%" }}>상세 보기</Button>
                    </Link>
                  </Card>
                ))}
              </Row>
            )}
          </div>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default MyPosts;
