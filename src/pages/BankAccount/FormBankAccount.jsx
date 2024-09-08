/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import { useFormik } from "formik";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd } from "store/BankAccount/action";
import * as Yup from "yup";
function FormBankAccount({ user, data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.bankAccountReducer);

  const dispatch = useDispatch();
  const onAdd = (body) => dispatch(actionAdd(body));
  // const onEdit = (body) => dispatch(actionEdit(body));

  const formik = useFormik({
    initialValues: {
      name_bank: "",
      stk: "",
      full_name: "",
    },
    validationSchema: Yup.object({
      name_bank: Yup.string().required("Vui lòng nhập tên ngân hàng"),
      stk: Yup.string()
        .required("Vui lòng nhập số tài khoản")
        .max(16, "Số tài khoản tối đa 16 chữ số"),
      full_name: Yup.string().required("Vui lòng nhập họ tên chủ sở hữu"),
    }),
    onSubmit: (values) => {
      onAdd({
        customer_id: user?.id,
        name_bank: values.name_bank,
        stk: values.stk,
        full_name: values.full_name,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      onClear();
      formik.resetForm({
        values: {
          name_bank: "",
          stk: "",
          full_name: "",
        },
      });
    }
  }, [isSuccess]);

  const handleClose = () => {
    onClear();
    formik.resetForm({
      values: {
        name_bank: "",
        stk: "",
        full_name: "",
      },
    });
  };

  const getTitle = {
    detail: "Thông tin tài khoản ngân hàng",
    edit: "Chỉnh sửa tài khoản ngân hàng",
    create: "Thêm mới tài khoản ngân hàng",
  };
  return (
    <ModalBlock
      title={getTitle[type]}
      show={visible}
      onClose={handleClose}
      onSave={formik.handleSubmit}
      loading={isLoading}
    >
      <Form>
        <div>
          <Form.Group>
            <Form.Label htmlFor="name">
              Tên ngân hàng <span className="required">*</span>
            </Form.Label>
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
          </Form.Group>
        </div>
        <div className="mt-3">
          <Form.Group>
            <Form.Label htmlFor="stk">
              Số tài khoản <span className="required">*</span>
            </Form.Label>
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
          </Form.Group>
        </div>
        <div className="mt-3">
          <Form.Group>
            <Form.Label htmlFor="full_name">
              Tên chủ sở hữu <span className="required">*</span>
            </Form.Label>
            <Form.Control
              id="full_name"
              name="full_name"
              placeholder="Chủ sở hữu"
              aria-describedby="helperfull_name"
              onChange={formik.handleChange}
              isInvalid={formik.touched.full_name && formik.errors.full_name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.full_name}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      </Form>
    </ModalBlock>
  );
}

export default FormBankAccount;
