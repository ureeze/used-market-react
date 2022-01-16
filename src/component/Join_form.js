import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import "./Login_form.css";

function Join_form() {
  const [joinDetails, setJoinDetails] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const { email, userName, password } = joinDetails;

  const onChange = (event) => {
    const { name, value } = event.target;

    setJoinDetails({
      ...joinDetails,
      [name]: value,
    });
  };

  const onClick = () => {
    console.log(joinDetails);
    console.log(userName.length);
    if (email === "") {
      alert("[Email]이 빈칸입니다.");
      return;
    }
    if (userName === "") {
      alert("[이름]이 빈칸입니다.");
      return;
    } else if (userName.length < 2) {
      alert("[이름]이 2글자 이상이어야 합니다.");
      return;
    }
    if (password === "") {
      alert("[password]이 빈칸입니다.");
      return;
    } else if (password.length < 5) {
      alert("[password]이 5글자 이상이어야 합니다.");
      return;
    }
    sendRequest(joinDetails);
  };

  const sendRequest = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log(response);
      console.log(json);
      if (!response.ok) {
        throw Error("가입 실패");
      } else {
        alert("가입 성공");
        window.location.href = "/";
      }
    } catch (e) {
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

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="userName"
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
        </Card.Body>
        <Button variant="danger" type="submit" onClick={onClick}>
          회원가입
        </Button>
      </Card>
    </div>
  );
}

export default Join_form;
