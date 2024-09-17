import CustomPagination from "components/common/CustomPagination";
import LazyLoadImage from "components/common/LazyLoadImage";
import LinearProgress from "components/common/LinearProgress";
import TemplateContent from "components/layout/TemplateContent";
import { STATUS_LABEL } from "constants";
import { format } from "date-fns";
import { formatCurrency } from "helper/functions";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Badge, Spinner, Tab, Tabs } from "react-bootstrap"; // Import Tabs and Tab from react-bootstrap
import { useDispatch, useSelector } from "react-redux";
import { getHistoriesOrder, resetData } from "store/Coin/action";
import piImg from "../../assets/images/pi.jpg";
import sidraImg from "../../assets/images/sidra.png";
function Histories(props) {
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
  const [tabKey, setTabKey] = useState("BUY"); // State for the active tab
  useEffect(() => {
    if (!isLoading) onGetList({ ...params, limit: 10, page: 1, type: tabKey }); // Include the selected tab type in the query
    return () => {
      onResetData();
    };
  }, [tabKey]); // Fetch data when tab changes

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetList({ ...params, page, type: tabKey });
  };

  return (
    <div>
      <h5 className="mb-4">
        <b>LỊCH SỬ GIAO DỊCH</b>
      </h5>
      <Tabs
        id="controlled-tab"
        activeKey={tabKey}
        onSelect={(k) => setTabKey(k)}
        className="mb-3"
      >
        <Tab eventKey="BUY" title="Mua"></Tab>
        <Tab eventKey="SELL" title="Bán"></Tab>
      </Tabs>

      <div className="overflow-x-auto">
        <table
          className="table table-hover table-striped"
          style={{ maxWidth: 800 }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Loại coin</th>
              {tabKey === "BUY" && <th scope="col">Ảnh bill</th>}
              <th scope="col">Mã SKU</th>
              <th scope="col">Số lượng coin</th>
              <th scope="col">Giá coin</th>
              <th scope="col">Tổng tiền</th>
              {tabKey === "BUY" ? (
                <th scope="col">Ví thanh toán</th>
              ) : (
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
                    src={item.type_coint === "PI_NETWORD" ? piImg : sidraImg}
                    alt={item.sku}
                    width={50}
                    height={50}
                  />
                </td>
                {tabKey === "BUY" && (
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
                    <span className="text-danger"> -{item?.count_coin}</span>
                  ) : (
                    <span className="text-success"> +{item?.count_coin}</span>
                  )}
                </td>
                <td className="align-middle">
                  {formatCurrency(item?.price_coin_current)}
                </td>
                <td className="align-middle">
                  {tabKey === "BUY" ? (
                    <span className="text-success">
                      +{formatCurrency(item?.total_money)}
                    </span> // Add minus sign for BUY
                  ) : (
                    <span className="text-danger">
                      -{formatCurrency(item?.total_money)}
                    </span>
                  )}
                </td>
                {tabKey === "BUY" ? (
                  <td className="align-middle">{item?.wallet_coin}</td>
                ) : (
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
    </div>
  );
}

export default Histories;
