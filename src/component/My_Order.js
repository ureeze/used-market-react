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
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./My_Order.css";

function My_Order() {
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  const token = sessionStorage.getItem("token");
  if (token && token !== null) {
    headers.append("Authorization", "Bearer " + token);
  }

  const [orders, setOrders] = useState([]);
  const getOrderList = async () => {
    const response = await (
      await fetch(`http://localhost:8080/orders/all/me`, {
        method: "GET",
        headers: headers,
      })
    ).json();
    setOrders(response);
  };
  useEffect(() => {
    console.log("서버에서 ORDER 가져옴.")
    getOrderList();
  }, []);
  console.log(orders);

  return (
    <div className="booklist">
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
                <Card.Text style={{
                  marginBottom:"0px"
                }}>주문일자 : {order.createdAt}</Card.Text>
                <Card.Text style={{color:"red"}}>주문상태 : {order.deliveryStatus}</Card.Text>
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
                <Button style={{width:"100%"}}>상세 보기</Button>
              </Link>
               
            </Card>
          ))}
        </Row>
      )}
    </div>
  );
}

export default My_Order;
