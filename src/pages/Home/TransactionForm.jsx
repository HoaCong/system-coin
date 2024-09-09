import { Button, Col, Form, Row } from "react-bootstrap";

const TransactionForm = () => {
  return (
    <div className="card px-3">
      <div className="text-center my-2">
        <strong>MUA BÁN π TẠI TIỆM</strong>
      </div>
      <div className="mb-3 d-flex">
        <Button variant="outline-warning w-100">Bạn bán π</Button>
        <Button variant="warning w-100">Bạn mua π</Button>
      </div>

      <Form>
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
            <span className="text-danger">*</span> Số π muốn bán:
          </Form.Label>
          <Col xs={7}>
            <Form.Control type="number" placeholder="π" />
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
            <span className="text-danger">*</span> Địa chỉ ví π:
          </Form.Label>
          <Col xs={7}>
            <Form.Control type="text" placeholder="Địa chỉ ví" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col xs={12} className="text-center">
            <Button variant="warning">Tạo đơn hàng Bán π</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default TransactionForm;
