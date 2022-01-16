import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";

const UpdateAndDeleteButton = (props) => {
  const { updatedPost } = props;
  const [postId, setPostId] = useState(updatedPost.postId);

  const post_delete = async () => {
    let headers = new Headers({
      "Content-Type": "application/json",
    });
    const token = sessionStorage.getItem("token");
    if (token && token !== null) {
      headers.append("Authorization", "Bearer " + token);
    }
    try {
      const response = await fetch(
        `http://localhost:8080/posts/${updatedPost.postId}`,
        {
          method: "delete",
          headers: headers,
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw Error("오류가 발생하였습니다.");
      } else {
        alert("삭제가 완료되었습니다.");
        window.location.href = "/list";
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div
      style={{
        padding: "0px",
        marginTop: "0px",
      }}
    >
      {updatedPost.postStatus === "SELL" ? (
        <div>
          <Link
            to={`/update_post/${updatedPost.postId}`}
            state={{
              updatedPost,
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
        </div>
      ) : updatedPost.postStatus === "SOLD_OUT" ? (
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
      ) : (
        <Link to={`/mypage/posts`}>
          <Button
            variant="primary"
            style={{
              width: "100%",
              marginTop: "5px",
            }}
          >
            확인
          </Button>
        </Link>
      )}
    </div>
  );
};

export default UpdateAndDeleteButton;
