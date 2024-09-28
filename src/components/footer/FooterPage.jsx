import React from "react";

const FooterPage = () => {
  return (
    <section className="text-secondary bg-dark">
      <div className="text-center py-4">
        <h3>LIÊN HỆ VỚI CHÚNG TÔI</h3>

        <div className="mt-4">
          <span
            className="text-center d-inline-block"
            style={{ width: "24px" }}
          >
            <i className="fas fa-map-marker-alt"></i>
          </span>
          Address: 99 BlueStar - Galaxy - Mitsubixy
        </div>

        <div className="mt-2">
          <span
            className="text-center d-inline-block"
            style={{ width: "24px" }}
          >
            <i className="fas fa-phone"></i>
          </span>
          Phone: 0332.986.587
        </div>

        <div className="mt-2">
          <span
            className="text-center d-inline-block"
            style={{ width: "24px" }}
          >
            <i className="fab fa-telegram-plane"></i>
          </span>
          Telegram: <a href="https://t.me/+84332986587">t.me/+84332986587</a>
        </div>

        <div className="mt-2">
          <span
            className="text-center d-inline-block"
            style={{ width: "24px" }}
          >
            <i className="fab fa-facebook"></i>
          </span>
          Facebook:{" "}
          <a href="https://www.facebook.com/profile.php?id=100079449032579">
            www.facebook.com/profile.php?id=100079449032579
          </a>
        </div>

        <div className="mt-2">
          <span
            className="text-center d-inline-block"
            style={{ width: "24px" }}
          >
            <i className="fas fa-comments"></i>
          </span>
          Zalo: <a href="https://zalo.me/0332986587">zalo.me/0332986587</a>
        </div>
      </div>
    </section>
  );
};

export default FooterPage;
