import React from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const SearchTransaction = () => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={5}>
          <h2 className="text-center">TRA CỨU GIAO DỊCH</h2>
          <p className="text-center">
            Nhập mã đơn hàng hay mã tin P2P của bạn (VD: dh7777 hay t2222)
          </p>
          <Form>
            <Form.Group controlId="transactionCode">
              <InputGroup>
                <Form.Control
                  className="shadow-none"
                  placeholder="Mã giao dịch"
                />
                <InputGroup.Text>
                  <i className="fas fa-search text-secondary"></i>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <div className="d-grid gap-2 mt-4">
              <Button variant="success" size="lg">
                TRA CỨU GIAO DỊCH
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchTransaction;
