import React from "react";
import { Link } from "react-router-dom";

function HoldPi() {
  return (
    <p className="fs-5 text">
      Vui lòng liên hệ shop qua{" "}
      <Link className="text-primary" to="https://zalo.me/0332986587">
        zalo
      </Link>{" "}
      hoặc{" "}
      <Link
        className="text-primary"
        to="https://www.facebook.com/profile.php?id=100079449032579"
      >
        facebook
      </Link>{" "}
      hoặc{" "}
      <Link className="text-primary" to="https://t.me/+84332986587">
        telegram
      </Link>{" "}
      để biết thêm chi tiết!!!
    </p>
  );
}

export default HoldPi;
