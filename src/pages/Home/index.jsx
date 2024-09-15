import ImgCover from "components/common/ImgCover";
import FooterPage from "components/footer/FooterPage";
import { formatCurrency } from "helper/functions";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./index.scss";
import TransactionForm from "./TransactionForm";

export default function Home() {
  const {
    listStatus: { isLoading, isSuccess, isFailure },
    list,
  } = useSelector((state) => state.coinReducer);

  return (
    <div>
      <div className="banner">
        <Carousel interval={5000} controls={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://sanpinetwork.com/uploads/quangcao/dang-len-1-png-20230915090819SGUQP4LwuJ.png"
              alt="Banner 1"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://sanpinetwork.com/uploads/quangcao/dang-len-6-png-20230915091322VWCfGkWqr0.png"
              alt="Slide 2"
            />
          </Carousel.Item>
        </Carousel>
        <div className="box-banner">
          <div className="d-flex gap-3 flex-wrap justify-content-center">
            <div className="content-banner">
              <h3 className="text-uppercase fw-bold mb-3">
                Sàn Phi Tập Trung <span className="fw-normal">ℼ</span>
              </h3>
              <div className="d-flex justify-content-center gap-3">
                <div>
                  <div className="text-uppercase text-12 mb-3">Giá bạn mua</div>
                  <Button variant="success" className="py-2 px-3 fw-bolder">
                    {isLoading
                      ? "Loading..."
                      : formatCurrency(list[0]?.giaban || 0)}
                  </Button>
                </div>
                <div>
                  <div className="text-uppercase text-12 mb-3">Giá bạn bán</div>
                  <Button variant="danger" className="py-2 px-3 fw-bolder">
                    {isLoading
                      ? "Loading..."
                      : formatCurrency(list[0]?.giamua || 0)}
                  </Button>
                </div>
              </div>
            </div>
            <div className="content-banner">
              <h3 className="text-uppercase fw-bold mb-3">
                SÀN PHI TẬP TRUNG SIDRA
              </h3>
              <div className="d-flex justify-content-center gap-3">
                <div>
                  <div className="text-uppercase text-12 mb-3">Giá bạn mua</div>
                  <Button variant="success" className="py-2 px-3 fw-bolder">
                    {isLoading
                      ? "Loading..."
                      : formatCurrency(list[1]?.giaban || 0)}
                  </Button>
                </div>
                <div>
                  <div className="text-uppercase text-12 mb-3">Giá bạn bán</div>
                  <Button variant="danger" className="py-2 px-3 fw-bolder">
                    {isLoading
                      ? "Loading..."
                      : formatCurrency(list[1]?.giamua || 0)}
                  </Button>
                </div>
              </div>
            </div>
            {/* {list?.map((item) => (
              <div className="content-banner">
                <h3 className="text-uppercase fw-bold mb-3">{item.name}</h3>
                <div className="d-flex justify-content-center gap-3">
                  <div>
                    <div className="text-uppercase text-12 mb-3">
                      Giá bạn mua
                    </div>
                    <Button variant="success" className="py-2 px-3 fw-bolder">
                      {formatCurrency(item.giaban)}
                    </Button>
                  </div>
                  <div>
                    <div className="text-uppercase text-12 mb-3">
                      Giá bạn bán
                    </div>
                    <Button variant="danger" className="py-2 px-3 fw-bolder">
                      {formatCurrency(item.giamua)}
                    </Button>
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
      <Container className="mt-3">
        <Row>
          <Col md={3} lg={4} className="hideMobile">
            <div>
              <ImgCover image="https://sanpinetwork.com/uploads/quangcao/mua-sam-02-min-png-20230915091705aswLoTARQ.png" />
            </div>
            <div>
              <ImgCover image="https://sanpinetwork.com/uploads/quangcao/dich-vu-2-min-png-20230915091754ww5ZAN4I6G.png" />
            </div>
            <div>
              <ImgCover image="https://sanpinetwork.com/uploads/quangcao/nguon-hang-03a-png-20230915091609Vv25Oc1nul.png" />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <TransactionForm />
          </Col>
          <Col md={3} lg={4}>
            <div>
              <ImgCover image="https://sanpinetwork.com/uploads/noidung/images/tb-cho-6.PNG" />
            </div>
            <div>
              <ImgCover image="https://sanpinetwork.com/uploads/quangcao/nguon-hang-03a-png-20230915091609Vv25Oc1nul.png" />
            </div>
            <div>
              <ImgCover image="https://sanpinetwork.com/uploads/quangcao/dich-vu-2-min-png-20230915091754ww5ZAN4I6G.png" />
            </div>
          </Col>
        </Row>
      </Container>
      <FooterPage />
    </div>
  );
}
