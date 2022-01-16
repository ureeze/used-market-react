import {
  Col,
  Row,
  Card,
  Form,
  Figure,
  InputGroup,
  FormControl,
  Button,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//   import "./My_Posts.css";

function My_Posts() {
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  const token = sessionStorage.getItem("token");
  if (token && token !== null) {
    headers.append("Authorization", "Bearer " + token);
  }

  const [posts, setPosts] = useState([]);
  const getOrderList = async () => {
    const response = await (
      await fetch(`http://localhost:8080/posts/me`, {
        method: "GET",
        headers: headers,
      })
    ).json();
    setPosts(response);
  };
  useEffect(() => {
    console.log("서버에서 POST 목록을 가져옴.");
    getOrderList();
  }, []);
  console.log(posts);

  return (
    <div className="booklist">
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
            <Card style={{ width: "18rem", margin: "10px" }} key={post.postId}>
              <Card.Img
                variant="top"
                src={post.imgUrl}
                style={{
                  marginTop: "10px",
                }}
              />
              <Card.Body>
                <Card.Title>
                  <h6>NO.{post.postId}</h6> <h4>{post.postTitle}</h4>
                </Card.Title>
                <Card.Text
                  style={{
                    marginBottom: "0px",
                  }}
                >
                  책 제목 : {post.bookTitle}
                </Card.Text>
                <Card.Text
                  style={{
                    marginBottom: "0px",
                  }}
                >
                  재고 : {post.stock}
                </Card.Text>
                <Card.Text
                  style={{
                    marginBottom: "0px",
                  }}
                >
                  작성일자 : {post.createdAt}
                </Card.Text>
                <Card.Text style={{ color: "red" }}>
                  POST 상태 :{" "}
                  {post.postStatus === "SELL" ? (
                    <Badge bg="warning">Sell</Badge>
                  ) : (
                    <Badge bg="secondary">SOLD_OUT</Badge>
                  )}
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
  );
}

export default My_Posts;
