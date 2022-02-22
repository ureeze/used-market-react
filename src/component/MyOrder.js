import { Col, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NavicationBar from "./NavicationBar.js";

function MyOrder() {
  const baseURL = process.env.REACT_APP_BASE_URL;
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  const token = sessionStorage.getItem("token");
  if (token && token !== null) {
    headers.append("Authorization", "Bearer " + token);
  }

  const [orders, setOrders] = useState([]);
  const getOrderList = async () => {
    try {
      const response = await fetch(`${baseURL}/orders/all/me`, {
        method: "GET",
        headers: headers,
      });
      const json = await response.json();
      if (!response.ok) {
        throw Error("오류가 발생하였습니다.");
      } else {
        setOrders(json);
      }
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    console.log("서버에서 ORDER 가져옴.");
    getOrderList();
  }, []);
  console.log(orders);

  return (
    <>
      <NavicationBar />
      <Row>
        <Col></Col>
        <Col xs={10}>
          <div>
            <h2 style={{ textAlign: "center" }}>주문 목록</h2>
            <hr
              style={{
                marginTop: "30px",
                marginBottom: "50px",
              }}
            ></hr>
            {orders.length === 0 ? (
              "주문내역이 존재 하지 않습니다."
            ) : (
              <Row xs={1} md={2} className="g-4">
                {orders.map((order) => (
                  <Card
                    style={{ width: "18rem", margin: "10px" }}
                    key={order.orderId}
                  >
                    <Card.Img
                      variant="top"
                      src={order.bookImgUrl}
                      style={{
                        marginTop: "10px",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>
                        <h6>NO.{order.orderId}</h6> <h4>{order.bookTitle}</h4>
                      </Card.Title>
                      <Card.Text
                        style={{
                          margin: "0px",
                        }}
                      >
                        수량 : {order.bookAmount}
                      </Card.Text>
                      <Card.Text
                        style={{
                          marginBottom: "0px",
                        }}
                      >
                        주문일자 : {order.createdAt}
                      </Card.Text>
                      <Card.Text style={{ color: "red" }}>
                        주문상태 : {order.deliveryStatus}
                      </Card.Text>
                    </Card.Body>
                    <Link
                      to={`/mypage/orders/${order.orderId}`}
                      state={order}
                      style={{
                        marginBottom: "10px",
                        textDecorationLine: "none",
                        color: "black",
                      }}
                    >
                      <Button style={{ width: "100%" }}>상세 보기</Button>
                    </Link>
                  </Card>
                ))}
              </Row>
            )}
          </div>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}
export default MyOrder;
