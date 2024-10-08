import ModalBlock from "components/common/Modal";
import { ROUTES } from "constants/routerWeb";
import { Link } from "react-router-dom";

function FormOrderSuccess({ data: { visible, info, message }, onClose }) {
  return (
    <ModalBlock
      title="Tạo đơn hàng thành công"
      show={visible}
      showFooter={false}
      propsModal={{
        size: "md",
      }}
      onClose={onClose}
    >
      <div className="text-center">
        <i
          className="fas fa-check-circle"
          style={{ fontSize: "90px", color: "#28a745" }}
        ></i>
        <div className="mt-3">
          <b className="fs-5 text">{info.sku}</b>
          <p>{message}</p>
        </div>
        <Link
          to={
            ROUTES.SEARCH_TRANSACTION +
            `?sku=${info.sku}&tabKey=${info.type_order}`
          }
          className="btn btn-success text-white my-3"
        >
          Xem đơn hàng
        </Link>
      </div>
    </ModalBlock>
  );
}

export default FormOrderSuccess;
