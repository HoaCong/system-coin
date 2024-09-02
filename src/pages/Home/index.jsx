import FooterPage from "components/footer/FooterPage";
import { Button, Carousel, Container } from "react-bootstrap";
import "./index.scss";
import CoinList from "./ListCoin";
import QAList from "./QAComponent";

export default function Home() {
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
              <h2 className="text-uppercase fw-bold mb-3">
                Sàn Phi Tập Trung <span className="fw-normal">ℼ</span>
              </h2>
              <div className="d-flex justify-content-center gap-3">
                <div>
                  <div className="text-uppercase text-12 mb-3">Giá bạn mua</div>
                  <Button variant="success" className="py-2 px-3 fw-bolder">
                    10000Đ
                  </Button>
                </div>
                <div>
                  <div className="text-uppercase text-12 mb-3">Giá bạn bán</div>
                  <Button variant="danger" className="py-2 px-3 fw-bolder">
                    10000Đ
                  </Button>
                </div>
              </div>
            </div>
            <div className="content-banner">
              <h2 className="text-uppercase fw-bold mb-3">
                Sàn Phi Tập Trung <span className="fw-normal">ℼ</span>
              </h2>
              <div className="d-flex justify-content-center gap-3">
                <div>
                  <div className="text-uppercase text-12 mb-3">Giá bạn mua</div>
                  <Button variant="success" className="py-2 px-3 fw-bolder">
                    10000Đ
                  </Button>
                </div>
                <div>
                  <div className="text-uppercase text-12 mb-3">Giá bạn bán</div>
                  <Button variant="danger" className="py-2 px-3 fw-bolder">
                    10000Đ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <CoinList />
        <QAList />
      </Container>
      <FooterPage />
    </div>
  );
}
