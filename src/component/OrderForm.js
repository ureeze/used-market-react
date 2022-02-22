import { useState } from "react";
import {
  Col,
  Row,
  Card,
  Form,
  Figure,
  FloatingLabel,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavicationBar from "./NavicationBar.js";

const OrderForm = () => {
  const [order, setOrder] = useState(useLocation().state);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [orderDetails, setOrderDetails] = useState({
    recipient: "",
    address: "",
    phone: "",
  });

  const { recipient, address, phone } = orderDetails;

  const onChange = (event) => {
    const { name, value } = event.target;

    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const sendRequest = async (requestData) => {
    try {
      if (recipient === "" || address === "" || phone === "") {
        alert("배송 정보를 작성해주세요");
        return;
      }
      const requestData = { ...orderDetails, ...order };

      let headers = new Headers({
        "Content-Type": "application/json",
      });
      const token = sessionStorage.getItem("token");
      if (token && token !== null) {
        headers.append("Authorization", "Bearer " + token);
      }

      const response = await fetch(`${baseURL}/orders`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      });

      const json = await response.json();
      if (!response.ok) {
        console.log(json);
        throw Error("주문 시 오류가 발생하였습니다.");
      } else {
        console.log("주문이 완료되었습니다.");
        navigate(`/order_confirm`);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <NavicationBar />
      <Row>
        <Col xs={2}></Col>
        <Col>
          <Row className="g-4">
            <Card>
              <Form>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Form.Label>
                    <h1>주문 - 상세페이지</h1>
                  </Form.Label>
                </div>
                <Row
                  xs={1}
                  md={2}
                  className="g-4"
                  style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                >
                  <Col
                    style={{
                      paddingLeft: "0px",
                    }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="주문자 명"
                      name="recipient"
                      onChange={onChange}
                    />
                  </Col>

                  <Col
                    style={{
                      paddingRight: "0px",
                    }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="연락처"
                      name="phone"
                      onChange={onChange}
                    />
                  </Col>
                </Row>
                <FloatingLabel
                  controlId="floatingInput"
                  label="배송 주소"
                  className="mb-3"
                  style={{ margin: "20px" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="배송 주소"
                    name="address"
                    onChange={onChange}
                  />
                </FloatingLabel>

                <Row className="align-items-center">
                  <Col sm={4}>
                    <Figure style={{ marginLeft: "20px" }}>
                      <Figure.Image
                        style={{ margin: "20px" }}
                        width={171}
                        height={180}
                        alt="171x180"
                        src={order.bookImgUrl}
                      />
                    </Figure>
                  </Col>
                  <Col sm={8}>
                    <Row
                      xs={1}
                      md={1}
                      style={{
                        marginRight: "10px",
                        marginBottom: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <Col xs="auto" className="my-1">
                        <Form.Label>
                          <h5>도서 상세 내역 </h5>
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
                            value={order.bookTitle}
                            readOnly
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
                            placeholder="권"
                            value={order.bookAmount}
                            readOnly
                          />
                          <InputGroup.Text>권</InputGroup.Text>
                        </InputGroup>
                      </Col>
                      <Col xs="auto" className="my-1">
                        <InputGroup>
                          <InputGroup.Text>결제 금액</InputGroup.Text>
                          <FormControl
                            readOnly
                            className="text-right"
                            value={order.orderPrice}
                            placeholder="가격"
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
                            value={order.bookCategory}
                            readOnly
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
                            value={order.bookStatus}
                            readOnly
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Card>

            <Button
              id="order-button"
              style={{
                marginTop: "5px",
              }}
              variant="success"
              onClick={sendRequest}
            >
              주문하기
            </Button>
          </Row>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </>
  );
};

export default OrderForm;
