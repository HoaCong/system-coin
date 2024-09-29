import CustomPagination from "components/common/CustomPagination";
import LazyLoadImage from "components/common/LazyLoadImage";
import LinearProgress from "components/common/LinearProgress";
import { STATUS_LABEL } from "constants";
import { format } from "date-fns";
import { formatCurrency } from "helper/functions";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHistoriesOrder, resetData } from "store/Coin/action";
import piImg from "../../assets/images/pi.jpg";
import sidraImg from "../../assets/images/sidra.png";

const SearchTransaction = () => {
  const {
    histories: {
      list,
      params,
      total,
      status: { isLoading, isSuccess, isFailure },
    },
  } = useSelector((state) => state.coinReducer);

  const dispatch = useDispatch();
  const onGetList = (body) => dispatch(getHistoriesOrder(body));
  const onResetData = () => dispatch(resetData());

  const [currentPage, setCurrentPage] = useState(1);
  const [tabKey, setTabKey] = useState("BUY");
  const [sku, setSearch] = useState("");

  useEffect(() => {
    if (!isLoading)
      onGetList({ ...params, limit: 10, page: 1, type: tabKey, sku });
    return () => {
      onResetData();
    };
  }, [tabKey]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetList({ ...params, page, type: tabKey });
  };

  const handleSearch = () => {
    onGetList({ ...params, limit: 10, page: 1, type: tabKey, sku });
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={5} lg={4}>
          <h4 className="text-center fw-bold">ĐƠN HÀNG CỦA TÔI</h4>
          <p className="text-center text-14">
            Nhập mã đơn hàng sku của bạn (VD: SKU202... hay SKU123...)
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
                disabled={isLoading}
              >
                {/* {isLoading && sku && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                )} */}
                TÌM KIẾM ĐƠN HÀNG
              </Button>
            </div>
          </Form>
        </Col>

        <Tabs
          id="controlled-tab"
          activeKey={tabKey}
          onSelect={(k) => setTabKey(k)}
          className="mb-3"
        >
          <Tab eventKey="BUY" title="Mua"></Tab>
          <Tab eventKey="SELL" title="Bán"></Tab>
          <Tab eventKey="SELL_HOT" title="Bán coin trên ví"></Tab>
        </Tabs>

        <div className="overflow-x-auto">
          <table
            className="table table-hover table-striped"
            style={{ minWidth: 800 }}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Loại coin</th>
                {["BUY", "SELL_HOT"].includes(tabKey) && (
                  <th scope="col">Ảnh bill</th>
                )}
                <th scope="col">Mã SKU</th>
                <th scope="col">Số lượng coin</th>
                <th scope="col">Giá coin</th>
                <th scope="col">Tổng tiền</th>
                {["BUY", "SELL_HOT"].includes(tabKey) && (
                  <th scope="col">Ví chủ shop</th>
                )}
                {["SELL", "SELL_HOT"].includes(tabKey) && (
                  <th scope="col">Thông tin</th>
                )}
                <th scope="col">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && _size(list) === 0 && (
                <tr>
                  <td colSpan={13}>
                    <div
                      className="d-flex justify-content-center align-items-center w-full"
                      style={{ height: 400 }}
                    >
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  </td>
                </tr>
              )}
              {list?.map((item, index) => (
                <tr key={item.updatedAt + index}>
                  <th scope="row" className="align-middle">
                    {index + 1}
                  </th>
                  <td className="align-middle">
                    <LazyLoadImage
                      src={item.type_coin === "PI_NETWORD" ? piImg : sidraImg}
                      alt={item.sku}
                      width={50}
                      height={50}
                      className="rounded-circle"
                    />
                  </td>
                  {["BUY", "SELL_HOT"].includes(tabKey) && (
                    <td className="align-middle">
                      <LazyLoadImage
                        src={item.image_bill}
                        alt={item.sku}
                        width={50}
                        height={50}
                      />
                    </td>
                  )}
                  <td className="align-middle">
                    <b>{item?.sku}</b>
                    <div>{format(item?.createdAt, "MM:ss dd-MM-yyyy")}</div>
                  </td>
                  <td className="align-middle">
                    {tabKey === "BUY" ? (
                      <span className="text-success"> +{item?.count_coin}</span>
                    ) : (
                      <span className="text-danger"> -{item?.count_coin}</span>
                    )}
                  </td>
                  <td className="align-middle">
                    {formatCurrency(item?.price_coin_current)}
                  </td>
                  <td className="align-middle">
                    {tabKey === "BUY" ? (
                      <span className="text-danger">
                        -{formatCurrency(item?.total_money)}
                      </span> // Add minus sign for BUY
                    ) : (
                      <span className="text-success">
                        +{formatCurrency(item?.total_money)}
                      </span>
                    )}
                  </td>
                  {["BUY", "SELL_HOT"].includes(tabKey) && (
                    <td className="align-middle">{item?.wallet_coin}</td>
                  )}
                  {["SELL", "SELL_HOT"].includes(tabKey) && (
                    <td className="align-middle">
                      <div>{item?.stk_bank}</div>
                      <div>{item?.stk}</div>
                      <div>{item?.stk_name}</div>
                    </td>
                  )}
                  <td className="align-middle">
                    <Badge
                      className="py-2 px-3"
                      pill
                      bg={STATUS_LABEL[item.status_order]?.bg}
                    >
                      {STATUS_LABEL[item.status_order]?.name}
                    </Badge>
                  </td>
                </tr>
              ))}
              {!list?.length && (isSuccess || isFailure) && (
                <tr>
                  <td colSpan={15} align="center">
                    Không tìm thấy dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {isLoading && _size(list) > 0 && (
          <div className="mb-2">
            <LinearProgress />
          </div>
        )}
        <CustomPagination
          loading={isLoading}
          totalItems={total}
          perPage={params.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </Row>
    </Container>
  );
};

export default SearchTransaction;
