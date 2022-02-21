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
import { useNavigate } from "react-router-dom";
import NavicationBar from "./NavicationBar.js";

function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState(useLocation().state);

  const navigate = useNavigate();

  let headers = new Headers({
    "Content-Type": "application/json",
  });
  const token = sessionStorage.getItem("token");
  if (token && token !== null) {
    headers.append("Authorization", "Bearer " + token);
  }

  const cancel = async () => {
    try {
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

      if (!response.ok) {
        throw Error("오류가 발생하였습니다.");
      } else {
        alert("주문 취소가 완료되었습니다.");
        navigate(`/mypage/orders`);
      }
    } catch (e) {
      alert(e);
    }
  };

  const cancelHandler = () => {
    cancel();
  };
  console.log(orderDetails);
  return (
    <>
      <NavicationBar />
      <Row>
        <Col></Col>
        <Col xs={7}>
          <Row className="g-4">
            <Card>
              <Form>
                <div
                  id="title"
                  style={{
                    marginTop: "30px",
                    textAlign: "center",
                  }}
                >
                  <Form.Label>
                    <h2>상세 내역</h2>
                  </Form.Label>
                </div>
                <hr></hr>
                <Row className="align-items-center">
                  <Col sm={5}>
                    <Figure>
                      <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        style={{ marginLeft: "50px" }}
                        src={orderDetails.bookImgUrl}
                      />
                    </Figure>
                  </Col>
                  <Col sm={7}>
                    <Row
                      xs={1}
                      md={1}
                      className="align-items-center"
                      style={{ marginRight: "10px" }}
                    >
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
                              color: "red",
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
                          marginBottom: "20px",
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
                                color: "blue",
                              }}
                            />
                          </InputGroup>
                        </Col>
                      </Link>
                    </Row>
                  </Col>
                </Row>
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
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default OrderDetails;
