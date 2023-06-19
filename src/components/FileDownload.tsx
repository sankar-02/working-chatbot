import React from 'react';
import { FilePdfOutlined, DownloadOutlined } from '@ant-design/icons';

interface Props {
  message: {
    message: string;
    sender: 'user' | 'bot';
    fileURL?: string;
  };
}

const FileDownload: React.FC<Props> = ({ message }) => {
  const { message: content, sender, fileURL } = message;

  return (
    <div className={`chat-message ${sender === 'user' ? 'user-message' : 'bot-message'}`}>
      {fileURL ? (
        <div className="message-content">
          <FilePdfOutlined className="pdf-icon" />
          <span>{content}</span>
          <span>
            <a href={fileURL} download>
              <DownloadOutlined className="download-icon" />
            </a>
          </span>
        </div>
      ) : (
        <span>{content}</span>
      )}
    </div>
  );
};

export default FileDownload;
