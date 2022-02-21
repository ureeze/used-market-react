import { useState } from "react";
import {
  Col,
  Row,
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
  Figure,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavicationBar from "./NavicationBar.js";

function WritePost() {
  const [inputs, setInputs] = useState({
    postTitle: "",
    postContent: "",
    bookTitle: "",
    bookCategory: "",
    bookStatus: "",
    stock: 0,
    unitPrice: 0,
  });
  const navigate = useNavigate();

  const {
    postTitle,
    postContent,
    bookTitle,
    bookCategory,
    bookStatus,
    stock,
    unitPrice,
  } = inputs;

  const onChange = (event) => {
    const { name, value } = event.target;
    let inputValue;
    if (name === "stock" || name === "unitPrice") {
      inputValue = parseInt(value);
    } else {
      inputValue = value;
    }

    setInputs({
      ...inputs,
      [name]: inputValue,
    });
  };

  const save_post = async () => {
    let headers = new Headers({
      "Content-Type": "application/json",
    });
    const token = sessionStorage.getItem("token");
    if (token && token !== null) {
      headers.append("Authorization", "Bearer " + token);
    }

    try {
      const response = await fetch(`http://localhost:8080/posts`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(inputs),
      });
      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        throw Error("포스트 작성에 실패하였습니다.");
      } else {
        alert("작성하신 포스트가 등록 되었습니다.");
        navigate(`/list`);
      }
    } catch (e) {
      alert(e);
    }
  };

  const onClick = () => {
    console.log(inputs);
    if (postTitle.length < 6) {
      alert("POST 제목은 6글자 이상이어야 합니다.");
      return;
    } else if (postContent.length === 0) {
      alert("POST 내용을 작성해 주시기 바랍니다.");
      return;
    } else if (bookTitle.length === 0) {
      alert("도서 명을 작성해 주시기 바랍니다.");
      return;
    } else if (stock === 0) {
      alert("재고 수량은 1권 이상이어야 합니다.");
      return;
    } else if (unitPrice === 0) {
      alert("금액을 설정 해주시기 바랍니다.");
      return;
    } else if (bookCategory.length === 0) {
      alert("책의 분류를 지정 해주시기 바랍니다.");
      return;
    } else if (bookStatus.length === 0) {
      alert("책의 상태를 지정 해주시기 바랍니다.");
      return;
    }
    save_post();
  };

  return (
    <>
      <NavicationBar />
      <Row>
        <Col></Col>
        <Col xs={7}>
          <Row xs={1} md={1} className="g-4">
            <Card>
              <Form style={{ marginBottom: "50px" }}>
                <div style={writePost}>
                  <Form.Label>
                    <h2>판매 포스트 작성</h2>
                  </Form.Label>
                  <hr></hr>
                  <Form.Group className="mb-3">
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="글 제목을 입력하세요"
                      name="postTitle"
                      onChange={onChange}
                    />
                  </Form.Group>
                </div>

                <Row className="align-items-center" style={writePost}>
                  <Col sm={4}>
                    <Figure>
                      <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src="https://react-bootstrap-v3.netlify.app/thumbnail.png"
                      />
                    </Figure>
                  </Col>
                  <Col xs={8}>
                    <Row xs={1} md={1} className="align-items-center">
                      <Col xs="auto" className="my-1">
                        <InputGroup>
                          <InputGroup.Text>도서 명</InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="bookTitle"
                            placeholder="도서 이름"
                            style={textRight}
                            onChange={onChange}
                          />
                        </InputGroup>
                      </Col>
                      <Col xs="auto" className="my-1">
                        <InputGroup>
                          <InputGroup.Text>재고 수량</InputGroup.Text>
                          <FormControl
                            style={textRight}
                            placeholder="재고 수량"
                            aria-label="Amount (to the nearest dollar)"
                            type="number"
                            name="stock"
                            onChange={onChange}
                          />
                          <InputGroup.Text>권</InputGroup.Text>
                        </InputGroup>
                      </Col>
                      <Col xs="auto" className="my-1">
                        <InputGroup>
                          <InputGroup.Text>권 당 가격</InputGroup.Text>
                          <FormControl
                            style={textRight}
                            placeholder="가격"
                            type="number"
                            aria-label="Amount (to the nearest dollar)"
                            name="unitPrice"
                            onChange={onChange}
                          />
                          <InputGroup.Text>원</InputGroup.Text>
                        </InputGroup>
                      </Col>
                      <Col xs="auto" className="my-1">
                        <InputGroup>
                          <InputGroup.Text>분류</InputGroup.Text>
                          <Form.Select name="bookCategory" onChange={onChange}>
                            <option style={textCenter}>
                              =======================
                            </option>
                            <option style={textCenter} value="경제">
                              경제
                            </option>
                            <option style={textCenter} value="소설">
                              소설
                            </option>
                            <option style={textCenter} value="인문">
                              인문
                            </option>
                            <option style={textCenter} value="역사">
                              역사
                            </option>
                            <option style={textCenter} value="과학">
                              과학
                            </option>
                            <option style={textCenter} value="예술">
                              예술
                            </option>
                            <option style={textCenter} value="종교">
                              종교
                            </option>
                            <option style={textCenter} value="여행">
                              여행
                            </option>
                            <option style={textCenter} value="학습">
                              학습
                            </option>
                            <option style={textCenter} value="기타">
                              기타
                            </option>
                          </Form.Select>
                        </InputGroup>
                      </Col>
                      <Col xs="auto" className="my-1">
                        <InputGroup>
                          <InputGroup.Text>상태</InputGroup.Text>
                          <Form.Select
                            id="inlineFormCustomSelect"
                            name="bookStatus"
                            onChange={onChange}
                          >
                            <option style={textCenter}>
                              =======================
                            </option>
                            <option style={textCenter} value="S">
                              S
                            </option>
                            <option style={textCenter} value="AAA">
                              AAA
                            </option>
                            <option style={textCenter} value="B">
                              B
                            </option>
                            <option style={textCenter} value="C">
                              C
                            </option>
                          </Form.Select>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Form.Group className="mb-3" style={{ margin: "30px" }}>
                  <Form.Label>
                    <h4>상세 내용</h4>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    plaintext
                    placeholder=" 판매 할 도서의 상세 내용을 입력해주세요."
                    name="postContent"
                    onChange={onChange}
                    style={{
                      padding: "10px",
                      borderColor: "#ced4da",
                      border: "1px solid #ced4da",
                    }}
                  />
                </Form.Group>
              </Form>
            </Card>

            <Button
              id="order-button"
              style={{
                marginTop: "5px",
              }}
              variant="primary"
              onClick={onClick}
            >
              판매 등록하기
            </Button>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default WritePost;

const textCenter = {
  textAlign: "center",
};
const textRight = {
  textAlign: "right",
};
const writePost = {
  textAlign: "center",
  marginLeft: "32px",
  marginRight: "32px",
  marginTop: "30px",
  marginBottom: "50px",
};
