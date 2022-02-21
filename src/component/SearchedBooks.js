import { Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchedBooks = ({ result }) => {
  const list = result.map((book) => (
    <tr key={book.bookId}>
      <td className="th_style">{book.bookId}</td>
      <td className="th_style">
        <Link
          to={`/posts/${book.postId}`}
          style={{
            color: "blue",
            textDecorationLine: "none",
          }}
        >
          {book.bookTitle}
        </Link>
      </td>
      <td className="th_style">{book.stock}</td>
      <td className="th_style">{book.bookStatus}</td>
      <td className="th_style">{book.createdAt}</td>
      <td className="th_style">
        {book.postStatus === "SELL" ? (
          <Badge bg="warning">Sell</Badge>
        ) : book.postStatus === "SOLD_OUT" ? (
          <Badge bg="secondary">SOLD_OUT</Badge>
        ) : book.postStatus === "DELETED" ? (
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
          <th className="th_style">책 제목</th>
          <th className="th_style">재고</th>
          <th className="th_style">상태</th>
          <th className="th_style">등록 일자</th>
          <th className="th_style">판매 상태</th>
        </tr>
      </thead>
      <tbody>{list}</tbody>
    </Table>
  );
};

export default SearchedBooks;
