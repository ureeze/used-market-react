import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL;

  const onChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const onClick = () => {
    sendRequest(loginDetails);
  };

  const sendRequest = async () => {
    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });
      const json = await response.json();
      if (!response.ok) {
        throw Error("로그인에 실패하였습니다.");
      } else {
        console.log(json);
        sessionStorage.setItem("token", json.token);
        sessionStorage.setItem("userId", json.userId);
        sessionStorage.setItem("email", json.email);
        sessionStorage.setItem("name", json.name);

        navigate(`/list`);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Row>
      <Col></Col>
      <Col xs={7} style={loginStyle}>
        <Card>
          <Card.Body>
            <Card.Title>
              <div>
                <h1>도서 중고마켓</h1>
              </div>
              <div>Book Used Market</div>
              <br />
            </Card.Title>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>이메일</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={onChange}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      sendRequest();
                    }
                  }}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <Button
          variant="primary"
          type="submit"
          style={{ width: "100%", marginTop: "5px" }}
          onClick={onClick}
        >
          로그인
        </Button>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default LoginForm;

const loginStyle = {
  marginTop: "50px",
  marginLeft: "100px",
  marginRight: "100px",
  marginBottom: "50px",
};
