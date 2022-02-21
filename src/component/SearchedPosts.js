import { Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchedPosts = ({ result }) => {
  const list = result.map((post) => (
    <tr key={post.postId}>
      <td className="th_style">{post.postId}</td>
      <td className="th_style">
        <Link
          to={`/posts/${post.postId}`}
          style={{
            color: "blue",
            textDecorationLine: "none",
          }}
        >
          {post.postTitle}
        </Link>
      </td>
      <td className="th_style">{post.writerName}</td>
      <td className="th_style">{post.createdAt}</td>
      <td className="th_style">
        {post.postStatus === "SELL" ? (
          <Badge bg="warning">Sell</Badge>
        ) : post.postStatus === "SOLD_OUT" ? (
          <Badge bg="secondary">SOLD_OUT</Badge>
        ) : post.postStatus === "DELETED" ? (
          <Badge bg="danger">DELETED</Badge>
        ) : null}
      </td>
    </tr>
  ));
  return (
    <Table border="1">
      <thead>
        <tr>
          <th className="th_style">NO.</th>
          <th className="th_style">포스트 제목</th>
          <th className="th_style">판매자</th>
          <th className="th_style">등록 일자</th>
          <th className="th_style">상태</th>
        </tr>
      </thead>
      <tbody>{list}</tbody>
    </Table>
  );
};

export default SearchedPosts;
