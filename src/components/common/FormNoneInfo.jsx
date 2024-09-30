import ModalBlock from "components/common/Modal";
import { Link } from "react-router-dom";

function FormNoneInfo({
  visible,
  icon,
  onClose,
  title,
  content,
  url,
  textLink,
}) {
  return (
    <ModalBlock
      title={title}
      show={visible}
      showFooter={false}
      propsModal={{
        size: "md",
      }}
      onClose={onClose}
    >
      <div className="text-center">
        {!!icon ? (
          icon
        ) : (
          <i
            className="fas fa-times-circle text-danger"
            style={{ fontSize: "90px" }}
          ></i>
        )}
        {content}

        {!!url && (
          <Link to={url} className="btn btn-secondary text-white my-3">
            {textLink}
          </Link>
        )}
      </div>
    </ModalBlock>
  );
}

export default FormNoneInfo;
