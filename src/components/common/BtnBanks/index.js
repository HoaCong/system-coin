import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToast, openPopup } from "store/Toast/action";
import "../BtnSocials/index.css"; // Import CSS
const BtnBanks = ({ payment }) => {
  const { popup } = useSelector((state) => state.toastReducer);
  const dispatch = useDispatch();
  const onOpenPopup = (payload) => dispatch(openPopup(payload));
  const onAddToast = (data) => dispatch(addToast(data));

  const [isCopied, setIsCopied] = useState("");

  useEffect(() => {
    return () => {
      if (popup?.visible) onOpenPopup({});
    };
  }, []);

  const handleCopy = (data, index) => {
    navigator.clipboard
      .writeText(data)
      .then(() => {
        onAddToast({
          text: "Copy số tài khoản thành công",
          type: "success",
          title: "",
        });
        setIsCopied(index); // Cập nhật trạng thái để thay đổi icon
        setTimeout(() => {
          setIsCopied(""); // Reset lại icon sau 2 giây
        }, 2000);
      })
      .catch((err) => {
        console.error("Error: ", err);
        onAddToast({
          text: "Copy số tài khoản thất bại",
          type: "danger",
          title: "",
        });
      });
  };

  return (
    <div>
      <p className="text-center mb-2">QR Ngân hàng</p>
      <div className="d-flex flex-column gap-3 align-items-center mb-2">
        {/* Zalo Button */}
        {(payment?.payments || []).map((item, index) => (
          <Button
            className="w-100"
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
                width={20}
                height={20}
                className="rounded-circle"
              />
              <div className="flex-grow-1">
                <div>{item.bank_name}</div>
                <div>{item.bank_owner}</div>
                <div>
                  {item.bank_number}{" "}
                  <i
                    className={`${
                      isCopied === index
                        ? "fas fa-check text-success"
                        : "far fa-copy"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(item.bank_number, index);
                    }}
                  ></i>
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BtnBanks;
