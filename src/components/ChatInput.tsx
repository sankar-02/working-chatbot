import React, { ChangeEvent, KeyboardEvent } from 'react';
import { SendOutlined } from "@ant-design/icons";
import { Input } from "antd";

const { TextArea } = Input;

interface Props {
  inputValue: string;
  handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: () => void;
  handleKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const ChatInput: React.FC<Props> = ({ inputValue, handleInputChange, handleSendMessage, handleKeyDown }) => {
  return (
    <div className="chat-input">
      <TextArea
        placeholder="Type a message..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoSize={{ minRows: 1, maxRows: 6 }}
      />
      <button type="button" onClick={handleSendMessage}>
        <SendOutlined />
      </button>
    </div>
  );
};

export default ChatInput;
