import { useEffect, useState } from "react";

function useBodyScrollCheck() {
  const [isBodyScrollable, setIsBodyScrollable] = useState(false);

  const checkBodyScroll = () => {
    const isScrollable = document.body.scrollHeight > window.innerHeight;
    setIsBodyScrollable(isScrollable);
  };

  useEffect(() => {
    // Kiểm tra ngay khi hook được gọi
    checkBodyScroll();

    // Thêm event listener để kiểm tra khi resize cửa sổ
    window.addEventListener("resize", checkBodyScroll);

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener("resize", checkBodyScroll);
    };
  }, []);

  return isBodyScrollable;
}

export default useBodyScrollCheck;
