import { Col, Row, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./List.css";
import PostCard from "./PostCard.js";

function List() {
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  const token = sessionStorage.getItem("token");
  if (token && token !== null) {
    headers.append("Authorization", "Bearer " + token);
  }

  const [posts, setPosts] = useState([]);
  const getBookList = async () => {
    const response = await (
      await fetch(`http://localhost:8080/posts/all`, {
        method: "GET",
        headers: headers,
      })
    ).json();
    console.log(response);
    setPosts(response);
  };
  useEffect(() => {
    getBookList();
  }, []);

  return (
    <div className="booklist">
      <Row xs={1} md={2} className="g-4">
        {posts.map((post) => (
          <PostCard 
            key={post.postId}
            id={post.postId}
            postTitle={post.postTitle}
            postStatus={post.postStatus}
            postContent={post.postContent}
            createdAt={post.createdAt}
            writerId={post.writerId}
            writerName={post.writerName}
            imgUrl={post.imgUrl}
          />
        ))}
      </Row>
    </div>
  );
}

export default List;
