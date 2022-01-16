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
import { Link, useLocation } from "react-router-dom";
import "./Order.css";

const Order = ({history}) => {
  const [order, serOrder] = useState(useLocation().state);

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

      const response = await fetch(`http://localhost:8080/orders`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      });

      const json = await response.json();
      if (!response.ok) {
        console.log("오류");
        console.log(response);
        throw Error("주문 시 오류가 발생하였습니다.");
      } else {
        console.log("주문이 완료되었습니다.");
        window.location.href = "/order_confirm";
      }
    } catch (e) {
      alert(e);
    }
  };
  console.log(111);
 
  

  return (
    <div className="post">
      <Row xs={1} md={1} className="g-4">
        <Card>
          <Form>
            <div id="title">
              <Form.Label>
                <h1>주문 - 상세페이지</h1>
              </Form.Label>
            </div>
            <div className="form1">
              <Row xs={1} md={2} className="g-4">
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="주문자 명"
                    name="recipient"
                    onChange={onChange}
                  />
                </Col>

                <Col>
                  <Form.Control
                    type="text"
                    placeholder="연락처"
                    name="phone"
                    onChange={onChange}
                  />
                </Col>
              </Row>
            </div>
            <div className="form1">
              <FloatingLabel
                controlId="floatingInput"
                label="배송 주소"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="배송 주소"
                  name="address"
                  onChange={onChange}
                />
              </FloatingLabel>
            </div>

            <div className="form1">
              <Row   className="align-items-center">
                <Col sm={4}>
                  <div id="book-img">
                    <Figure>
                      <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src={order.bookImgUrl}
                      />
                    </Figure>
                  </div>
                </Col>
                <Col sm={8}>
                  <Row xs={1} md={1} className="align-items-center">
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
            </div>
          </Form>
        </Card> 

          <Button id="order-button" style={{
            marginTop:"5px",
          }} variant="success" onClick={sendRequest}>
            주문하기
          </Button> 
        
      </Row>
    </div>
  );
};

export default Order;
