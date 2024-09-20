import mbbank from "assets/images/mbbank.png";
import qr_mb from "assets/images/qr_mb.jpg";
import qr_vietin from "assets/images/qr_vietin.png";
import qr_vp from "assets/images/qr_vp.jpg";
import vietinbank from "assets/images/vietinbank.png";
import vpbank from "assets/images/vpbank.png";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "store/Toast/action";
import "../BtnSocials/index.css"; // Import CSS
const BtnBanks = () => {
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
      <Button
        variant="light"
        onClick={() =>
          onOpenPopup({ visible: "true", src: qr_vietin, alt: "vietinbank" })
        }
        className="mb-3"
      >
        <img
          src={vietinbank}
          alt="vietinbank img"
          srcset=""
          width={20}
          height={20}
          className="rounded-circle"
        />
      </Button>

      {/* Facebook Button */}
      <Button
        variant="light"
        onClick={() =>
          onOpenPopup({ visible: "true", src: qr_mb, alt: "mbbank" })
        }
        className=" mb-3"
      >
        <img
          src={mbbank}
          alt="mbbank img"
          srcset=""
          width={20}
          height={20}
          className="rounded-circle"
        />
      </Button>

      {/* Telegram Button */}
      <Button
        variant="light"
        onClick={() =>
          onOpenPopup({ visible: "true", src: qr_vp, alt: "vpbank" })
        }
        className=""
      >
        <img
          src={vpbank}
          alt="vpbank img"
          srcset=""
          width={20}
          height={20}
          className="rounded-circle"
        />
      </Button>
    </div>
  );
};

export default BtnBanks;
