import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const ContactPage = () => {
  return (
    <Container fluid>
      {/* Google Map Section */}
      <Row>
        <Col xs={12}>
          <div className="google-map">
            <iframe
              title="Google Map"
              width="100%"
              height="400px"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24146.57573444663!2d-74.01277709962329!3d40.71272806353671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3161c3c96f%3A0x485b0a0e9f4238db!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1694857272845!5m2!1sen!2s"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </Col>
      </Row>

      {/* Form and Contact Info Section */}
      <Row className="mt-4">
        {/* Form */}
        <Col xs={12} md={6}>
          <Form className="d-flex flex-column gap-2">
            <Form.Group controlId="formName">
              <Form.Label className="text-14 mb-0">Họ tên</Form.Label>
              <Form.Control type="text" placeholder="Nhập họ tên" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="text-14 mb-0">Email</Form.Label>
              <Form.Control type="email" placeholder="Nhập email" />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="text-14 mb-0">Điện thoại</Form.Label>
              <Form.Control type="text" placeholder="Nhập điện thoại" />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label className="text-14 mb-0">Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập nội dung"
              />
            </Form.Group>

            <Button
              variant="warning"
              type="submit"
              className="mt-3 text-white text-14"
            >
              <b> GỬI LIÊN HỆ</b>
            </Button>
          </Form>
        </Col>

        {/* Contact Info */}
        <Col xs={12} md={6}>
          <div className="contact-info text-14">
            <h6>SYSTEM-COIN.VERCEL.APP</h6>
            <p>Địa chỉ: 03 - RSAF helipad - Singapore</p>
            <p>Điện thoại: @sanpimod (Telegram)</p>
            <p>Hotline: @sanpimod (Telegram)</p>
            <p>Email: support@sanpinetwork.com</p>
            <p>Website: www.sanpinetwork.com</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
