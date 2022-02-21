import { Col, Row, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom"; 

function PostCard({ list }) {
  const posts = list.map((post) => (
    <Col key={post.postId} style={{ marginTop: "10px", marginBottom: "15px" }}>
      <Link
        to={`/posts/${post.postId}`}
        style={{
          color: "black",
          textDecorationLine: "none",
        }}
      >
        <Card>
          <Card.Header as="h5">
            <span>{post.postTitle}</span>

            <span>
              {post.postStatus === "SELL" ? (
                <Badge
                  style={{
                    float: "right",
                  }}
                  bg="warning"
                >
                  Sell
                </Badge>
              ) : post.postStatus === "SOLD_OUT" ? (
                <Badge
                  style={{
                    float: "right",
                  }}
                  bg="secondary"
                >
                  SOLD_OUT
                </Badge>
              ) : post.postStatus === "DELETED" ? (
                <Badge
                  style={{
                    float: "right",
                  }}
                  bg="danger"
                >
                  DELETED
                </Badge>
              ) : null}
            </span>
          </Card.Header>

          <Card.Body>
            <Row>
              <Col sm={4}>
                <Card.Img
                  src={post.book.bookImgUrl}
                  loading="lazy"
                  width="171"
                  height="180"
                />
              </Col>
              <Col sm={8}>
                <Card.Text
                  style={{
                    display: "none",
                  }}
                >
                  작성자 id : {post.writerId}
                </Card.Text>
                <Card.Text> {post.postContent}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="text-muted ">
            <span> 작성일 : {post.createdAt}</span>
            <span
              style={{
                float: "right",
              }}
            >
              {post.writerName}
            </span>
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  ));
  return <> {posts}</>;
}
export default PostCard;
