import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const TransactionForm = () => {
  const [tab, setTab] = useState(1);

  const handleChangeTab = (idx) => {
    setTab(idx);
  };

  const [mode, setMode] = useState(1);

  const handleChangeMode = (idx) => {
    setMode(idx);
  };
  return (
    <div className="card">
      <div className="d-flex">
        <div
          className={`p-2 text-center w-100 cursor-pointer fw-bold ${
            tab === 1 ? "bg-warning text-white" : "bg-light text-warning"
          }`}
          onClick={() => handleChangeTab(1)}
        >
          π PICOIN
        </div>
        <div
          className={`p-2 text-center w-100 cursor-pointer fw-bold ${
            tab === 2 ? "bg-warning text-white" : "bg-light text-warning"
          }`}
          onClick={() => handleChangeTab(2)}
        >
          $ SIDRACOIN
        </div>
      </div>
      <div className="text-center my-2">
        <strong>MUA BÁN {tab === 1 ? "π" : "$"} TẠI TIỆM</strong>
      </div>
      <div className="mb-3 d-flex">
        <div
          className={`p-2 text-center w-100 cursor-pointer ${
            mode === 1 ? "bg-warning text-white" : "bg-light text-warning"
          }`}
          onClick={() => handleChangeMode(1)}
        >
          Bạn bán {tab === 1 ? "π" : "$"}
        </div>
        <div
          className={`p-2 text-center w-100 cursor-pointer ${
            mode === 2 ? "bg-warning text-white" : "bg-light text-warning"
          }`}
          onClick={() => handleChangeMode(2)}
        >
          Bạn mua {tab === 1 ? "π" : "$"}
        </div>
      </div>

      <Form className="px-3">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column xs={5} className="text-end text-14">
            Chúng tôi còn:
          </Form.Label>
          <Col xs={7}>
            <Form.Control
              className="text-danger fw-bold"
              plaintext
              readOnly
              defaultValue="14 852 400 000 ₫"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column xs={5} className="text-end text-14">
            <span className="text-danger">*</span> Số {tab === 1 ? "π" : "$"}{" "}
            muốn bán:
          </Form.Label>
          <Col xs={7}>
            <Form.Control type="number" placeholder={tab === 1 ? "π" : "$"} />
            <Form.Text muted>(Min 50 - Max 20000)</Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column xs={5} className="text-end text-14">
            Bạn nhận:
          </Form.Label>
          <Col xs={7}>
            <Form.Control type="text" readOnly placeholder="₫" />
          </Col>
        </Form.Group>

        <div className="text-center mb-1">
          <small>KIỂM TRA KỸ THÔNG TIN CỦA BẠN TRƯỚC KHI TẠO ĐƠN</small>
        </div>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column xs={5} className="text-end text-14">
            <span className="text-danger">*</span> Ngân hàng:
          </Form.Label>
          <Col xs={7}>
            <Form.Control type="text" placeholder="Ngân hàng" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column xs={5} className="text-end text-14">
            <span className="text-danger">*</span> Số tài khoản:
          </Form.Label>
          <Col xs={7}>
            <Form.Control type="text" placeholder="Số tài khoản" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column xs={5} className="text-end text-14">
            <span className="text-danger">*</span> Chủ tài khoản:
          </Form.Label>
          <Col xs={7}>
            <Form.Control type="text" placeholder="Chủ tài khoản" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column xs={5} className="text-end text-14">
            <span className="text-danger">*</span> Địa chỉ ví{" "}
            {tab === 1 ? "π" : "$"}:
          </Form.Label>
          <Col xs={7}>
            <Form.Control type="text" placeholder="Địa chỉ ví" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col xs={12} className="text-center">
            <Button variant="warning" className="text-white">
              Tạo đơn hàng {mode === 1 ? "Bán" : "Mua"} {tab === 1 ? "π" : "$"}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default TransactionForm;
