import {
  Col,
  Row,
  Card,
  Button,
  Form,
  Figure,
  Table,
  FormControl,
  Badge,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom"; 

function ChatRoom() {
  const [input, setInput] = useState("");
  const [chatInfo, setChatInfo] = useState(); 
  const location = useLocation();
  const onChange = (event) => {
    setInput(event.target.value);
  };

  const onClick = () => {
    alert("전송");
     
  };

  

  const create = async (location) => {
    let headers = new Headers({
      "Content-Type": "application/json",
    });
    const token = sessionStorage.getItem("token");
    if (token && token !== null) {
      headers.append("Authorization", "Bearer " + token);
    }

    try {
      const response = await fetch(`http://localhost:8080/chat/room`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          postId: location.state.postId,
          writerId: location.state.writerId,
        }),
      });
      const json = await response.json();

      if (!response.ok) {
        throw Error("채팅 오류가 발생하였습니다.");
      } else {
        console.info(json);
        setChatInfo(json);
        alert("채팅이 시작 되었습니다.");
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    create(location);
  }, []);

  return (
    <div className="post">
      <Row xs={1} md={1} className="g-4">
        <Card>
          <Form>
            <div id="title">
              <Form.Label>
                <h1>채팅</h1>
              </Form.Label>
            </div>
          </Form>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
              </tr>
            </tbody>
          </Table>
        </Card>
        <Form.Control
          type="text"
          onChange={onChange}
          placeholder="주문자 명"
          name="recipient"
        />
        <Button onClick={onClick}>전송</Button>
      </Row>
    </div>
  );
}

export default ChatRoom;
