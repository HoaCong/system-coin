import zalo from "assets/images/Icon_zalo.svg";
import React from "react";
import { Button } from "react-bootstrap";
import "./index.css"; // Import CSS
const BtnSocials = () => {
  return (
    <div className="social-buttons">
      {/* Zalo Button */}
      <Button
        variant="light"
        className="pulse-button mb-3"
        href="https://zalo.me/0332986587"
        target="_blank"
      >
        <img src={zalo} alt="zalo img" width={20} height={20} />
      </Button>

      {/* Facebook Button */}
      <Button
        variant="light"
        className="pulse-button mb-3"
        href="https://www.facebook.com/profile.php?id=100079449032579"
        target="_blank"
      >
        <i
          className="fab fa-facebook-f"
          style={{ color: "#4267B2", fontSize: "24px" }}
        ></i>
      </Button>

      {/* Telegram Button */}
      <Button
        variant="light"
        className="pulse-button"
        href="https://t.me/+84332986587"
        target="_blank"
      >
        <i
          className="fab fa-telegram-plane"
          style={{ color: "#0088cc", fontSize: "24px" }}
        ></i>
      </Button>
    </div>
  );
};

export default BtnSocials;
