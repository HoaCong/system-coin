/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { actionEditBank } from "store/Customer/action";
import * as Yup from "yup";
function FormBankAccount() {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  console.log("FormBankAccount  user:", user);
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.customerReducer);

  const dispatch = useDispatch();
  const onUpdateBank = (body) => dispatch(actionEditBank(body));

  const formik = useFormik({
    initialValues: {
      name_bank: user?.name_bank || "",
      stk: user?.stk || "",
      full_name_bank: user?.full_name_bank || "",
    },
    validationSchema: Yup.object({
      name_bank: Yup.string().required("Vui lòng nhập tên ngân hàng"),
      stk: Yup.string()
        .required("Vui lòng nhập số tài khoản")
        .max(16, "Số tài khoản tối đa 16 chữ số"),
      full_name_bank: Yup.string().required("Vui lòng nhập họ tên chủ sở hữu"),
    }),
    onSubmit: (values) => {
      onUpdateBank({
        id: user?.id,
        name_bank: values.name_bank,
        stk: values.stk,
        full_name_bank: values.full_name_bank,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm({ values: formik.values });
    }
  }, [isSuccess]);

  return (
    <div>
      <h5 className="mb-4">
        <b>THÔNG TIN TÀI KHOẢN</b>
      </h5>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <Form.Label>
              1) Tên ngân hàng <span className="required">*</span>
            </Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control
              type="text"
              id="name_bank"
              name="name_bank"
              placeholder="Tên ngân hàng"
              value={formik.values.name_bank}
              aria-describedby="helpername_bank"
              onChange={formik.handleChange}
              isInvalid={formik.touched.name_bank && formik.errors.name_bank}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name_bank}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <Form.Label>
              2) Số tài khoản <span className="required">*</span>
            </Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control
              as={NumericFormat}
              id="stk"
              name="stk"
              className="shadow-none"
              placeholder="Số tài khoản"
              value={formik.values.stk}
              aria-describedby="helperstk"
              onChange={formik.handleChange}
              allowLeadingZeros
              isInvalid={formik.touched.stk && formik.errors.stk}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.stk}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <Form.Label>
              3) Tên chủ sở hữu <span className="required">*</span>
            </Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control
              id="full_name_bank"
              name="full_name_bank"
              placeholder="Chủ sở hữu"
              aria-describedby="helperfull_name_bank"
              value={formik.values.full_name_bank}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.full_name_bank && formik.errors.full_name_bank
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.full_name_bank}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Button
          variant="warning"
          className="text-white mt-3"
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
          <small>
            <b>LƯU LẠI</b>
          </small>
        </Button>
      </Form>
    </div>
  );
}

export default FormBankAccount;
