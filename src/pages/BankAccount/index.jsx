import ActionTable from "components/common/ActionTable";
import CustomTooltip from "components/common/CustomTooltip";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  actionDelete,
  actionGetList,
  resetData,
} from "store/BankAccount/action";
import FormBankAccount from "./FormBankAccount";

export default function BankAccount() {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  const {
    listStatus: { isLoading, isSuccess, isFailure },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
  } = useSelector((state) => state.bankAccountReducer);

  const dispatch = useDispatch();
  const onGetList = (body) => dispatch(actionGetList(body));
  const onDelete = (body) => dispatch(actionDelete(body));
  const onResetData = () => dispatch(resetData());

  const [detail, setDetail] = useState({
    topic: {},
    visible: false,
    type: "",
  });
  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    id: null,
  });

  useEffect(() => {
    if (!isLoading) onGetList(user?.id);
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      id: null,
    });
  };
  return (
    <div>
      <div className="mb-4 d-flex align-items-center">
        <h5 className="text-uppercase mb-0">
          <b>Tài khoản ngân hàng</b>
        </h5>
        <Button
          type="submit"
          className="text-white ms-auto"
          onClick={() =>
            setDetail((prev) => ({ ...prev, visible: true, type: "create" }))
          }
        >
          <small>
            <b className="text-uppercase">Thêm tài khoản</b>
          </small>
        </Button>
      </div>
      <h6 className="text-uppercase">Danh sách tài khoản</h6>
      <table className="table table-hover table-striped">
        <thead className="sticky-top">
          <tr>
            <th scope="col" className="align-middle">
              #
            </th>
            <th scope="col" className="align-middle">
              Tên ngân hàng
            </th>
            <th scope="col" className="align-middle">
              Số tài khoản
            </th>
            <th scope="col" className="align-middle">
              Chủ sở hữu
            </th>
            <th scope="col" className="align-middle">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && _size(list) === 0 && (
            <tr>
              <td colSpan={10}>
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
          {list.map((item, index) => (
            <tr key={item.updatedAt + index}>
              <th scope="row" className="align-middle">
                {index + 1}
              </th>
              <td className="align-middle">{item.name_bank}</td>
              <td className="align-middle">{item.stk}</td>
              <td className="align-middle">{item.full_name}</td>
              <td className="align-middle">
                <ActionTable
                  // onDetail={() =>
                  //   setDetail({ info: item, visible: true, type: "detail" })
                  // }
                  // onEdit={(e) =>
                  //   setDetail({
                  //     info: item,
                  //     visible: true,
                  //     type: "edit",
                  //   })
                  // }
                  onDelete={(e) =>
                    setTooltip((prev) => {
                      return {
                        visible:
                          prev.target === e.target ? !tooltip.visible : true,
                        target: e.target,
                        id: item.id,
                        type: "delete",
                      };
                    })
                  }
                />
              </td>
            </tr>
          ))}
          {!list?.length && (isSuccess || isFailure) && (
            <tr>
              <td colSpan={8} align="center">
                Không tìm thấy tài khoản ngân hàng nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <FormBankAccount
        user={user}
        data={detail}
        onClear={() => setDetail({ info: {}, visible: false, type: "" })}
      />
      <CustomTooltip
        content="Bạn có chắc muốn tài khoản ngân hàng này không?"
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={() => onDelete(tooltip.id)}
      />
    </div>
  );
}
