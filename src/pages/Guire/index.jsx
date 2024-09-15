import CustomPagination from "components/common/CustomPagination";
import ImgCover from "components/common/ImgCover";
import TextLineClamp from "components/common/TextLineClamp";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionGetList, resetData } from "store/Guire/action";

const GuireSection = () => {
  const {
    listStatus: { isLoading, isSuccess, isFailure },
    list,
    params,
    meta,
  } = useSelector((state) => state.guireReducer);

  const dispatch = useDispatch();
  const onGetListCategory = (body) => dispatch(actionGetList(body));
  const onResetData = () => dispatch(resetData());

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isLoading) onGetListCategory(params);
    return () => {
      onResetData();
    };
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetListCategory({ ...params, page });
  };

  return (
    <Container>
      <h5 className="mb-4">
        <b>CHỈ DẪN</b>
      </h5>
      <Row>
        {isLoading && _size(list) === 0 && (
          <div
            className="d-flex justify-content-center align-items-center w-full"
            style={{ height: 400 }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {list?.map((news, index) => (
          <Col xs={12} lg={6} className="mb-4" key={index}>
            <Card className="border-0">
              <div className="row g-3">
                <div className="ps-0" style={{ width: 210 }}>
                  <ImgCover image={news.image} ratio="43" />
                </div>
                <div className="col">
                  <Card.Title className="fw-bold text-14">
                    {news.title}
                  </Card.Title>
                  <Card.Text>
                    <TextLineClamp line={5}>
                      <span className="text-12">{news.content}</span>
                    </TextLineClamp>
                  </Card.Text>
                </div>
              </div>
            </Card>
          </Col>
        ))}
        {!list?.length && (isSuccess || isFailure) && (
          <div className="text-center"> Không tìm thấy dữ liệu</div>
        )}
      </Row>
      <CustomPagination
        loading={isLoading}
        totalItems={meta.total}
        perPage={params.limit}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </Container>
  );
};

export default GuireSection;
