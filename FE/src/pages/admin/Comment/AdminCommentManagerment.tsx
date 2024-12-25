import React, { useEffect, useState } from "react";
import { DeleteOutlined, CommentOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import { message, Button, Table, Modal, Input } from "antd";
import axios from "axios";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";

interface Comment {
  id: number;
  user: {
    name: string;
  };
  product: {
    name: string;
  };
  content: string;
  star: number;
  created_at: string;
}

const AdminCommentManagement: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/comments`);
      setComments(response.data.data);
    } catch (error) {
      message.error("Tải bình luận thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/comments/${id}`);
      message.success("Xóa bình luận thành công.");
      fetchComments();
    } catch (error) {
      message.error("Xóa bình luận thất bại.");
    }
  };

  const handleReply = async () => {
    if (!selectedComment) return;
    try {
      await axios.post(
        `http://localhost:8000/api/comments/${selectedComment.id}/reply`,
        {
          reply: replyContent,
        }
      );
      message.success("Trả lời thành công.");
      setReplyContent("");
      setSelectedComment(null);
      fetchComments();
    } catch (error) {
      message.error("Trả lời thất bại.");
    }
  };

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: ["user", "name"],
      key: "user",
    },
    {
      title: "Sản phẩm",
      dataIndex: ["product", "name"],
      key: "product",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (content: string) => (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ),
    },
    {
      title: "Sao đánh giá",
      dataIndex: "star",
      key: "star",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) =>
        moment(created_at).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: Comment) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<CommentOutlined />}
            onClick={() => setSelectedComment(record)}
          >
            Trả lời
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý đánh giá sản phẩm</h1>
      <Table
        columns={columns}
        dataSource={comments}
        rowKey="id"
        loading={loading}
        className="bg-white shadow-md rounded-lg"
      />

      <Modal
        title="Trả lời đánh giá"
        visible={!!selectedComment}
        onCancel={() => setSelectedComment(null)}
        onOk={handleReply}
        okText="Reply"
        cancelText="Cancel"
      >
        <Editor
          apiKey="ctvzrw02dm8zn8el3zxzixide2kwgyej4cj85e5l2zpybdsx" // Thay bằng API key của bạn từ TinyMCE
          value={replyContent}
          onEditorChange={(content) => setReplyContent(content)}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help",
          }}
        />
      </Modal>
    </div>
  );
};

export default AdminCommentManagement;
