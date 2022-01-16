import { Col, Row, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function PostCard({
  id,
  postTitle,
  postStatus,
  postContent,
  createdAt,
  writerId,
  writerName,
  imgUrl,
}) {
  return (
    <Col>
      <Link
        to={`/posts/${id}`}
        style={{
          color: "black",
          textDecorationLine: "none",
        }}
      >
        <Card>
          <Card.Header as="h5">
            <span>{postTitle}</span>
            
            <span>
              {postStatus === "SELL" ? (
                <Badge
                  style={{
                    float: "right",
                  }}
                  bg="warning"
                >
                  Sell
                </Badge>
              ) : (
                <Badge
                  style={{
                    float: "right",
                  }}
                  bg="secondary"
                >
                  SOLD_OUT
                </Badge>
              )}
            </span>
          </Card.Header>

          <Card.Body>
            <Row>
              <Col sm={4}>
                <Card.Img
                  src={imgUrl}
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
                  작성자 id : {writerId}
                </Card.Text>
                <Card.Text> {postContent}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="text-muted ">
            <span> 작성일 : {createdAt}</span>
            <span
              style={{
                float: "right",
              }}
            >
              {writerName}
            </span>
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  );
}
export default PostCard;
