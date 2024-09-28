import React from "react";
import { Button, Card, Form, Image } from "react-bootstrap";

const commentsData = [
  {
    id: 1,
    name: "Tuấn Tiền Tỉ",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    text: "Trang web này thực sự tuyệt vời! Tôi rất hào hứng khi sử dụng những tính năng hữu ích mà nó đem lại.",
    time: "5 phút trước",
    replies: [
      {
        id: 11,
        name: "Hoa Hải Đường",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        text: "Đồng ý, tôi cũng thấy rất thích khi sử dụng!",
        time: "3 phút trước",
      },
    ],
  },
  {
    id: 2,
    name: "Đạt Villa",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "Giao diện dễ sử dụng và các chức năng rất trực quan. Chắc chắn sẽ còn quay lại thường xuyên!",
    time: "30 phút trước",
    replies: [],
  },
  {
    id: 3,
    name: "Trinh Trinh",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    text: "Rất nhiều tính năng giúp tôi làm việc nhanh hơn. Cảm ơn đội ngũ phát triển!",
    time: "1 ngày trước",
    replies: [
      {
        id: 31,
        name: "Long Cao Thủ",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        text: "Chính xác! Rất đáng để sử dụng.",
        time: "20 giờ trước",
      },
    ],
  },
  {
    id: 4,
    name: "Hà Cường Idol",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    text: "Cảm thấy thật tuyệt khi tìm được một trang web tiện ích như thế này!",
    time: "1 tuần trước",
    replies: [],
  },
];

const Comment = ({ name, avatar, text, time, replies }) => (
  <Card className="mb-3">
    <Card.Body>
      <div className="d-flex">
        <div>
          <Image
            width={50}
            height={50}
            src={avatar}
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
                      width={50}
                      height={50}
                      src={reply.avatar}
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
    <div className="mt-4">
      <h5>BÌNH LUẬN</h5>
      {commentsData.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default CommentList;