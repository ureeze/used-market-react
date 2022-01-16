import { Card, Button } from "react-bootstrap";
import "./Main.css";
import { Link } from "react-router-dom";

function Main() {
  const request = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/oauth2/authorization/google",
        {
          method: "GET",
          mode: "cors",
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw Error("오류가 발생하였습니다.");
      } else {
        alert(json);
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <Card className="login">
      <Card.Body>
        <Card.Title>
          <div>
            <h1>도서 중고마켓</h1>
          </div>
          <div>Book Used Market</div>
          <br />
        </Card.Title>

        <Link to={`/signup`}>
          <div className="login-button">
            <Button id="join-button">회원가입</Button>
          </div>
        </Link>
        <Link to={`/login`}>
          <div className="login-button">
            <Button id="basic">로그인</Button>
          </div>
        </Link>

        <div className="login-button" onClick={request}>
          <Button id="google">Google 로그인</Button>
        </div>

        <div className="login-button">
          <Button id="naver">NAVER 로그인</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Main;
