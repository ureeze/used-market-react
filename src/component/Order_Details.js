import {
  Col,
  Row,
  Card,
  Form,
  Figure,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Order_Details() {
  const [orderDetails, serOrderDetails] = useState(useLocation().state);

  let headers = new Headers({
    "Content-Type": "application/json",
  });
  const token = sessionStorage.getItem("token");
  if (token && token !== null) {
    headers.append("Authorization", "Bearer " + token);
  }

  const cancel = async () => {
    const response = await fetch(
      `http://localhost:8080/orders/${orderDetails.orderId}`,
      {
        method: "DELETE",
        headers: headers,
      }
    );
    const json = await response.json();
    console.log(response);
    console.log(json);
    alert("주문 취소가 완료되었습니다.");
    window.location.href = "/mypage/orders";
  };

  const cancelHandler = () => {
    cancel();
  };
  console.log(orderDetails);
  return (
    <div className="post">
      <Row className="g-4">
        <Card>
          <Form>
            <div
              id="title"
              style={{
                marginBottom: "10px",
              }}
            >
              <Form.Label>
                <h2>상세 내역</h2>
              </Form.Label>
            </div>
            <hr></hr>
            <div className="form1">
              <Row  className="align-items-center">
                <Col sm={4}>
                  <div id="book-img">
                    <Figure>
                      <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src={orderDetails.bookImgUrl}
                      />
                    </Figure>
                  </div>
                </Col>
                <Col sm={8}>
                  <Row xs={1} md={1} className="align-items-center">
                    <Col xs="auto" className="my-1">
                      <Form.Label>
                        <h5>주문 상세 내역</h5>
                      </Form.Label>
                    </Col>
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>주문 ID</InputGroup.Text>
                        <Form.Control
                          className="text-right"
                          size="sm"
                          type="text"
                          placeholder="책 제목"
                          value={orderDetails.orderId}
                          disabled
                          style={{
                            backgroundColor: "white",
                          }}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>받는 사람</InputGroup.Text>
                        <Form.Control
                          className="text-right"
                          size="sm"
                          type="text"
                          placeholder="받는 사람"
                          value={orderDetails.recipient}
                          disabled
                          style={{
                            backgroundColor: "white",
                          }}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>전화 번호</InputGroup.Text>
                        <Form.Control
                          className="text-right"
                          size="sm"
                          type="text"
                          placeholder="전화번호"
                          value={orderDetails.phone}
                          disabled
                          style={{
                            backgroundColor: "white",
                          }}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>배송 주소</InputGroup.Text>
                        <Form.Control
                          className="text-right"
                          size="sm"
                          type="text"
                          placeholder="배송주소"
                          value={orderDetails.address}
                          disabled
                          style={{
                            backgroundColor: "white",
                          }}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>주문 상태</InputGroup.Text>
                        <Form.Control
                          className="text-right"
                          size="sm"
                          type="text"
                          value={orderDetails.deliveryStatus}
                          placeholder="상태"
                          disabled
                          style={{
                            backgroundColor: "white",
                            color:"red"
                          }}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>주문 일자</InputGroup.Text>
                        <Form.Control
                          className="text-right"
                          size="sm"
                          type="text"
                          value={orderDetails.createdAt}
                          placeholder="주문 일자"
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
                    <Col
                      xs="auto"
                      className="my-1"
                      style={{
                        display: "none",
                      }}
                    >
                      <InputGroup>
                        <InputGroup.Text>책 ID</InputGroup.Text>
                        <Form.Control
                          className="text-right"
                          size="sm"
                          type="text"
                          placeholder="책 ID"
                          value={orderDetails.orderedBookId}
                          disabled
                          style={{
                            backgroundColor: "white",
                          }}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>도서명</InputGroup.Text>
                        <Form.Control
                          className="text-right"
                          size="sm"
                          type="text"
                          placeholder="책 제목"
                          value={orderDetails.bookTitle}
                          disabled
                          style={{
                            backgroundColor: "white",
                          }}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>수량</InputGroup.Text>
                        <Form.Control
                          className="text-right"
                          size="sm"
                          type="text"
                          value={orderDetails.bookAmount}
                          placeholder="권"
                          disabled
                          name="bookAmount"
                          style={{
                            backgroundColor: "white",
                          }}
                        />
                        <InputGroup.Text>권</InputGroup.Text>
                      </InputGroup>
                    </Col>
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>결제 금액</InputGroup.Text>
                        <FormControl
                          disabled
                          className="text-right"
                          value={orderDetails.orderPrice}
                          placeholder="결제 금액"
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
                          value={orderDetails.bookCategory}
                          disabled
                          style={{
                            backgroundColor: "white",
                          }}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="auto" className="my-1">
                      <InputGroup>
                        <InputGroup.Text>책 상태</InputGroup.Text>
                        <Form.Control
                          className="text-right"
                          size="sm"
                          type="text"
                          placeholder="책 상태"
                          value={orderDetails.bookStatus}
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
                        <h5>포스트 상세 내역</h5>
                      </Form.Label>
                    </Col>
                    <Link
                      to={`/posts/${orderDetails.postId}`}
                      style={{
                        textDecorationLine: "none",
                      }}
                    >
                      <Col xs="auto" className="my-1">
                        <InputGroup>
                          <InputGroup.Text>관련 포스트</InputGroup.Text>
                          <Form.Control
                            className="text-right"
                            size="sm"
                            type="text"
                            placeholder="해당 포스트"
                            value={orderDetails.bookTitle}
                            disabled
                            style={{
                              backgroundColor: "white",
                            }}
                          />
                        </InputGroup>
                      </Col>
                    </Link>
                  </Row>
                </Col>
              </Row>
            </div>
          </Form>
        </Card>
        <Link
          to={`/mypage/orders`}
          style={{
            padding: "0px",
            marginTop: "5px",
          }}
        >
          <Button
            style={{
              width: "100%",
            }}
          >
            확인
          </Button>
        </Link>
        {orderDetails.deliveryStatus === "결제완료" ? (
          <Button
            variant="danger"
            style={{
              width: "100%",
              marginTop: "5px",
            }}
            onClick={cancelHandler}
          >
            주문 취소
          </Button>
        ) : (
          <Button
            variant="secondary"
            style={{
              width: "100%",
              marginTop: "5px",
            }}
            disabled
          >
            주문 취소
          </Button>
        )}
      </Row>
    </div>
  );
}

export default Order_Details;
