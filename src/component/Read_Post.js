import {
  Col,
  Row,
  Card,
  Button,
  Form,
  Figure,
  InputGroup,
  FormControl,
  Badge,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import UpdateAndDeleteButton from "./UpdateAndDeleteButton.js";
import "./Read_Post.css";

function Read_Post() {
  const [updatedPost, setUpdatedPost] = useState({
    createdAt: "",
    postContent: "",
    postId: "",
    postStatus: "",
    postTitle: "",
    writerId: "",
    writerName: "",
    authenticationId: "",
    book: {
      bookCategory: "",
      bookId: "",
      bookImgUrl: "",
      bookStatus: "",
      bookTitle: "",
      stock: 1,
      unitPrice: 0,
    },
  });

  const [options, setOptions] = useState({
    bookAmount: 0,
    orderPrice: 0,
  });

  const bookAmountChange = (event) => {
    const quantity = parseInt(event.target.value);
    if (quantity > updatedPost.book.stock) {
      alert("재고수량이 부족합니다.");
      setOptions({
        bookAmount: 1,
        orderPrice: 1 * updatedPost.book.unitPrice,
      });
      return;
    } else if (quantity <= 0) {
      alert("주문수량이 1 이상이어야 합니다.");
      setOptions({
        bookAmount: 1,
        orderPrice: 1 * updatedPost.book.unitPrice,
      });
      return;
    }
    setOptions({
      bookAmount: quantity,
      orderPrice: quantity * updatedPost.book.unitPrice,
    });
  };

  const { id } = useParams();

  const getPost = async () => {
    let headers = new Headers({
      "Content-Type": "application/json",
    });
    const token = sessionStorage.getItem("token");
    if (token && token !== null) {
      headers.append("Authorization", "Bearer " + token);
    }
    try {
      const response = await fetch(`http://localhost:8080/posts/${id}`, {
        method: "GET",
        headers: headers,
      });

      const json = await response.json();

      if (!response.ok) {
        throw Error("오류가 발생하였습니다.");
      } else {
        setUpdatedPost(json);
        setOptions({
          bookAmount: 1,
          orderPrice: 1 * json.book.unitPrice,
        });
      }
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="post">
      <Row className="g-4">
        <Card>
          <Form>
            <div
              id="title"
              style={{
                marginBottom: "0px",
              }}
            >
              <Form.Label
                style={{
                  marginBottom: "0px",
                }}
              >
                <h2
                  style={{
                    marginBottom: "0px",
                  }}
                >
                  {updatedPost.postTitle}

                  {updatedPost.postStatus === "SELL" ? (
                    <Badge
                      bg="warning"
                      style={{
                        margin: "20px",
                      }}
                    >
                      Sell
                    </Badge>
                  ) : updatedPost.postStatus === "SOLD_OUT" ? (
                    <Badge
                      bg="secondary"
                      style={{
                        margin: "20px",
                      }}
                    >
                      SOLD_OUT
                    </Badge>
                  ) : (
                    <Badge
                      bg="danger"
                      style={{
                        margin: "20px",
                      }}
                    >
                      DELETED
                    </Badge>
                  )}
                </h2>
              </Form.Label>
            </div>
            <hr></hr>
            <div className="form1">
              <Row className="align-items-center">
                <Col sm={4}>
                  <div id="book-img">
                    <Figure>
                      <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src={updatedPost.book.bookImgUrl}
                      />
                    </Figure>
                  </div>
                </Col>
                <Col sm={8}>
                  <Row xs={1} md={1} className="align-items-center">
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>작성일</InputGroup.Text>
                        <Form.Control
                          className="text-right"
                          size="sm"
                          type="text"
                          placeholder="작성일"
                          value={updatedPost.createdAt}
                          disabled
                          style={{
                            backgroundColor: "white",
                          }}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="auto" className="my-1">
                      <Form.Label
                        style={{
                          marginTop: "30px",
                        }}
                      >
                        <h5>도서 상세 내역</h5>
                      </Form.Label>
                    </Col>
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>도서명</InputGroup.Text>
                        <Form.Control
                          className="text-right"
                          size="sm"
                          type="text"
                          placeholder="책 제목"
                          value={updatedPost.book.bookTitle}
                          disabled
                          style={{
                            backgroundColor: "white",
                          }}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="auto" className="my-1">
                      {updatedPost.postStatus === "SELL" ? (
                        <InputGroup>
                          <InputGroup.Text>수량</InputGroup.Text>

                          <Form.Control
                            className="text-right"
                            size="sm"
                            type="number"
                            placeholder="권"
                            name="bookAmount"
                            value={options.bookAmount}
                            onChange={bookAmountChange}
                          />
                          <InputGroup.Text>권</InputGroup.Text>

                          <InputGroup.Text>
                            재고수량 : {updatedPost.book.stock}
                          </InputGroup.Text>
                        </InputGroup>
                      ) : (
                        <InputGroup>
                          <InputGroup.Text>수량</InputGroup.Text>
                          <InputGroup.Text>
                            재고수량 : {updatedPost.book.stock}
                          </InputGroup.Text>
                        </InputGroup>
                      )}
                    </Col>
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>총 금액</InputGroup.Text>
                        <FormControl
                          disabled
                          className="text-right"
                          value={options.orderPrice}
                          placeholder="가격"
                          style={{
                            backgroundColor: "white",
                          }}
                        />
                        <InputGroup.Text>원</InputGroup.Text>
                      </InputGroup>
                    </Col>
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>분류</InputGroup.Text>
                        <Form.Control
                          className="text-right"
                          size="sm"
                          type="text"
                          placeholder="분류"
                          value={updatedPost.book.bookCategory}
                          disabled
                          style={{
                            backgroundColor: "white",
                          }}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>상태</InputGroup.Text>
                        <Form.Control
                          className="text-right"
                          size="sm"
                          type="text"
                          placeholder="상태"
                          value={updatedPost.book.bookStatus}
                          disabled
                          style={{
                            backgroundColor: "white",
                          }}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="form1">
              <Form.Group className="mb-3">
                <Form.Control
                  id="post-textarea"
                  as="textarea"
                  rows={9}
                  value={updatedPost.postContent}
                  disabled
                  placeholder="포스트 내용"
                  style={{
                    padding: "10px",
                    backgroundColor: "white",
                  }}
                />
              </Form.Group>
            </div>
          </Form>
        </Card>

        {updatedPost.postStatus === "SELL" ? (
          updatedPost.writerId === updatedPost.authenticationId ? (
            <UpdateAndDeleteButton updatedPost={updatedPost} />
          ) : (
            <Link
              to={`/order_page/${updatedPost.postId}`}
              state={{
                postId: updatedPost.postId,
                bookId: updatedPost.book.bookId,
                bookTitle: updatedPost.book.bookTitle,
                bookAmount: options.bookAmount,
                orderPrice: options.orderPrice,
                bookCategory: updatedPost.book.bookCategory,
                bookImgUrl: updatedPost.book.bookImgUrl,
                bookStatus: updatedPost.book.bookStatus,
              }}
              style={{
                color: "white",
                textDecorationLine: "none",
                padding: "0px",
                marginTop: "5px",
              }}
            >
              <Button
                id="order-button"
                variant="primary"
                style={{
                  width: "100%",
                }}
              >
                주문하기
              </Button>
            </Link>
          )
        ) : updatedPost.writerId === updatedPost.authenticationId ? (
          <UpdateAndDeleteButton updatedPost={updatedPost} options={options} />
        ) : (
          <Button
            id="order-button"
            variant="secondary"
            style={{
              width: "100%",
              marginTop: "5px",
            }}
            disabled
          >
            재고가 존재하지 않습니다.
          </Button>
        )}
        <Link
          to={`/posts/chat`}
          state={{
            postId: updatedPost.postId,
            writerId: updatedPost.writerId,
          }}
        >
          <Button>채팅</Button>
        </Link>
      </Row>
    </div>
  );
}

export default Read_Post;
