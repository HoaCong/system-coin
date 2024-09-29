import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { actionWithDrawOrder } from "store/Coin/action";
import * as Yup from "yup";

const Withdraw = () => {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.coinReducer);
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const onWithdraw = (params) => dispatch(actionWithDrawOrder(params));

  const enumCoinCurrent = {
    PI_NETWORD: {
      wallet: user["wallet_pi"],
      coin: user["picoin"],
    },
    SIDRA: {
      wallet: user["wallet_sidra"],
      coin: user["sidracoin"] || 0,
    },
  };

  const count_coin_invalid = () =>
    `Số coin muốn rút vượt quá số coin khả dụng (${
      enumCoinCurrent[formik.values.type_coin]["coin"]
    } coin)`;
  // Initialize formik with type_coin included in the initial values
  const formik = useFormik({
    initialValues: {
      count_coin: "",
      wallet_coin: enumCoinCurrent.PI_NETWORD.wallet, // Default to PI_NETWORD wallet
      type_coin: "PI_NETWORD", // Add type_coin to initial values
    },
    validationSchema: Yup.object({
      count_coin: Yup.number()
        .required("Vui lòng nhập số coin muốn rút")
        .test("is-within-balance", "count_coin_invalid", function (value) {
          const sodu = enumCoinCurrent[this.parent.type_coin]["coin"];
          console.log("sodu:", sodu);
          return value <= sodu;
        }),
      wallet_coin: Yup.string().required("Vui lòng nhập ví coin"),
    }),
    onSubmit: (values) => {
      console.log("Form data", values);
      onWithdraw(values);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      formik.setFieldValue("type_coin", "PI_NETWORD"); // Reset type_coin to default on success
      formik.setFieldValue("wallet_coin", enumCoinCurrent["PI_NETWORD"].wallet); // Reset wallet accordingly
    }
  }, [isSuccess]);

  const handleCoinChange = (coinType) => {
    formik.setFieldValue("type_coin", coinType); // Update type_coin in formik
    formik.setFieldValue("wallet_coin", enumCoinCurrent[coinType].wallet); // Update wallet based on selected coin type
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col xs={12} md={6} className="mx-auto">
          <h5>
            <b>RÚT COIN</b>
          </h5>
          <Form
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column gap-2"
          >
            <div className="d-flex">
              {["PI_NETWORD", "SIDRA"].map((coinType) => (
                <div
                  key={coinType}
                  className={`p-2 text-center w-100 cursor-pointer fw-bold ${
                    formik.values.type_coin === coinType
                      ? "bg-warning text-white"
                      : "bg-light text-warning"
                  }`}
                  onClick={() => handleCoinChange(coinType)}
                >
                  {coinType === "PI_NETWORD" ? "π PICOIN" : "$ SIDRACOIN"}
                </div>
              ))}
            </div>

            <Form.Group controlId="formcount_coin">
              <Form.Label className="text-14 mb-0">Số coin muốn rút</Form.Label>
              <Form.Control
                as={NumericFormat}
                type="text"
                name="count_coin"
                placeholder="Số coin muốn rút"
                onValueChange={({ value }) =>
                  formik.setFieldValue("count_coin", value)
                }
                onBlur={formik.handleBlur}
                value={formik.values.count_coin}
                allowNegative={false}
                allowLeadingZeros={false}
                thousandSeparator=","
                decimalScale={0} // Không cho phép nhập số thập phân
                isInvalid={
                  formik.touched.count_coin && formik.errors.count_coin
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.count_coin === "count_coin_invalid"
                  ? count_coin_invalid()
                  : formik.errors.count_coin}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formcontact">
              <Form.Label className="text-14 mb-0">Ví coin</Form.Label>
              <Form.Control
                name="wallet_coin"
                placeholder="Ví coin"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.wallet_coin}
                readOnly
                isInvalid={
                  formik.touched.wallet_coin && formik.errors.wallet_coin
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.wallet_coin}
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
              <b>RÚT</b>
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Withdraw;
