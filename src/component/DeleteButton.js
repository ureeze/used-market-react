import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const DeleteButton = ({postId}) => { 
  const navigate = useNavigate();
  const post_delete = async () => {
    let headers = new Headers({
      "Content-Type": "application/json",
    });
    const token = sessionStorage.getItem("token");
    if (token && token !== null) {
      headers.append("Authorization", "Bearer " + token);
    }
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: "delete",
        headers: headers,
      });
      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        throw Error("오류가 발생하였습니다.");
      } else {
        alert("삭제가 완료되었습니다.");
        navigate(`/list`);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Button
      variant="danger"
      style={{
        width: "100%",
        marginTop: "5px",
      }}
      onClick={post_delete}
    >
      삭제
    </Button>
  );
};
export default DeleteButton;
