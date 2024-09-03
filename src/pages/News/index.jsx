import React, { useState } from "react";
import { Card, Col, Container, Image, Pagination, Row } from "react-bootstrap";

const NewsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const newsData = [
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/google-vao-cuoc-choi-blockchain-va-co-hoi-cho-doanh-nghiep-viet-00-jpg-20221012215406LSJ7hib9_thum.jpg",
      title: "Google vào cuộc chơi blockchain và cơ hội cho doanh nghiệp Việt",
      content:
        "Có rất nhiều thông tin giá trị và nóng sốt với sự đầu tư “nặng đô” của Google vào lĩnh vực Web3 - blockchain được tiết lộ. Những thông tin đó trở thành động lực cho những người đang ...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/ngan-hang-lau-doi-nhat-nuoc-my-bny-mellon-mo-dich-vu-luu-ky-crypto-00-jpg-20221012111508di0MNtta_thum.jpg",
      title:
        "Ngân hàng lâu đời nhất nước Mỹ BNY Mellon mở dịch vụ lưu ký crypto",
      content: "Với dịch vụ mới này...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/google-vao-cuoc-choi-blockchain-va-co-hoi-cho-doanh-nghiep-viet-00-jpg-20221012215406LSJ7hib9_thum.jpg",
      title: "Google vào cuộc chơi blockchain và cơ hội cho doanh nghiệp Việt",
      content:
        "Có rất nhiều thông tin giá trị và nóng sốt với sự đầu tư “nặng đô” của Google vào lĩnh vực Web3 - blockchain được tiết lộ. Những thông tin đó trở thành động lực cho những người đang ...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/ngan-hang-lau-doi-nhat-nuoc-my-bny-mellon-mo-dich-vu-luu-ky-crypto-00-jpg-20221012111508di0MNtta_thum.jpg",
      title:
        "Ngân hàng lâu đời nhất nước Mỹ BNY Mellon mở dịch vụ lưu ký crypto",
      content: "Với dịch vụ mới này...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/google-vao-cuoc-choi-blockchain-va-co-hoi-cho-doanh-nghiep-viet-00-jpg-20221012215406LSJ7hib9_thum.jpg",
      title: "Google vào cuộc chơi blockchain và cơ hội cho doanh nghiệp Việt",
      content:
        "Có rất nhiều thông tin giá trị và nóng sốt với sự đầu tư “nặng đô” của Google vào lĩnh vực Web3 - blockchain được tiết lộ. Những thông tin đó trở thành động lực cho những người đang ...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/ngan-hang-lau-doi-nhat-nuoc-my-bny-mellon-mo-dich-vu-luu-ky-crypto-00-jpg-20221012111508di0MNtta_thum.jpg",
      title:
        "Ngân hàng lâu đời nhất nước Mỹ BNY Mellon mở dịch vụ lưu ký crypto",
      content: "Với dịch vụ mới này...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/google-vao-cuoc-choi-blockchain-va-co-hoi-cho-doanh-nghiep-viet-00-jpg-20221012215406LSJ7hib9_thum.jpg",
      title: "Google vào cuộc chơi blockchain và cơ hội cho doanh nghiệp Việt",
      content:
        "Có rất nhiều thông tin giá trị và nóng sốt với sự đầu tư “nặng đô” của Google vào lĩnh vực Web3 - blockchain được tiết lộ. Những thông tin đó trở thành động lực cho những người đang ...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/ngan-hang-lau-doi-nhat-nuoc-my-bny-mellon-mo-dich-vu-luu-ky-crypto-00-jpg-20221012111508di0MNtta_thum.jpg",
      title:
        "Ngân hàng lâu đời nhất nước Mỹ BNY Mellon mở dịch vụ lưu ký crypto",
      content: "Với dịch vụ mới này...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/google-vao-cuoc-choi-blockchain-va-co-hoi-cho-doanh-nghiep-viet-00-jpg-20221012215406LSJ7hib9_thum.jpg",
      title: "Google vào cuộc chơi blockchain và cơ hội cho doanh nghiệp Việt",
      content:
        "Có rất nhiều thông tin giá trị và nóng sốt với sự đầu tư “nặng đô” của Google vào lĩnh vực Web3 - blockchain được tiết lộ. Những thông tin đó trở thành động lực cho những người đang ...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/ngan-hang-lau-doi-nhat-nuoc-my-bny-mellon-mo-dich-vu-luu-ky-crypto-00-jpg-20221012111508di0MNtta_thum.jpg",
      title:
        "Ngân hàng lâu đời nhất nước Mỹ BNY Mellon mở dịch vụ lưu ký crypto",
      content: "Với dịch vụ mới này...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/google-vao-cuoc-choi-blockchain-va-co-hoi-cho-doanh-nghiep-viet-00-jpg-20221012215406LSJ7hib9_thum.jpg",
      title: "Google vào cuộc chơi blockchain và cơ hội cho doanh nghiệp Việt",
      content:
        "Có rất nhiều thông tin giá trị và nóng sốt với sự đầu tư “nặng đô” của Google vào lĩnh vực Web3 - blockchain được tiết lộ. Những thông tin đó trở thành động lực cho những người đang ...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/ngan-hang-lau-doi-nhat-nuoc-my-bny-mellon-mo-dich-vu-luu-ky-crypto-00-jpg-20221012111508di0MNtta_thum.jpg",
      title:
        "Ngân hàng lâu đời nhất nước Mỹ BNY Mellon mở dịch vụ lưu ký crypto",
      content: "Với dịch vụ mới này...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/google-vao-cuoc-choi-blockchain-va-co-hoi-cho-doanh-nghiep-viet-00-jpg-20221012215406LSJ7hib9_thum.jpg",
      title: "Google vào cuộc chơi blockchain và cơ hội cho doanh nghiệp Việt",
      content:
        "Có rất nhiều thông tin giá trị và nóng sốt với sự đầu tư “nặng đô” của Google vào lĩnh vực Web3 - blockchain được tiết lộ. Những thông tin đó trở thành động lực cho những người đang ...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/ngan-hang-lau-doi-nhat-nuoc-my-bny-mellon-mo-dich-vu-luu-ky-crypto-00-jpg-20221012111508di0MNtta_thum.jpg",
      title:
        "Ngân hàng lâu đời nhất nước Mỹ BNY Mellon mở dịch vụ lưu ký crypto",
      content: "Với dịch vụ mới này...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/google-vao-cuoc-choi-blockchain-va-co-hoi-cho-doanh-nghiep-viet-00-jpg-20221012215406LSJ7hib9_thum.jpg",
      title: "Google vào cuộc chơi blockchain và cơ hội cho doanh nghiệp Việt",
      content:
        "Có rất nhiều thông tin giá trị và nóng sốt với sự đầu tư “nặng đô” của Google vào lĩnh vực Web3 - blockchain được tiết lộ. Những thông tin đó trở thành động lực cho những người đang ...",
    },
    {
      image:
        "https://sanpinetwork.com/uploads/baiviet/ngan-hang-lau-doi-nhat-nuoc-my-bny-mellon-mo-dich-vu-luu-ky-crypto-00-jpg-20221012111508di0MNtta_thum.jpg",
      title:
        "Ngân hàng lâu đời nhất nước Mỹ BNY Mellon mở dịch vụ lưu ký crypto",
      content: "Với dịch vụ mới này...",
    },
    // Thêm các tin tức khác vào đây
  ];

  // Lọc danh sách tin tức cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = newsData.slice(indexOfFirstItem, indexOfLastItem);

  // Tạo các trang trong Pagination
  const totalPages = Math.ceil(newsData.length / itemsPerPage);
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Container>
      <h1 className="text-start">TIN TỨC</h1>
      <Row>
        {currentNews.map((news, index) => (
          <Col xs={12} lg={6} className="mb-4" key={index}>
            <Card className="border-0">
              <div className="d-flex">
                <div>
                  <Image
                    src={news.image}
                    className="rounded-3 me-3"
                    style={{ width: "150px", height: "auto" }}
                  />
                </div>
                <div>
                  <Card.Title className="fw-bold">{news.title}</Card.Title>
                  <Card.Text>{news.content}</Card.Text>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Pagination className="justify-content-center">
          {currentPage !== 1 && (
            <Pagination.First onClick={() => setCurrentPage(1)} />
          )}
          {currentPage !== 1 && (
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
          )}
          {paginationItems}
          {currentPage !== totalPages && (
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
          )}
          {currentPage !== totalPages && (
            <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
          )}
        </Pagination>
      </Row>
    </Container>
  );
};

export default NewsSection;
