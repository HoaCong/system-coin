/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { actionEditWallet } from "store/Customer/action";
function FormWallet() {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  console.log("FormBankAccount  user:", user);
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.customerReducer);

  const dispatch = useDispatch();
  const onUpdateWallet = (body) => dispatch(actionEditWallet(body));

  const formik = useFormik({
    initialValues: {
      wallet_pi: user?.wallet_pi || "",
      wallet_sidra: user?.wallet_sidra || "",
    },
    // validationSchema: Yup.object({
    //   wallet_pi: Yup.string().required("Vui lòng nhập địa chỉ ví Pi"),
    //   wallet_sidra: Yup.string().required("Vui lòng nhập địa chỉ ví Sidra"),O
    // }),
    onSubmit: (values) => {
      onUpdateWallet({
        id: user?.id,
        wallet_pi: values.wallet_pi,
        wallet_sidra: values.wallet_sidra,
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
        <b>VÍ CỦA TÔI</b>
      </h5>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <Form.Label for="wallet_pi">1) Địa chỉ ví Pi</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control
              type="text"
              id="wallet_pi"
              name="wallet_pi"
              placeholder="Ví Pi"
              value={formik.values.wallet_pi}
              aria-describedby="helperwallet_pi"
              onChange={formik.handleChange}
              isInvalid={formik.touched.wallet_pi && formik.errors.wallet_pi}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.wallet_pi}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <Form.Label for="wallet_sidra">2) Địa chỉ ví Sidra</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control
              id="wallet_sidra"
              name="wallet_sidra"
              className="shadow-none"
              placeholder="Ví Sidra"
              value={formik.values.wallet_sidra}
              aria-describedby="helperwallet_sidra"
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.wallet_sidra && formik.errors.wallet_sidra
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.wallet_sidra}
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

export default FormWallet;
