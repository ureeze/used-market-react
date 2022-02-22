import { useState } from "react";
import {
  Col,
  Row,
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
  Image,
} from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavicationBar from "./NavicationBar.js";

function UpdatePost() {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL;

  const state = useLocation().state;
  const [inputs, setInputs] = useState({
    postTitle: state.post.postTitle,
    postContent: state.post.postContent,
    bookTitle: state.post.book.bookTitle,
    bookCategory: state.post.book.bookCategory,
    bookStatus: state.post.book.bookStatus,
    stock: state.post.book.stock,
    unitPrice: state.post.book.unitPrice,
    bookImgUrl: state.post.book.bookImgUrl,
  });
  console.log(inputs);
  const { postId } = useParams();

  const {
    postTitle,
    postContent,
    bookTitle,
    bookCategory,
    bookStatus,
    stock,
    unitPrice,
    bookImgUrl,
  } = inputs;

  const onNumChange = (event) => {
    if (event.target.value <= 0) {
      alert("0보다 작을 수 없습니다.");
      return;
    }

    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const update_post = async () => {
    let headers = new Headers({
      "Content-Type": "application/json",
    });
    const token = sessionStorage.getItem("token");
    if (token && token !== null) {
      headers.append("Authorization", "Bearer " + token);
    }

    try {
      const response = await fetch(`${baseURL}/posts/${postId}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(inputs),
      });
      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        throw Error("포스트 수정에 실패하였습니다.");
      } else {
        alert("포스트가 수정 되었습니다.");
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
    } else if (stock <= 0) {
      alert("재고 수량은 1권 이상이어야 합니다.");
      return;
    } else if (unitPrice <= 0) {
      alert("금액을 설정 해주시기 바랍니다.");
      return;
    } else if (bookCategory.length === 0) {
      alert("책의 분류를 지정 해주시기 바랍니다.");
      return;
    } else if (bookStatus.length === 0) {
      alert("책의 상태를 지정 해주시기 바랍니다.");
      return;
    }
    update_post();
  };

  return (
    <>
      <NavicationBar />
      <Row>
        <Col></Col>
        <Col xs={7}>
          <Row xs={1} md={1} className="g-4">
            <Card>
              <Form>
                <div
                  id="title"
                  style={{
                    textAlign: "center",
                    marginTop: "30px",
                    marginBottom: "0px",
                  }}
                >
                  <Form.Label>
                    <h2>포스트 수정</h2>
                  </Form.Label>
                  <hr></hr>
                  <Form.Group
                    className="mb-3"
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                  >
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="글 제목을 입력하세요"
                      name="postTitle"
                      value={postTitle}
                      onChange={onChange}
                    />
                  </Form.Group>
                </div>

                <Row
                  className="align-items-center"
                  style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Col sm={4}>
                    <Image
                      width="171"
                      height="180"
                      alt="이미지"
                      src={bookImgUrl}
                      disabled
                    />
                  </Col>

                  <Col sm={8}>
                    <Row xs={1} md={1} className="align-items-center">
                      <Col xs="auto" className="my-1">
                        <InputGroup>
                          <InputGroup.Text>도서 명</InputGroup.Text>
                          <Form.Control
                            className="text-right"
                            type="text"
                            name="bookTitle"
                            placeholder="도서 이름"
                            value={bookTitle}
                            disabled
                          />
                        </InputGroup>
                      </Col>
                      <Col xs="auto" className="my-1">
                        <InputGroup>
                          <InputGroup.Text>재고 수량</InputGroup.Text>
                          <FormControl
                            className="text-right"
                            placeholder="재고 수량"
                            aria-label="Amount (to the nearest dollar)"
                            type="number"
                            name="stock"
                            value={stock}
                            onChange={onNumChange}
                          />
                          <InputGroup.Text>권</InputGroup.Text>
                        </InputGroup>
                      </Col>
                      <Col xs="auto" className="my-1">
                        <InputGroup>
                          <InputGroup.Text>권 당 가격</InputGroup.Text>
                          <FormControl
                            className="text-right"
                            placeholder="가격"
                            type="number"
                            aria-label="Amount (to the nearest dollar)"
                            name="unitPrice"
                            value={unitPrice}
                            onChange={onNumChange}
                          />
                          <InputGroup.Text>원</InputGroup.Text>
                        </InputGroup>
                      </Col>
                      <Col xs="auto" className="my-1">
                        <InputGroup>
                          <InputGroup.Text>분류</InputGroup.Text>
                          <Form.Select
                            id="category"
                            name="bookCategory"
                            value={bookCategory}
                            onChange={onChange}
                          >
                            <option className="select-option">
                              =======================
                            </option>
                            <option className="select-option" value="경제">
                              경제
                            </option>
                            <option className="select-option" value="소설">
                              소설
                            </option>
                            <option className="select-option" value="인문">
                              인문
                            </option>
                            <option className="select-option" value="역사">
                              역사
                            </option>
                            <option className="select-option" value="과학">
                              과학
                            </option>
                            <option className="select-option" value="예술">
                              예술
                            </option>
                            <option className="select-option" value="종교">
                              종교
                            </option>
                            <option className="select-option" value="여행">
                              여행
                            </option>
                            <option className="select-option" value="학습">
                              학습
                            </option>
                            <option className="select-option" value="기타">
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
                            value={bookStatus}
                            onChange={onChange}
                          >
                            <option className="select-option">
                              =======================
                            </option>
                            <option className="select-option" value="S">
                              S
                            </option>
                            <option className="select-option" value="AAA">
                              AAA
                            </option>
                            <option className="select-option" value="B">
                              B
                            </option>
                            <option className="select-option" value="C">
                              C
                            </option>
                          </Form.Select>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Form.Group className="mb-3" style={{ margin: "20px" }}>
                  <Form.Label>
                    <h4>상세 내용</h4>
                  </Form.Label>
                  <Form.Control
                    className="post-content"
                    id="post-textarea"
                    as="textarea"
                    rows={9}
                    plaintext
                    placeholder=" 판매 할 도서의 상세 내용을 입력해주세요."
                    name="postContent"
                    onChange={onChange}
                    value={postContent}
                    style={{
                      padding: "10px",
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
              수정하기
            </Button>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default UpdatePost;
