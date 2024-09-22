import React, { useEffect } from "react";
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

  const ListBankQR = [
    {
      icon: payment?.icon_banking1,
      qr: payment?.banking1,
    },
    {
      icon: payment?.icon_banking2,
      qr: payment?.banking2,
    },
    {
      icon: payment?.icon_momo,
      qr: payment?.momo_pay,
    },
  ];

  return (
    <div className="d-flex flex-column gap-2 align-items-center">
      <span>QR Ngân hàng</span>
      {/* Zalo Button */}
      {ListBankQR.map((item, index) => (
        <Button
          key={index}
          variant="light"
          onClick={() =>
            onOpenPopup({
              visible: "true",
              src: item.qr,
              alt: item.qr || "qr bank",
            })
          }
          className="mb-3"
        >
          <img
            src={item.icon}
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
