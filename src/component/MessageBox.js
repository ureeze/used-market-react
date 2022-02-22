import { Card } from "react-bootstrap";

const MessageBox = ({ messages, userId }) => {
  const messageList = messages.map((message) => (
    <div key={message.chatMessageId}>
      {Number(userId) === message.userId ? (
        <Card style={{ marginTop: "20px" }}>
          <Card.Body style={{ textAlign: "right" }}>
            <Card.Title>{message.userName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {message.createdAt}
            </Card.Subtitle>
            <Card.Text>{message.message}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card style={{ marginTop: "20px", backgroundColor: "beige" }}>
          <Card.Body style={{ textAlign: "left" }}>
            <Card.Title>{message.userName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {message.createdAt}
            </Card.Subtitle>
            <Card.Text>{message.message}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  ));

  return <>{messageList}</>;
};

export default MessageBox;
