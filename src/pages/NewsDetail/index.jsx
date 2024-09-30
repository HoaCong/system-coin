import ImgCover from "components/common/ImgCover";
import { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actionGetDetail, resetData } from "store/News/action";

const NewsDetail = () => {
  const {
    detailStatus: { isLoading, isSuccess, isFailure },
    detail,
  } = useSelector((state) => state.newsReducer);

  const { id } = useParams();

  const dispatch = useDispatch();
  const onGetDetail = (body) => dispatch(actionGetDetail(body));
  const onResetData = () => dispatch(resetData());

  useEffect(() => {
    if (!isLoading) onGetDetail(id);
    return () => {
      onResetData();
    };
  }, []);

  return (
    <Container>
      <h5 className="mb-4">
        <b>TIN TỨC CHI TIẾT</b>
      </h5>
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
      {detail?.id && (
        <div>
          <ImgCover image={detail.image} ratio="169" />
          <div className="fw-bold my-2">{detail.title}</div>
          <div>
            <span className="text-14"> {detail.content}</span>
          </div>
        </div>
      )}
      {!detail?.id && (isSuccess || isFailure) && (
        <div className="text-center"> Không tìm thấy dữ liệu</div>
      )}
    </Container>
  );
};

export default NewsDetail;
