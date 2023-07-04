import React, { useEffect, useRef, useReducer } from 'react';
import { Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import ChatInput from './ChatInput';
import { fetchRandomQuote } from './quote';
import FileDownload from './FileDownload';
import * as constant from './constants/constant';
import reducer, { ActionType } from './reducer';
import { Message } from './types';
import './Chatbot.css';

const ChatbotContainer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    showDialog: false,
    messages: [],
    inputValue: constant.empty,
  });
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: ActionType.SET_INPUT_VALUE, payload: event.target.value });
  };

  const handleSendMessage = () => {
    if (state.inputValue.trim() === constant.empty) {
      return;
    }

    const newMessage: Message = {
      id: state.messages.length + 1,
      message: state.inputValue,
      sender: constant.user,
    };

    dispatch({
      type: ActionType.SET_MESSAGES,
      payload: [...state.messages, newMessage],
    });
    dispatch({ type: ActionType.SET_INPUT_VALUE, payload: constant.empty });
  };

  const toggleDialog = () => {
    dispatch({ type: ActionType.TOGGLE_DIALOG });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleOptionClick = (option: string) => {
    const newMessage: Message = {
      id: state.messages.length + 1,
      message: option,
      sender: constant.user,
    };
    dispatch({ type: ActionType.SET_MESSAGES, payload: [...state.messages, newMessage] });
  };

  const scrollToLatestMessage = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToLatestMessage();
  }, [state.messages]);

  useEffect(() => {
    const handleBotReply = async () => {
      const lastUserMessage = state.messages[state.messages.length - 1].message.toLowerCase();

      switch (lastUserMessage) {
        case constant.quote.toLowerCase():
          const quote = await fetchRandomQuote();

          if (quote) {
            const newMessage: Message = {
              id: state.messages.length + 1,
              message: quote,
              sender: constant.bot,
            };

            dispatch({
              type: ActionType.SET_MESSAGES,
              payload: [...state.messages, newMessage],
            });
          }
          break;

        case constant.help.toLowerCase():
          const documents: Message[] = [
            {
              id: state.messages.length + 1,
              message: constant.help_fileName,
              sender: constant.bot,
              fileURL: constant.help_fileURL,
            },
            {
              id: state.messages.length + 2,
              message: constant.help_fileName_2,
              sender: constant.bot,
              fileURL: constant.help_fileURL_2,
            },
            {
              id: state.messages.length + 3,
              message: constant.help_fileName_3,
              sender: constant.bot,
              fileURL: constant.help_fileURL_3,
            },
            {
              id: state.messages.length + 4,
              message: constant.help_fileName_4,
              sender: constant.bot,
              fileURL: constant.help_fileURL_4,
            },
          ];

          dispatch({
            type: ActionType.SET_MESSAGES,
            payload: [...state.messages, ...documents],
          });
          break;

        default:
      }
    };

    if (state.showDialog && state.messages.length === 0) {
      const initialBotMessage: Message = {
        id: 1,
        message: constant.hello_msg,
        sender: constant.bot,
      };

      dispatch({ type: ActionType.SET_MESSAGES, payload: [initialBotMessage] });
    } else if (
      state.messages.length > 0 &&
      state.messages[state.messages.length - 1]?.sender === constant.user
    ) {
      handleBotReply();
    }
  }, [state.showDialog, state.messages]);

  return (
    <div className="chatbot-container">
      {!state.showDialog && (
        <div className={`chatbot-bubble ${state.showDialog ? 'hidden' : constant.empty}`} onClick={toggleDialog}>
          <MessageOutlined className="bubble-icon" />
        </div>
      )}

      {state.showDialog && (
        <div className="chatbot-dialog">
          <div className="chat-header">
            {/* Header content */}
          </div>

          <div className="chat-messages" ref={chatMessagesRef}>
            {state.messages.map((message) => (
              <FileDownload key={message.id} message={message} />
            ))}

            {state.messages.length > 0 && state.messages[state.messages.length - 1].sender === constant.bot && (
              <div className="options-container">
                <Button
                  type="primary"
                  onClick={() => handleOptionClick(constant.help)}
                  style={{ marginRight: '10px' }}
                >
                  {constant.help}
                </Button>
                <Button type="primary" onClick={() => handleOptionClick(constant.quote)}>
                  {constant.quote}
                </Button>
              </div>
            )}
          </div>

          <ChatInput
            inputValue={state.inputValue}
            handleInputChange={handleInputChange}
            handleSendMessage={handleSendMessage}
            handleKeyDown={handleKeyDown}
          />
        </div>
      )}
    </div>
  );
};

export default ChatbotContainer;
