import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Main() {
  // const request = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8080/oauth2/authorization/google",
  //       {
  //         method: "GET",
  //         mode: "cors",
  //       }
  //     );
  //     const json = await response.json();
  //     if (!response.ok) {
  //       throw Error("오류가 발생하였습니다.");
  //     } else {
  //       alert(json);
  //     }
  //   } catch (e) {
  //     alert(e);
  //   }
  // };
  return (
    <Row>
      <Col></Col>
      <Col xs={10}>
        <Card style={loginForm}>
          <Card.Body>
            <Card.Title>
              <h1>도서 중고마켓</h1>
              <h5>Book Used Market</h5>
              <br />
            </Card.Title>
            <Row>
              <Link to={`/signup`} style={loginButton}>
                <Button style={joinButton}>회원가입</Button>
              </Link>
            </Row>
            <Row>
              <Link to={`/login`} style={loginButton}>
                <Button style={basic}>로그인</Button>
              </Link>
            </Row>

            <Row style={loginButton}>
              <Link to={`/`}>
                <Button style={google}>Google 로그인</Button>
              </Link>
            </Row>

            <Row style={loginButton}>
              <Link to={`/`}>
                <Button style={naver}>NAVER 로그인</Button>
              </Link>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default Main;

const loginButton = {
  marginBottom: "10px",
};
const joinButton = {
  backgroundColor: "red",
  borderColor: "red",
  width: "30%",
};
const basic = {
  backgroundColor: "#ffc400de",
  borderColor: "#ffc400de",
  width: "30%",
};
const google = {
  backgroundColor: "#4285f4",
  borderColor: "#4285f4",
  width: "30%",
};
const naver = {
  backgroundColor: "#00c73c",
  borderColor: "#00c73c",
  width: "30%",
};
const loginForm = {
  textAlign: "center",
  fontWeight: "700",
  marginTop: "50px",
  marginLeft: "100px",
  marginRight: "100px",
  marginBottom: "50px",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
};
