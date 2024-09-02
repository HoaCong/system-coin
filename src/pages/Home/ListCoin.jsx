import piImg from "assets/images/pi.jpg";
import sidraImg from "assets/images/sidra.jpg";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
const coinData = [
  {
    name: "Pi Network",
    symbol: "PI",
    price: "$150",
    change: "+3.5%",
    volume: "$1.2M",
    image: piImg,
  },
  {
    name: "Sidra Coin",
    symbol: "SIDRA",
    price: "$2.5",
    change: "-1.2%",
    volume: "$800K",
    image: sidraImg,
  },
];

const CoinCard = ({ coin }) => (
  <Card className="shadow-sm h-100">
    <Card.Body>
      <Row className="align-items-center">
        <Col xs={4}>
          <img
            src={coin.image}
            alt={`${coin.name} logo`}
            className="img-fluid rounded-circle"
            width={80}
            height={80}
          />
        </Col>
        <Col xs={8}>
          <h5 className="mb-1">{coin.name}</h5>
          <h6 className="text-muted">{coin.symbol}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-0">{coin.price}</h4>
              <small
                className={`text-${
                  coin.change.startsWith("-") ? "danger" : "success"
                }`}
              >
                {coin.change}
              </small>
            </div>
            <div>
              <small className="text-muted">24h Volume</small>
              <h6 className="mb-0">{coin.volume}</h6>
            </div>
          </div>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

const CoinList = () => (
  <Row className="my-4">
    {coinData.map((coin, index) => (
      <Col key={index} xs={12} md={6} className="mb-4">
        <CoinCard coin={coin} />
      </Col>
    ))}
  </Row>
);

export default CoinList;
