import React from "react";
import { Button, Card, Form, Image } from "react-bootstrap";

const commentsData = [
  {
    id: 1,
    name: "Người dùng 1",
    text: "Trang web này thực sự tuyệt vời! Tôi rất hào hứng khi sử dụng những tính năng hữu ích mà nó đem lại.",
    time: "5 phút trước",
    replies: [
      {
        id: 11,
        name: "Người dùng 2",
        text: "Đồng ý, tôi cũng thấy rất thích khi sử dụng!",
        time: "3 phút trước",
      },
    ],
  },
  {
    id: 2,
    name: "Người dùng 3",
    text: "Giao diện dễ sử dụng và các chức năng rất trực quan. Chắc chắn sẽ còn quay lại thường xuyên!",
    time: "30 phút trước",
    replies: [],
  },
  {
    id: 3,
    name: "Người dùng 4",
    text: "Rất nhiều tính năng giúp tôi làm việc nhanh hơn. Cảm ơn đội ngũ phát triển!",
    time: "1 ngày trước",
    replies: [
      {
        id: 31,
        name: "Người dùng 5",
        text: "Chính xác! Rất đáng để sử dụng.",
        time: "20 giờ trước",
      },
    ],
  },
  {
    id: 4,
    name: "Người dùng 6",
    text: "Cảm thấy thật tuyệt khi tìm được một trang web tiện ích như thế này!",
    time: "1 tuần trước",
    replies: [],
  },
];

const Comment = ({ name, text, time, replies }) => (
  <Card className="mb-3">
    <Card.Body>
      <div className="d-flex">
        <div>
          <Image
            src="https://via.placeholder.com/50"
            roundedCircle
            alt="Avatar"
            className="me-3"
          />
        </div>
        <div>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {text}
            <div className="text-muted">{time}</div>
          </Card.Text>
          {replies.length > 0 && (
            <div className="ms-4">
              {replies.map((reply) => (
                <div key={reply.id} className="d-flex mt-2">
                  <div>
                    <Image
                      src="https://via.placeholder.com/40"
                      roundedCircle
                      alt="Avatar"
                      className="me-3"
                    />
                  </div>
                  <div>
                    <strong>{reply.name}</strong>
                    <p className="mb-1">{reply.text}</p>
                    <div className="text-muted">{reply.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card.Body>
  </Card>
);

const CommentList = () => {
  return (
    <div>
      <h5>BÌNH LUẬN</h5>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3 position-relative">
          <Form.Control
            as="textarea"
            rows={3}
            min={3}
            placeholder="Hãy chia sẻ suy nghĩ của bạn ..."
            style={{ minHeight: 100 }}
          />
          <Button
            variant="secondary"
            type="submit"
            className="position-absolute end-0 bottom-0 m-2 px-4 py-1"
          >
            Gửi
          </Button>
        </Form.Group>
      </Form>
      {commentsData.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default CommentList;
