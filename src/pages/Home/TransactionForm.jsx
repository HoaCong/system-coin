import BtnBanks from "components/common/BtnBanks";
import UploadImage from "components/common/UploadImage";
import { ROUTES } from "constants/routerWeb";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionCreateOrder } from "store/Coin/action";
import * as Yup from "yup";

const TransactionForm = () => {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  const {
    list,
    actionStatus: { isLoading, isSuccess },
    payment,
  } = useSelector((state) => state.coinReducer);
  const dispatch = useDispatch();
  const onCreateOrder = (body) => dispatch(actionCreateOrder(body));
  const navigate = useNavigate();

  const [type, setType] = useState("PI_NETWORD");
  const [mode, setMode] = useState("SELL");

  const enumCoinCurrent = {
    PI_NETWORD: {
      SELL: list[0]?.giamua || 0,
      BUY: list[0]?.giaban || 0,
      wallet: "wallet_pi",
      address_pay: list[0]?.address_pay,
    },
    SIDRA: {
      SELL: list[1]?.giamua || 0,
      BUY: list[1]?.giaban || 0,
      wallet: "wallet_sidra",
      address_pay: list[1]?.address_pay,
    },
  };

  const handleChangeMode = (newMode) => {
    setMode(newMode);
    if (formik.values.count_coin) {
      handleChangeCoin(formik.values.count_coin, newMode);
    }
    if (newMode === "SELL" && formik.values.image_bill === "") {
      formik.setFieldValue("image_bill", "a");
    } else if (formik.values.image_bill === "a" && newMode === "BUY") {
      formik.setFieldValue("image_bill", "");
    }
  };

  const formik = useFormik({
    initialValues: {
      count_coin: "",
      total_money: "",
      image_bill: "a",
      stk: user?.stk || "",
      stk_name: user?.stk_name || "",
      stk_bank: user?.stk_bank || "",
    },
    validationSchema: Yup.object({
      count_coin: Yup.number()
        .required("Vui lòng nhập số coin")
        .min(5, `Số coin tối thiểu là 5`),
      image_bill: Yup.string().required("Vui lòng cập nhật ảnh bill"),
    }),
    onSubmit: (values) => {
      if (!values.stk) {
        return navigate(ROUTES.BANK_ACCOUNT);
      }
      const payload = {
        type_order: mode,
        type_coin: type,
        wallet_coin: user?.[enumCoinCurrent[type]["wallet"]],
        price_coin_current: enumCoinCurrent[type][mode],
        count_coin: values.count_coin,
        total_money: values.total_money,
        ...(mode === "BUY" && { image_bill: values.image_bill }),
        ...(mode === "SELL" && {
          stk: values.stk,
          stk_name: values.stk_name,
          stk_bank: values.stk_bank,
        }),
      };
      onCreateOrder(payload);
    },
  });

  useEffect(() => {
    if (user) {
      formik.resetForm({
        values: {
          ...formik.values,
          stk: user?.stk || "",
          stk_name: user?.full_name_bank || "",
          stk_bank: user?.name_bank || "",
        },
      });
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      setType("PI_NETWORD");
      setMode("SELL");
      formik.resetForm({
        count_coin: "",
        total_money: "",
        image_bill: "a",
        stk: user?.stk || "",
        stk_name: user?.stk_name || "",
        stk_bank: user?.stk_bank || "",
      });
    }
  }, [isSuccess]);

  const handleChangeCoin = (value, modeValue) => {
    formik.setFieldValue("count_coin", value);
    const newTotal = value * enumCoinCurrent[type][modeValue];
    formik.setFieldValue("total_money", newTotal);
  };

  return (
    <div className="card overflow-hidden">
      <div className="d-flex">
        {["PI_NETWORD", "SIDRA"].map((coinType) => (
          <div
            key={coinType}
            className={`p-2 text-center w-100 cursor-pointer fw-bold ${
              type === coinType
                ? "bg-warning text-white"
                : "bg-light text-warning"
            }`}
            onClick={() => setType(coinType)}
          >
            {coinType === "PI_NETWORD" ? "π PICOIN" : "$ SIDRACOIN"}
          </div>
        ))}
      </div>
      <div className="text-center my-2">
        <strong>MUA BÁN {type === "PI_NETWORD" ? "π" : "$"} TẠI TIỆM</strong>
      </div>
      <div className="mb-3 d-flex">
        {["SELL", "BUY"].map((orderMode) => (
          <div
            key={orderMode}
            className={`p-2 text-center w-100 cursor-pointer ${
              mode === orderMode
                ? "bg-warning text-white"
                : "bg-light text-warning"
            }`}
            onClick={() => handleChangeMode(orderMode)}
          >
            Bạn {orderMode === "SELL" ? "bán" : "mua"}{" "}
            {type === "PI_NETWORD" ? "π" : "$"}
          </div>
        ))}
      </div>

      <Form className="px-3" onSubmit={formik.handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column xs={5} className="text-end text-14">
            <span className="text-danger">*</span> Số{" "}
            {type === "PI_NETWORD" ? "π" : "$"} muốn{" "}
            {mode === "SELL" ? "bán" : "mua"}:
          </Form.Label>
          <Col xs={7}>
            <Form.Control
              as={NumericFormat}
              suffix={type === "PI_NETWORD" ? " π" : " $"}
              name="count_coin"
              className={`shadow-none ${
                formik.touched.count_coin && formik.errors.count_coin
                  ? "is-invalid"
                  : ""
              }`}
              placeholder={type === "PI_NETWORD" ? "π" : "$"}
              value={formik.values.count_coin}
              onValueChange={(values) =>
                handleChangeCoin(values.floatValue, mode)
              }
              allowLeadingZeros
              allowNegative={false}
              thousandSeparator=","
              aria-describedby="helpercount_coin"
            />
            {formik.touched.count_coin && formik.errors.count_coin ? (
              <div className="text-danger text-12">
                {formik.errors.count_coin}
              </div>
            ) : null}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column xs={5} className="text-end text-14">
            Bạn {mode === "SELL" ? "nhận" : "trả"}:
          </Form.Label>
          <Col xs={7}>
            <Form.Control
              as={NumericFormat}
              suffix=" ₫"
              name="total_money"
              className="shadow-none"
              placeholder="₫"
              value={formik.values.total_money}
              allowNegative={false}
              thousandSeparator=","
              aria-describedby="helpertotal_money"
              readOnly
            />
          </Col>
        </Form.Group>

        {mode === "SELL" ? (
          <>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xs={5} className="text-end text-14">
                Ví người bán:
              </Form.Label>
              <Col xs={7}>
                <Form.Control
                  className="shadow-none"
                  placeholder="Ví người bán"
                  value={enumCoinCurrent[type]["wallet"]}
                  readOnly
                />
              </Col>
            </Form.Group>
            <div className="text-center mb-1">
              <small>KIỂM TRA KỸ THÔNG TIN CỦA BẠN TRƯỚC KHI TẠO ĐƠN</small>
            </div>
            {[
              { label: "Ngân hàng", field: "stk_bank" },
              { label: "Số tài khoản", field: "stk" },
              { label: "Chủ sở hữu", field: "stk_name" },
            ].map((item, idx) => (
              <Form.Group as={Row} className="mb-3" key={idx}>
                <Form.Label column xs={5} className="text-end text-14">
                  <span className="text-danger">*</span> {item.label}:
                </Form.Label>
                <Col xs={7}>
                  <Form.Control
                    disabled
                    value={formik.values?.[item.field]}
                    type="text"
                    placeholder={item.label}
                  />
                </Col>
              </Form.Group>
            ))}
          </>
        ) : (
          <Row>
            <Col xs={12} md={6}>
              <Form.Group as={Row} className="mb-3 text-center">
                <Form.Label htmlFor="Image">
                  <span className="required">*</span> Ảnh bill
                </Form.Label>
                <UploadImage
                  image={formik.values.image_bill || ""}
                  callback={(url) =>
                    formik.handleChange({
                      target: {
                        name: "image_bill",
                        value: url,
                      },
                    })
                  }
                  geometry="radius"
                  showUpload={true}
                  classImage="mx-auto"
                />
                {formik.touched.image_bill && formik.errors.image_bill ? (
                  <Form.Text className="text-danger">
                    {formik.errors.image_bill}
                  </Form.Text>
                ) : null}
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <BtnBanks payment={payment} />
            </Col>
          </Row>
        )}

        <Form.Group as={Row} className="mb-3">
          <Col xs={12} className="text-center">
            <Button
              type="submit"
              variant="warning"
              className="text-white"
              disabled={isLoading || !user?.id}
            >
              {isLoading && (
                <div
                  className="spinner-border text-white me-2"
                  role="status"
                  style={{ width: 16, height: 16 }}
                ></div>
              )}
              Tạo đơn hàng {mode === "SELL" ? "Bán" : "Mua"}{" "}
              {type === "PI_NETWORD" ? "π" : "$"}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default TransactionForm;
