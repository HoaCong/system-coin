import CustomPagination from "components/common/CustomPagination";
import LazyLoadImage from "components/common/LazyLoadImage";
import LinearProgress from "components/common/LinearProgress";
import { STATUS_LABEL } from "constants";
import { format } from "date-fns";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Badge, Spinner } from "react-bootstrap"; // Import Tabs and Tab from react-bootstrap
import { useDispatch, useSelector } from "react-redux";
import { getHistoriesWithDraw, resetData } from "store/Coin/action";
import piImg from "../../assets/images/pi.jpg";
import sidraImg from "../../assets/images/sidra.png";
function HistoriesWithDraw(props) {
  const {
    withdraw: {
      list,
      params,
      total,
      status: { isLoading, isSuccess, isFailure },
    },
  } = useSelector((state) => state.coinReducer);

  const dispatch = useDispatch();
  const onGetList = (body) => dispatch(getHistoriesWithDraw(body));
  const onResetData = () => dispatch(resetData());

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (!isLoading) onGetList({ ...params, limit: 10, page: 1 }); // Include the selected tab type in the query
    return () => {
      onResetData();
    };
  }, []); // Fetch data when tab changes

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetList({ ...params, page });
  };

  return (
    <div>
      <h5 className="mb-4">
        <b>LỊCH SỬ RÚT COIN</b>
      </h5>
      <div className="overflow-x-auto">
        <table
          className="table table-hover table-striped"
          style={{ minWidth: 800 }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Loại coin</th>
              <th scope="col">Đơn rút</th>
              <th scope="col">Số lượng coin</th>
              <th scope="col">Ví coin</th>
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
                <td className="align-middle">
                  <b>{item?.sku}</b>
                  <div>{format(item?.createdAt, "MM:ss dd-MM-yyyy")}</div>
                </td>
                <td className="align-middle">{item?.count_coin}</td>
                <td className="align-middle">{item?.wallet_coin}</td>
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

export default HistoriesWithDraw;
