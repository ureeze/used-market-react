import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import "./Login_form.css";

function Login_form() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginDetails;

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

  const sendRequest = async (data) => {
    try{
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (!response.ok) {
      throw Error("로그인에 실패하였습니다.");
    } else {
      console.log(json.token);
      sessionStorage.setItem("token", json.token);
      window.location.href = "/list";
    }
  }catch(e){
    alert(e);
  }
  };

  return (
    <div className="login_form">
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
              />
            </Form.Group>
          </Form>
        </Card.Body>
        <Button variant="primary" type="submit" onClick={onClick}>
          로그인
        </Button>
      </Card>
    </div>
  );
}

export default Login_form;