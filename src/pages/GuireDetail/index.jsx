import ImgCover from "components/common/ImgCover";
import VideoPlayer from "components/common/VideoPlayer";
import { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actionGetDetail, resetData } from "store/Guire/action";

const GuireDetail = () => {
  const {
    detailStatus: { isLoading, isSuccess, isFailure },
    detail,
  } = useSelector((state) => state.guireReducer);

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
        <b>HƯỚNG DẪN CHI TIẾT</b>
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
            <span className="text-14 mb-3"> {detail.content}</span>
          </div>
          <VideoPlayer url={detail.video_url} />
        </div>
      )}
      {!detail?.id && (isSuccess || isFailure) && (
        <div className="text-center"> Không tìm thấy dữ liệu</div>
      )}
    </Container>
  );
};

export default GuireDetail;
