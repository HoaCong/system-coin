import LazyLoadImage from "components/common/LazyLoadImage";
import { STATUS_LABEL } from "constants";
import { format } from "date-fns";
import { formatCurrency } from "helper/functions";
import { useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDetailOrder } from "store/Coin/action";
import piImg from "../../assets/images/pi.jpg";
import sidraImg from "../../assets/images/sidra.png";
const SearchTransaction = () => {
  const {
    detailOrder: {
      data,
      status: { isLoading, isSuccess, isFailure },
    },
  } = useSelector((state) => state.coinReducer);
  const dispatch = useDispatch();
  const onGetDetailOrder = (params) => dispatch(getDetailOrder(params));

  const [sku, setSearch] = useState("");

  const handleSearch = () => {
    onGetDetailOrder({ sku });
  };
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={5} lg={4}>
          <h4 className="text-center fw-bold">TRA CỨU GIAO DỊCH</h4>
          <p className="text-center text-14">
            Nhập mã đơn hàng hay mã tin P2P của bạn (VD: dh7777 hay t2222)
          </p>
          <Form>
            <Form.Group controlId="transactionCode">
              <InputGroup>
                <Form.Control
                  value={sku}
                  onChange={(e) => setSearch(e.target.value)}
                  className="shadow-none"
                  placeholder="Mã giao dịch"
                />
                <InputGroup.Text>
                  <i className="fas fa-search text-secondary"></i>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <div className="d-grid gap-2 mt-4">
              <Button
                variant="success"
                size="lg"
                className="text-14 fw-bold"
                onClick={handleSearch}
              >
                TRA CỨU GIAO DỊCH
              </Button>
            </div>
          </Form>
        </Col>

        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center w-full"
            style={{ height: 400 }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {isFailure && <div className="text-center">Không tìm thấy dữ liệu</div>}
        {isSuccess && (
          <Col xs={12} className="mt-5">
            <div className="overflow-x-auto">
              <table
                className="table table-hover table-striped"
                style={{ minWidth: 800 }}
              >
                <thead>
                  <tr>
                    <th scope="col">Loại coin</th>
                    {["BUY", "SELL_HOT"].includes(data.type_order) && (
                      <th scope="col">Ảnh bill</th>
                    )}
                    <th scope="col">Mã SKU</th>
                    <th scope="col">Số lượng coin</th>
                    <th scope="col">Giá coin</th>
                    <th scope="col">Tổng tiền</th>
                    {["BUY", "SELL_HOT"].includes(data.type_order) && (
                      <th scope="col">Ví chủ shop</th>
                    )}
                    {["SELL", "SELL_HOT"].includes(data.type_order) && (
                      <th scope="col">Thông tin</th>
                    )}
                    <th scope="col">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="align-middle">
                      <LazyLoadImage
                        src={data.type_coin === "PI_NETWORD" ? piImg : sidraImg}
                        alt={data.sku}
                        width={50}
                        height={50}
                        className="rounded-circle"
                      />
                    </td>
                    {["BUY", "SELL_HOT"].includes(data.type_order) && (
                      <td className="align-middle">
                        <LazyLoadImage
                          src={data.image_bill}
                          alt={data.sku}
                          width={50}
                          height={50}
                        />
                      </td>
                    )}
                    <td className="align-middle">
                      <b>{data?.sku}</b>
                      <div>{format(data?.createdAt, "MM:ss dd-MM-yyyy")}</div>
                    </td>
                    <td className="align-middle">
                      {data.type_order === "BUY" ? (
                        <span className="text-success">
                          +{data?.count_coin}
                        </span>
                      ) : (
                        <span className="text-danger">-{data?.count_coin}</span>
                      )}
                    </td>
                    <td className="align-middle">
                      {formatCurrency(data?.price_coin_current)}
                    </td>
                    <td className="align-middle">
                      {data.type_order === "BUY" ? (
                        <span className="text-danger">
                          -{formatCurrency(data?.total_money)}
                        </span> // Add minus sign for BUY
                      ) : (
                        <span className="text-success">
                          +{formatCurrency(data?.total_money)}
                        </span>
                      )}
                    </td>
                    {["BUY", "SELL_HOT"].includes(data.type_order) && (
                      <td className="align-middle">{data?.wallet_coin}</td>
                    )}
                    {["SELL", "SELL_HOT"].includes(data.type_order) && (
                      <td className="align-middle">
                        <div>{data?.stk_bank}</div>
                        <div>{data?.stk}</div>
                        <div>{data?.stk_name}</div>
                      </td>
                    )}
                    <td className="align-middle">
                      <Badge
                        className="py-2 px-3"
                        pill
                        bg={STATUS_LABEL[data.status_order]?.bg}
                      >
                        {STATUS_LABEL[data.status_order]?.name}
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default SearchTransaction;
