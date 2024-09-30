import { useFormik } from "formik";
import _omit from "lodash/omit";
import { useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actionAdd } from "store/Customer/action";
import * as Yup from "yup";
import BackgroundImage from "../../assets/images/bg.jpg";
import Logo from "../../assets/images/logo.jpg";
import "../Login/index.scss";
const Register = () => {
  // state local
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.customerReducer);

  const dispatch = useDispatch();
  const onRegister = (body) => dispatch(actionAdd(body));

  const formik = useFormik({
    initialValues: {
      email: "",
      full_name: "",
      phone: "",
      ref_email: "",
      password: "",
      re_password: "",
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required("Vui lòng nhập tên"),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Email không hợp lệ"
        )
        .required("Vui lòng nhập email"),
      phone: Yup.string()
        .matches(/^(0|84)([0-9]{9,10})$/, "Số điện thoại chưa hợp lệ")
        .required("Vui lòng nhập số điện thoại"),
      password: Yup.string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/,
          "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt"
        )
        .required("Vui lòng nhập mật khẩu"),
      re_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu nhập lại không khớp")
        .required("Vui lòng nhập lại mật khẩu"),
    }),
    onSubmit: (values) => {
      onRegister(_omit(values, "re_password"));
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm({
        values: {
          email: "",
          full_name: "",
          phone: "",
          ref_email: "",
          password: "",
          re_password: "",
        },
      });
    }
  }, [isSuccess]);

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Header */}
      <img
        className="mx-auto d-block mb-2 rounded-circle"
        src={Logo}
        width={70}
        height="auto"
        alt="logo"
      />
      {/* Form */}
      <Form
        className="shadow rounded text-white"
        onSubmit={formik.handleSubmit}
      >
        {/* ALert */}
        {/* { && (
          <Alert variant="danger" onClose={() => setNoti("")} dismissible>
            <span>{noti}</span>
          </Alert>
        )} */}

        <Form.Group className="mb-2" controlId="full_name">
          <Form.Label>Họ tên</Form.Label>
          <InputGroup>
            <Form.Control
              className="shadow-none"
              name="full_name"
              placeholder="Họ tên"
              value={formik.values.full_name}
              onChange={formik.handleChange}
            />
            <InputGroup.Text>
              <i className="fas fa-user text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        {formik.touched.password && !!formik.errors.full_name && (
          <small className="d-block text-danger -mt-1 mb-2">
            {formik.errors.full_name}
          </small>
        )}

        <small className="d-block text-warning text-12">
          <i>
            Vui lòng nhập đúng email của bạn để kích hoạt tài khoản giao dịch
          </i>
        </small>

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email đăng nhập</Form.Label>
          <InputGroup>
            <Form.Control
              className="shadow-none"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <InputGroup.Text>
              <i className="fas fa-envelope text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        {formik.touched.password && !!formik.errors.email && (
          <small className="d-block text-danger -mt-1 mb-2">
            {formik.errors.email}
          </small>
        )}

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <InputGroup>
            <Form.Control
              className="shadow-none"
              name="password"
              placeholder="Mật khẩu"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <InputGroup.Text>
              <i className="fas fa-lock text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        {formik.touched.password && !!formik.errors.password && (
          <small className="d-block text-danger -mt-1 mb-2">
            {formik.errors.password}
          </small>
        )}

        <Form.Group className="mb-2" controlId="re_password">
          <Form.Label>Nhập lại mật khẩu</Form.Label>
          <InputGroup>
            <Form.Control
              className="shadow-none"
              name="re_password"
              placeholder="Nhập lại mật khẩu"
              type="password"
              value={formik.values.re_password}
              onChange={formik.handleChange}
            />
            <InputGroup.Text>
              <i className="fas fa-lock text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        {formik.touched.password && !!formik.errors.re_password && (
          <small className="d-block text-danger -mt-1 mb-2">
            {formik.errors.re_password}
          </small>
        )}

        <Form.Group className="mb-2" controlId="phone">
          <Form.Label>Điện thoại (EX: +84 909397989)</Form.Label>

          <InputGroup>
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
            <InputGroup.Text>
              <i className="fas fa-phone-alt text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        {formik.touched.password && !!formik.errors.phone && (
          <small className="d-block text-danger -mt-1 mb-2">
            {formik.errors.phone}
          </small>
        )}

        <Form.Group className="mb-2" controlId="ref_email">
          <Form.Label>Email người giới thiệu</Form.Label>
          <InputGroup>
            <Form.Control
              className="shadow-none"
              name="ref_email"
              placeholder="Bạn có thể để trống"
              value={formik.values.ref_email}
              onChange={formik.handleChange}
            />
            <InputGroup.Text>
              <i className="fas fa-envelope text-secondary"></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Button
          disabled={isLoading}
          className="w-100 btn-fill mt-4 d-flex justify-content-center align-items-center"
          variant="primary"
          type="submit"
        >
          {isLoading && (
            <div
              className="spinner-border text-white me-2"
              role="status"
              style={{ width: 16, height: 16 }}
            ></div>
          )}
          Đăng ký
        </Button>

        <div className="mt-3">
          <Link to="/login">Đăng nhập</Link>
        </div>
      </Form>
      <Link to="/" className="text-white cursor-pointer">
        <small> [ Quay lại trang chủ ]</small>
      </Link>
    </div>
  );
};

export default Register;
