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
import "./Order_Confirm.css";

function Order_Confirm() {
  return (
    <div className="post">
      <Row xs={1} md={1} className="g-4">
        <Card>
          <Form>
            <div id="title">
              <Form.Label>
                <h1>주문이 완료되었습니다.</h1>
              </Form.Label>
            </div>
          </Form>
        </Card>
        <Link to={`/list`} style={{ 
                padding: "0px",
                marginTop:"5px"
              }}>
          <Button style={{
                width:"100%",  
              }}>확인</Button>
        </Link>
      </Row>
    </div>
  );
}

export default Order_Confirm;
