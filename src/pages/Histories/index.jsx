import _size from "lodash/size";
import React from "react";
import { Badge, Spinner } from "react-bootstrap";
import "./index.scss";

const statusStyles = {
  inProgress: { color: "secondary", label: "Đang xử lý" },
  success: { color: "success", label: "Hoàn thành" },
  failed: { color: "danger", label: "Thất bại" },
};

const transactionTypes = {
  send_money: { color: "danger", label: "Chuyển tiền", operator: "- " },
  receive_money: { color: "success", label: "Nhận tiền", operator: "+ " },
};

export default function TransactionHistories() {
  // Dữ liệu giả
  const list = [
    {
      id: "MGD001",
      transactionDate: "2024-09-01",
      amount: "1.000.000 VND",
      transactionType: "send_money",
      status: "success",
      description: "Thanh toán hóa đơn #123",
    },
    {
      id: "MGD002",
      transactionDate: "2024-09-02",
      amount: "500.000 VND",
      transactionType: "receive_money",
      status: "success",
      description: "Thanh toán lương",
    },
    {
      id: "MGD003",
      transactionDate: "2024-09-03",
      amount: "2.000.000 VND",
      transactionType: "send_money",
      status: "inProgress",
      description: "Thanh toán dịch vụ",
    },
    {
      id: "MGD004",
      transactionDate: "2024-09-04",
      amount: "750.000 VND",
      transactionType: "receive_money",
      status: "success",
      description: "Hoàn tiền từ mua hàng",
    },
    {
      id: "MGD005",
      transactionDate: "2024-09-05",
      amount: "300.000 VND",
      transactionType: "send_money",
      status: "failed",
      description: "Thanh toán đăng ký",
    },
    {
      id: "MGD006",
      transactionDate: "2024-09-06",
      amount: "1.200.000 VND",
      transactionType: "receive_money",
      status: "success",
      description: "Trả nợ vay",
    },
    {
      id: "MGD007",
      transactionDate: "2024-09-07",
      amount: "1.500.000 VND",
      transactionType: "send_money",
      status: "inProgress",
      description: "Thanh toán dự án",
    },
    {
      id: "MGD008",
      transactionDate: "2024-09-08",
      amount: "600.000 VND",
      transactionType: "receive_money",
      status: "success",
      description: "Tiền thưởng",
    },
    {
      id: "MGD009",
      transactionDate: "2024-09-09",
      amount: "400.000 VND",
      transactionType: "send_money",
      status: "failed",
      description: "Thanh toán tiện ích",
    },
    {
      id: "MGD010",
      transactionDate: "2024-09-10",
      amount: "900.000 VND",
      transactionType: "receive_money",
      status: "success",
      description: "Doanh thu bán hàng",
    },
  ];

  const isLoading = false; // Thay thế bằng trạng thái loading thực tế của bạn

  return (
    <div className="table-container">
      <div className="mb-4 d-flex align-items-center">
        <h5 className="text-uppercase mb-0">
          <b>Lịch sử giao dịch</b>
        </h5>
      </div>
      <h6 className="text-uppercase">Danh sách giao dịch</h6>
      <div className="table-wrapper">
        <table className="table table-hover table-striped">
          <thead className="sticky-top">
            <tr>
              <th
                scope="col"
                className="align-middle"
                style={{ minWidth: "120px" }}
              >
                Mã giao dịch
              </th>
              <th
                scope="col"
                className="align-middle"
                style={{ minWidth: "150px" }}
              >
                Số tiền
              </th>
              <th
                scope="col"
                className="align-middle"
                style={{ minWidth: "150px" }}
              >
                Loại giao dịch
              </th>
              <th
                scope="col"
                className="align-middle"
                style={{ minWidth: "150px" }}
              >
                Trạng thái
              </th>
              <th
                scope="col"
                className="align-middle"
                style={{ minWidth: "200px" }}
              >
                Mô tả
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && _size(list) === 0 && (
              <tr>
                <td colSpan={6}>
                  <div
                    className="d-flex justify-content-center align-items-center w-100"
                    style={{ height: 400 }}
                  >
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                </td>
              </tr>
            )}
            {list.length === 0 && !isLoading && (
              <tr>
                <td colSpan={6} align="center">
                  Không tìm thấy giao dịch nào
                </td>
              </tr>
            )}
            {list.map((item, index) => (
              <tr key={item.id}>
                <td className="align-middle" style={{ minWidth: "150px" }}>
                  <b className="text-uppercase">{item.id}</b>
                  <br />
                  {item.transactionDate}
                </td>
                <td
                  className={`align-middle text-${
                    transactionTypes[item.transactionType].color
                  }`}
                  style={{ minWidth: "150px" }}
                >
                  <b>
                    {transactionTypes[item.transactionType].operator}
                    {item.amount}
                  </b>
                </td>
                <td className="align-middle" style={{ minWidth: "200px" }}>
                  <Badge
                    className="py-2 px-3"
                    pill
                    bg={transactionTypes[item.transactionType].color}
                  >
                    {transactionTypes[item.transactionType].label}
                  </Badge>
                </td>
                <td className="align-middle" style={{ minWidth: "150px" }}>
                  <Badge
                    className="py-2 px-3"
                    pill
                    bg={statusStyles[item.status].color}
                  >
                    {statusStyles[item.status].label}
                  </Badge>
                </td>
                <td className="align-middle" style={{ minWidth: "200px" }}>
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
