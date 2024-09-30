import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { actionSendContact } from "store/Customer/action";
import * as Yup from "yup";

// Define validation schema using Yup
const validationSchema = Yup.object({
  full_name: Yup.string()
    .required("Vui lòng nhập họ tên")
    .min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email không hợp lệ"
    )
    .required("Vui lòng nhập email"),
  sdt: Yup.string()
    .matches(/^[0-9]+$/, "Điện thoại chỉ bao gồm số")
    .min(10, "Điện thoại phải có ít nhất 10 số")
    .required("Vui lòng nhập điện thoại"),
  content: Yup.string()
    .required("Vui lòng nhập nội dung")
    .min(10, "Nội dung phải có ít nhất 10 ký tự"),
});

const ContactPage = () => {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.customerReducer);
  const dispatch = useDispatch();
  const onSendContact = (params) => dispatch(actionSendContact(params));
  // Initialize formik
  const formik = useFormik({
    initialValues: {
      full_name: user?.full_name || "",
      email: user?.email || "",
      sdt: user?.phone || "",
      content: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSendContact(values);
      // You can handle form submission here (e.g., API call)
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
    }
  }, [isSuccess]);

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
          <Form
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column gap-2"
          >
            <Form.Group controlId="formName">
              <Form.Label className="text-14 mb-0">Họ tên</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                placeholder="Nhập họ tên"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.full_name}
                isInvalid={formik.touched.full_name && formik.errors.full_name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.full_name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="text-14 mb-0">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Nhập email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={formik.touched.email && formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formsdt">
              <Form.Label className="text-14 mb-0">Điện thoại</Form.Label>
              <Form.Control
                as={NumericFormat}
                type="text"
                name="sdt"
                placeholder="Nhập điện thoại"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sdt}
                allowNegative={false}
                allowLeadingZeros
                isInvalid={formik.touched.sdt && formik.errors.sdt}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.sdt}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formcontact">
              <Form.Label className="text-14 mb-0">Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                placeholder="Nhập nội dung"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content}
                isInvalid={formik.touched.content && formik.errors.content}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.content}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="warning"
              type="submit"
              className="mt-3 text-white text-14"
              disabled={isLoading}
            >
              {isLoading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
              )}
              <b> GỬI LIÊN HỆ</b>
            </Button>
          </Form>
        </Col>

        {/* Contact Info */}
        <Col xs={12} md={6}>
          <div className="content-info text-14">
            <h6>SYSTEM-COIN.VERCEL.APP</h6>
            <p>Địa chỉ: 99 BlueStar - Galaxy - Mitsubixy</p>
            <p>Điện thoại: 0332.986.587</p>
            <p>Telegram: t.me/+84332986587</p>
            <p>Facebook: www.facebook.com/profile.php?id=100079449032579</p>
            <p>Zalo: zalo.me/0332986587</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
