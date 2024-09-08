/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button, Overlay, Spinner, Tooltip } from "react-bootstrap";
import useBodyScrollCheck from "./useBodyScrollCheck";

function CustomTooltip({
  content,
  tooltip,
  loading,
  onClose,
  onDelete,
  showAction = true,
  propsTooltip,
}) {
  const isCcrollBody = useBodyScrollCheck();

  useEffect(() => {
    if (tooltip.visible && !isCcrollBody) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 500);
    }
  }, [tooltip]);

  return (
    <>
      <Overlay target={tooltip.target} show={tooltip.visible} placement="top">
        {(props) => (
          <Tooltip id="tooltip" {...props} {...propsTooltip}>
            <div style={{ zIndex: 2 }}>
              {content}
              {showAction && (
                <div className="d-flex justify-content-end gap-2 py-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Hủy
                  </Button>
                  <Button size="sm" onClick={onDelete} disabled={loading}>
                    {loading && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    Đồng ý
                  </Button>
                </div>
              )}
            </div>
          </Tooltip>
        )}
      </Overlay>
      {tooltip.visible && (
        <div
          className="position-fixed w-100 h-100 top-0 left-0"
          onClick={onClose}
        ></div>
      )}
    </>
  );
}

export default CustomTooltip;
