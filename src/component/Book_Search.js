import {
  Col,
  Row,
  Card,
  Form,
  Figure,
  InputGroup,
  FormControl,
  Button,
  Table,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Book_Search.css";

function Book_Search() {
  let headers = new Headers({
    "Content-Type": "application/json",
    mode: "cors",
  });
  const token = sessionStorage.getItem("token");
  if (token && token !== null) {
    headers.append("Authorization", "Bearer " + token);
  }

  const [books, setBooks] = useState([]);
  const getSearchBooks = async (word) => {
    const response = await (
      await fetch(`http://localhost:8080/books/all/title?bookTitle=` + word, {
        method: "GET",
        headers: headers,
      })
    ).json();
    setBooks(response);
  };

  const word = useLocation().state;
  useEffect(() => {
    getSearchBooks(word);
  }, []);
  console.log(books);

  return (
    <div className="booklist">
      <h2 style={{ textAlign: "center" }}>도서 검색 결과</h2>
      <hr></hr>
      <Table border="1">
        <thead>
          <tr>
            <th className="th_style">NO.</th>
            <th className="th_style">책 제목</th>
            <th className="th_style">재고</th>
            <th className="th_style">상태</th>
            <th className="th_style">등록 일자</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookId}>
              <td className="th_style">{book.bookId}</td>
              <td className="th_style">{book.bookTitle}</td>
              <td className="th_style">{book.stock}</td>
              <td className="th_style">{book.bookStatus}</td>
              <td className="th_style">{book.createdAt}</td>
              <td>
                <Link
                  to={`/posts/${book.postId}`}
                  style={{
                    color: "black",
                    textDecorationLine: "none",
                  }}
                >
                  <Button>확인</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Book_Search;
