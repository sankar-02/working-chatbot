import React from 'react';
import { CloseOutlined } from "@ant-design/icons";

interface ChatHeaderProps {
  toggleDialog: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ toggleDialog }) => {
  return (
    <div className="chat-header">
      <span>Chat</span>
      <div className="close-button" onClick={toggleDialog}>
        <CloseOutlined className="close-button" />
      </div>
    </div>
  );
};

export default ChatHeader;
