import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ChatButton = ({ postId }) => { 
  return (
    <Link
      to={`/posts/chatroom`}
      state={{
        postId: postId,
      }}
      style={{
        width: "100%",
        marginTop: "5px",
        padding: "0px",
      }}
    >
      <Button
        style={{
          width: "100%",
          color: "white",
        }}
        variant="warning"
      >
        채팅
      </Button>
    </Link>
  );
};
export default ChatButton;
