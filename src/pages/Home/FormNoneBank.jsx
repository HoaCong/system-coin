import ModalBlock from "components/common/Modal";
import { ROUTES } from "constants/routerWeb";
import { Link } from "react-router-dom";

function FormNoneBank({ visible, onClose }) {
  return (
    <ModalBlock
      title="Thiếu thông tin tài khoản"
      show={visible}
      showFooter={false}
      propsModal={{
        size: "md",
      }}
      onClose={onClose}
    >
      <div className="text-center">
        <i
          className="fas fa-times-circle text-danger"
          style={{ fontSize: "90px" }}
        ></i>
        <div className="mt-3">
          Bạn chưa cập nhật thông tin tài khoản ngân hàng.
          <div>Vui lòng cập nhật thông tin trước khi tạo giao dịch</div>
        </div>
        <Link
          to={ROUTES.BANK_ACCOUNT}
          className="btn btn-secondary text-white my-3"
        >
          Đến tài khoản ngân hàng
        </Link>
      </div>
    </ModalBlock>
  );
}

export default FormNoneBank;
