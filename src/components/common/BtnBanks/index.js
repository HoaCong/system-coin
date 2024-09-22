import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "store/Toast/action";
import "../BtnSocials/index.css"; // Import CSS
const BtnBanks = ({ payment }) => {
  const { popup } = useSelector((state) => state.toastReducer);
  const dispatch = useDispatch();
  const onOpenPopup = (payload) => dispatch(openPopup(payload));

  useEffect(() => {
    return () => {
      if (popup?.visible) onOpenPopup({});
    };
  }, []);

  return (
    <div className="d-flex flex-column gap-2 align-items-center">
      <span>QR Ngân hàng</span>
      {/* Zalo Button */}
      {(payment?.payments || []).map((item, index) => (
        <Button
          key={index}
          variant="light"
          onClick={() =>
            onOpenPopup({
              visible: "true",
              src: item.qrcode,
              alt: item.name || "qr bank",
            })
          }
          className="mb-3"
        >
          <img
            src={item.logo_bank}
            alt="icon bank"
            srcset=""
            width={20}
            height={20}
            className="rounded-circle"
          />
        </Button>
      ))}
    </div>
  );
};

export default BtnBanks;
