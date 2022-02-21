import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavicationBar from "./NavicationBar.js";

function OrderConfirm() {
  return (
    <>
      <NavicationBar />
      <Row>
        <Col></Col>
        <Col xs={8}>
          <div>
            <Row xs={1} md={1} className="g-4">
              <Card>
                <Form>
                  <div style={{ textAlign: "center", margin: "30px" }}>
                    <Form.Label>
                      <h1>주문이 완료되었습니다.</h1>
                    </Form.Label>
                  </div>
                </Form>
              </Card>
              <Link
                to={`/list`}
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
            </Row>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default OrderConfirm;
