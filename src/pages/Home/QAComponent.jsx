import { useState } from "react";
import { Card, Col, Dropdown, Image, Nav, Row } from "react-bootstrap";

const questions = [
  {
    avatar: "https://via.placeholder.com/40",
    username: "cdvlg21.1",
    role: "Visitor",
    title: "Auto-populate fields with default values for imported records?",
    content:
      "I want certain fields in my table to auto-populate with the designated default values I've given them...",
    time: "May 18, 2023 12:54:38 PM",
    postCategory: "Base Design",
    views: 10,
    comments: 1,
    likes: 0,
  },
  {
    avatar: "https://via.placeholder.com/40",
    username: "LeighAnnMoItz 6",
    role: "Interface Innovator",
    title: "Rollup romula - count unique values in linked records",
    content:
      "I don't know if this is possible... if anyone tells me to restructure my data, I'm quitting lol...",
    time: "May 18, 2023 12:54:38 PM",
    postCategory: "Data Design",
    views: 8,
    comments: 2,
    likes: 1,
  },
];

const QAItem = ({ question, index }) => (
  <div>
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex gap-2">
          <div xs="auto">
            <Image src={question.avatar} roundedCircle />
          </div>
          <div xs className="px-0">
            <div>
              <strong>{question.username}</strong> -{" "}
              <span className="text-muted">{question.role}</span>
            </div>
            <h5 className="mt-2">{question.title}</h5>
            <p className="text-muted">{question.content}</p>
            <small className="text-muted">
              {question.time} | Posted in {question.postCategory}
            </small>
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="d-flex text-secondary gap-4">
        <div>
          <i className="fas fa-eye"></i> {question.views}
        </div>
        <div>
          <i className="fas fa-comment"></i> {question.comments}
        </div>
        <div>
          <i className="fas fa-thumbs-up"></i> {question.likes}
        </div>
      </Card.Footer>
    </Card>
    {index < questions.length - 1 && <hr />}
  </div>
);

const QAList = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredQuestions = questions.filter((question) => {
    if (activeTab === "all") return true;
    if (activeTab === "solutions") return question.comments > 0;
    if (activeTab === "unanswered") return question.comments === 0;
    return true;
  });

  return (
    <>
      <Row className="my-4">
        <Col>
          <h3>Ask A Question Activity</h3>
        </Col>
        <Col className="text-end">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Most recent
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/oldest">Oldest</Dropdown.Item>
              <Dropdown.Item href="#/newest">Newest</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Nav
        variant="tabs"
        defaultActiveKey="all"
        activeKey={activeTab}
        onSelect={(selectedKey) => setActiveTab(selectedKey)}
        className="mb-4"
      >
        <Nav.Item>
          <Nav.Link eventKey="all">All</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="solutions">Solutions</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="unanswered">Unanswered</Nav.Link>
        </Nav.Item>
      </Nav>
      {filteredQuestions.map((question, index) => (
        <QAItem key={index} question={question} index={index} />
      ))}
    </>
  );
};

export default QAList;
