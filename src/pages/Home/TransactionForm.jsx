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
import { addToast } from "store/Toast/action";
import * as Yup from "yup";
import FormOrderSuccess from "./FormOrderSuccess";

const TransactionForm = () => {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  const {
    list,
    actionStatus: { isLoading, isSuccess },
    payment,
    detailOrder: { data, message },
  } = useSelector((state) => state.coinReducer);
  const dispatch = useDispatch();
  const onCreateOrder = (body) => dispatch(actionCreateOrder(body));
  const onAddToast = (data) => dispatch(addToast(data));

  const navigate = useNavigate();

  const [type, setType] = useState("PI_NETWORD");
  const [mode, setMode] = useState("SELL");
  const [isSellHot, setIsSellHot] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState({
    info: {},
    message: "",
    visible: false,
  });

  const enumCoinCurrent = {
    PI_NETWORD: {
      SELL: list[0]?.giamua || 0,
      BUY: list[0]?.giaban || 0,
      wallet: "wallet_pi",
      coin: user.picoin,
      address_pay: list[0]?.address_pay,
    },
    SIDRA: {
      SELL: list[1]?.giamua || 0,
      BUY: list[1]?.giaban || 0,
      wallet: "wallet_sidra",
      coin: user.sidracoin,
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
      setIsSellHot(false);
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
      count_coin: Yup.number().required("Vui lòng nhập số coin"),
      image_bill: Yup.string().required("Vui lòng cập nhật ảnh bill"),
    }),
    onSubmit: (values) => {
      if (!values.stk) {
        return navigate(ROUTES.BANK_ACCOUNT);
      }
      const payload = {
        type_order: isSellHot && mode === "SELL" ? "SELL_HOT" : mode,
        type_coin: type,
        price_coin_current: enumCoinCurrent[type][mode],
        count_coin: values.count_coin,
        total_money: values.total_money,
        ...(mode === "BUY" && { image_bill: values.image_bill }),
        ...(mode === "SELL" && {
          stk: values.stk,
          stk_name: values.stk_name,
          stk_bank: values.stk_bank,
          image_bill: isSellHot ? values.image_bill : null,
          wallet_coin: isSellHot ? enumCoinCurrent[type]["address_pay"] : null,
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
      setIsSellHot(false);
      formik.resetForm({
        count_coin: "",
        total_money: "",
        image_bill: "a",
        stk: user?.stk || "",
        stk_name: user?.stk_name || "",
        stk_bank: user?.stk_bank || "",
      });
      setOrderSuccess({
        info: data,
        message,
        visible: true,
      });
    }
  }, [isSuccess]);

  const handleChangeCoin = (value, modeValue) => {
    const coinPrice = enumCoinCurrent[type][modeValue];
    const feeOrder = payment?.fee_order || 0;
    const newTotal = value * coinPrice;
    const fee = (newTotal * feeOrder) / 100;
    const totalMoney = modeValue === "SELL" ? newTotal - fee : newTotal + fee;
    formik.setValues({
      ...formik.values,
      count_coin: value,
      total_money: totalMoney,
    });
  };

  const handleCopy = (data) => {
    navigator.clipboard
      .writeText(data)
      .then(() => {
        onAddToast({
          text: "Copy thông tin ví chủ shop thành công",
          type: "success",
          title: "",
        });
        setIsCopied(true); // Cập nhật trạng thái để thay đổi icon
        setTimeout(() => {
          setIsCopied(false); // Reset lại icon sau 2 giây
        }, 2000);
      })
      .catch((err) => {
        console.error("Error: ", err);
        onAddToast({
          text: "Copy thông tin ví chủ shop thất bại",
          type: "danger",
          title: "",
        });
      });
  };

  return (
    <>
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
            {!isSellHot && (
              <div className="text-warning text-12  text-center mt-1">
                <i>
                  Lưu ý: Số coin tối thiểu là 5.{" "}
                  {mode === "SELL" &&
                    `Số coin tối đa có thể bán là ${enumCoinCurrent[type]?.coin}`}
                </i>
              </div>
            )}
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

          <Form.Group as={Row} className="mb-3">
            <Form.Label column xs={5} className="text-end text-14">
              Phí giao dịch:
            </Form.Label>
            <Col xs={7} className="align-middle">
              <Form.Label column xs={12} className="text-14 ">
                {payment?.fee_order || 0}%
              </Form.Label>
            </Col>
          </Form.Group>

          {mode === "SELL" ? (
            <>
              <Form.Group as={Row} className="mb-3">
                <Form.Label
                  column
                  xs={5}
                  htmlFor="sell_hot"
                  className="text-end text-14"
                >
                  Bán coin trên ví
                </Form.Label>
                <Col xs={7} className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    checked={isSellHot}
                    id="sell_hot"
                    onChange={(e) => {
                      setIsSellHot(e.target.checked);
                      if (e.target.checked) {
                        formik.setFieldValue("image_bill", "");
                      } else {
                        formik.setFieldValue("image_bill", "a");
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              {isSellHot && (
                <>
                  <div className="text-center mb-1">
                    <p className="mb-0">Ví chủ shop:</p>
                    <span className="d-flex justify-content-center align-items-center gap-2">
                      <small
                        className="text-uppercase"
                        onClick={() =>
                          handleCopy(enumCoinCurrent[type]["address_pay"])
                        }
                      >
                        {enumCoinCurrent[type]["address_pay"]}
                      </small>
                      <i
                        className={`${
                          isCopied ? "fas fa-check text-success" : "far fa-copy"
                        }`}
                        onClick={() =>
                          handleCopy(enumCoinCurrent[type]["address_pay"])
                        }
                      ></i>
                    </span>
                  </div>
                  <Row>
                    <Col xs={12}>
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
                        {formik.touched.image_bill &&
                        formik.errors.image_bill ? (
                          <Form.Text className="text-danger">
                            {formik.errors.image_bill}
                          </Form.Text>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              )}
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
      <FormOrderSuccess
        data={orderSuccess}
        onClear={() => setOrderSuccess({ visible: false, info: null })}
        onAccept={() => {
          setOrderSuccess({ visible: false, info: {}, message: "" });
          navigate(ROUTES.SEARCH_TRANSACTION + "?sku=abc");
        }}
      />
    </>
  );
};

export default TransactionForm;
