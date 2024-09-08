import { useFormik } from "formik";
import { handleUploadImage } from "helper/functions";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { actionEdit } from "store/Customer/action";
import { addToast } from "store/Toast/action";
import * as Yup from "yup";

const PersonalInfoForm = () => {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.customerReducer);
  const dispatch = useDispatch();
  const onAddToast = (data) => dispatch(addToast(data));
  const onUpdateInfo = (body) => dispatch(actionEdit(body));
  const formik = useFormik({
    initialValues: {
      image: user?.image || "",
      email: user?.email || "",
      full_name: user?.full_name || "",
      phone: user?.phone || "",
    },
    validationSchema: Yup.object({
      image: Yup.mixed().required("Ảnh đại diện là bắt buộc"),
      full_name: Yup.string().required("Họ tên là bắt buộc"),
      phone: Yup.string()
        .matches(/^(0|84)([0-9]{9,10})$/, "Số điện thoại chưa hợp lệ")
        .required("Vui lòng nhập số điện thoại"),
    }),
    onSubmit: (values) => {
      onUpdateInfo({
        id: user?.id,
        image: values?.image,
        full_name: values?.full_name,
        phone: values?.phone,
      });
    },
  });

  const onUploadImage = (event) => {
    handleUploadImage(
      event,
      (url) => {
        formik.setFieldValue("image", url);
        onAddToast({
          text: "Tải ảnh lên thành công",
          type: "success",
          title: "",
        });
      },
      (error) => {
        console.log("onUploadImage  error:", error);
        onAddToast({
          text: "Đã xảy ra lỗi, Vui lòng thử lại",
          type: "danger",
          title: "",
          life: 10000,
        });
      }
    );
  };

  return (
    <div>
      <h5 className="mb-4">
        <b>THÔNG TIN CÁ NHÂN</b>
      </h5>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <Form.Label>1) Ảnh đại diện:</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Group controlId="formFile">
              <InputGroup>
                <Form.Control
                  className="shadow-none"
                  value={formik?.values.image}
                  readOnly
                />
                <Form.Control
                  type="file"
                  name="image"
                  onChange={onUploadImage}
                />
              </InputGroup>

              {formik.touched.image && formik.errors.image ? (
                <small className="text-danger">{formik.errors.image}</small>
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <Form.Label>
              2) Email <span className="text-danger">*</span>
            </Form.Label>
          </Col>
          <Col md={9}>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                disabled
              />
              {formik.touched.email && formik.errors.email ? (
                <small className="text-danger">{formik.errors.email}</small>
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <Form.Label>
              3) Họ tên <span className="text-danger">*</span>
            </Form.Label>
          </Col>
          <Col md={9}>
            <Form.Group controlId="formFull_name">
              <Form.Control
                className="shadow-none"
                type="text"
                name="full_name"
                value={formik.values.full_name}
                onChange={formik.handleChange}
              />
              {formik.touched.full_name && formik.errors.full_name ? (
                <small className="text-danger">{formik.errors.full_name}</small>
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <Form.Label>
              4) Điện thoại (Ex: +84...) <span className="text-danger">*</span>
            </Form.Label>
          </Col>
          <Col md={9}>
            <Form.Group controlId="formPhone">
              <NumericFormat
                id="phone"
                name="phone"
                placeholder="Điện thoại"
                displayType={"input"}
                className="form-control shadow-none"
                aria-describedby="helperNumberSession"
                value={formik.values.phone}
                onChange={formik.handleChange}
                allowLeadingZeros
              />
              {formik.touched.phone && formik.errors.phone ? (
                <small className="text-danger">{formik.errors.phone}</small>
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="warning"
          className="text-white"
          type="submit"
          disabled={isLoading || !formik.dirty}
        >
          {isLoading && (
            <div
              className="spinner-border text-white me-2"
              role="status"
              style={{ width: 16, height: 16 }}
            ></div>
          )}
          <b>LƯU LẠI</b>
        </Button>
      </Form>
    </div>
  );
};

export default PersonalInfoForm;
