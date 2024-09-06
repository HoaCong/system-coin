import { Card } from "react-bootstrap";

const questions = [
  {
    question: "Pi Network là gì và nó hoạt động như thế nào?",
    answer:
      "Pi Network là một loại tiền điện tử mới đang được phát triển nhằm mục đích tạo ra một hệ thống giao dịch phi tập trung mà người dùng có thể khai thác trực tiếp từ điện thoại di động của họ mà không cần tiêu tốn tài nguyên như điện năng. Nó hoạt động bằng cách sử dụng thuật toán đồng thuận Stellar.",
  },
  {
    question: "Các tính năng chính của ứng dụng Pi Network là gì?",
    answer:
      "Ứng dụng Pi Network cho phép người dùng khai thác tiền Pi, quản lý tài khoản, thực hiện giao dịch và giới thiệu người dùng mới để nhận thưởng thông qua một mạng lưới phi tập trung.",
  },
  {
    question:
      "Các bước kiểm tra chức năng của ứng dụng Pi Network bao gồm những gì?",
    answer:
      "Bao gồm kiểm tra đăng nhập, khai thác, giao dịch, giới thiệu người dùng mới và đảm bảo rằng tất cả các tính năng hoạt động đúng.",
  },
  {
    question: "Làm thế nào để kiểm tra tính bảo mật của ứng dụng Pi Network?",
    answer:
      "Có thể kiểm tra bằng cách thực hiện các bài kiểm tra lỗ hổng, kiểm tra mã hóa dữ liệu, xác thực người dùng và xem xét hệ thống bảo mật tổng thể.",
  },
  {
    question:
      "Pi Network xử lý dữ liệu cá nhân như thế nào và có chính sách bảo mật nào?",
    answer:
      "Pi Network thu thập và lưu trữ dữ liệu cá nhân theo các quy định bảo mật hiện hành, với mục đích bảo vệ quyền riêng tư của người dùng.",
  },
  {
    question: "Các vấn đề phổ biến khi kiểm tra ứng dụng Pi Network là gì?",
    answer:
      "Các vấn đề thường gặp bao gồm lỗi khi khai thác, sự cố khi giao dịch hoặc không thể kết nối đến mạng lưới.",
  },
  {
    question: "Pi Network có gặp phải các vấn đề về hiệu suất không?",
    answer:
      "Hiệu suất có thể bị ảnh hưởng bởi tốc độ mạng, số lượng người dùng đồng thời và các vấn đề tài nguyên của thiết bị.",
  },
  {
    question:
      "Làm thế nào để kiểm tra tính tương thích của ứng dụng Pi Network trên các thiết bị và hệ điều hành khác nhau?",
    answer:
      "Có thể kiểm tra bằng cách chạy ứng dụng trên các thiết bị Android, iOS với các phiên bản hệ điều hành khác nhau để đảm bảo tính tương thích.",
  },
  {
    question:
      "Cách thức và công cụ nào được sử dụng để kiểm tra tự động trong Pi Network?",
    answer:
      "Các công cụ như Selenium hoặc Appium có thể được sử dụng để kiểm tra tự động hóa các chức năng của ứng dụng.",
  },
  {
    question: "Cần làm gì khi phát hiện lỗi trong ứng dụng Pi Network?",
    answer:
      "Cần báo cáo lỗi qua hệ thống quản lý lỗi, xác định nguyên nhân và sau đó triển khai bản sửa lỗi.",
  },
  {
    question:
      "Làm thế nào để đảm bảo trải nghiệm người dùng tốt trong Pi Network?",
    answer:
      "Kiểm tra giao diện người dùng, thử nghiệm với người dùng thực và thực hiện cải tiến dựa trên phản hồi.",
  },
  {
    question:
      "Có các tiêu chuẩn và quy định nào cần tuân thủ khi kiểm tra ứng dụng Pi Network không?",
    answer:
      "Cần tuân thủ các tiêu chuẩn bảo mật và quyền riêng tư quốc tế, cũng như các quy định về tiền điện tử.",
  },
  {
    question:
      "Những kỹ năng và công cụ nào là cần thiết cho QA trong Pi Network?",
    answer:
      "Kỹ năng cần có bao gồm kiểm thử bảo mật, hiệu suất và tự động hóa, sử dụng các công cụ như Selenium, JMeter.",
  },
  {
    question:
      "Làm thế nào để quản lý và theo dõi các báo cáo lỗi trong Pi Network?",
    answer:
      "Sử dụng các công cụ quản lý lỗi như Jira hoặc Trello để theo dõi và phân loại các lỗi phát sinh.",
  },
  {
    question:
      "Pi Network có kế hoạch phát triển và nâng cấp nào trong tương lai không, và điều này ảnh hưởng đến QA như thế nào?",
    answer:
      "Dự kiến Pi Network sẽ phát triển thêm các tính năng mới, yêu cầu QA phải liên tục cập nhật và điều chỉnh quy trình kiểm thử.",
  },
];

const QAItem = ({ data, index }) => (
  <div>
    <Card className="mb-3">
      <Card.Body>
        <div>
          {/* <span className="text-muted">{data.role}</span> */}
          <h5 className="mt-2">{data.question}</h5>
          <p className="text-muted">{data.answer}</p>
        </div>
      </Card.Body>
    </Card>
    {index < questions.length - 1 && <hr />}
  </div>
);

const QAList = () => {
  return (
    <>
      <div className="my-4">
        <h3>Câu hỏi thường gặp</h3>
      </div>
      {/* <Nav variant="tabs" defaultActiveKey="all" className="mb-3">
        <Nav.Item>
          <Nav.Link eventKey="all">Tất cả</Nav.Link>
        </Nav.Item>
      </Nav> */}
      {questions.map((question, index) => (
        <QAItem key={index} data={question} index={index} />
      ))}
    </>
  );
};

export default QAList;
