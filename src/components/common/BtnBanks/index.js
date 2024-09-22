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
    <div>
      <p className="text-center mb-2">QR Ngân hàng</p>
      <div className="d-flex flex-column gap-3 align-items-center mb-2">
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
          >
            <div className="d-flex gap-1 align-items-center">
              <img
                src={item.logo_bank}
                alt="icon bank"
                srcset=""
                width={20}
                height={20}
                className="rounded-circle"
              />
              <div>
                <div>{item.bank_name}</div>
                <div>{item.bank_number}</div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BtnBanks;
