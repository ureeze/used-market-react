import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const UpdateButton = ({ post }) => { 
  return (
    <Link
      to={`/update_post/${post.postId}`}
      state={{
        post,
      }}
      style={{
        color: "white",
        textDecorationLine: "none",
        padding: "0px",
      }}
    >
      <Button
        variant="warning"
        style={{
          width: "100%",
          marginTop: "5px",
        }}
      >
        수정
      </Button>
    </Link>
  );
};
export default UpdateButton;
