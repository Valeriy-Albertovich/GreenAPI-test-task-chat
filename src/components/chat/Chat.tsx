import React, { useEffect, useState, HTMLProps, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import clsx from 'clsx';
import { MessengerContext } from '../../contexts/messengerContext';
import MessageComponent from './Message';
import { Message } from '../../entities/contact';
import { ApiService } from '../../services/apiServiсe';

type ContactsProps = HTMLProps<HTMLDivElement> & {
  headerHeight: string;
};

const Chat = (props: ContactsProps) => {
  const { activeContact } = useContext(MessengerContext);
  const [inputValue, setInputValue] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const setAndSendMessage = (textMessage: string) => {
    if (!textMessage) {
      return;
    }
    const message: Message = {
      textMessage,
      sender: 'mine',
    };
    activeContact?.addMessage(message);
    setInputValue('');

    ApiService.sendMessage({
      message: textMessage,
      chatId: activeContact?.getChatId()!,
    });
  };

  return (
    <div
      className={clsx('d-flex flex-column', props.className)}
      style={{ height: '100vh' }}>
      <div
        className="d-flex align-items-center square border border-start-0 border-3 border-dark p-3"
        style={{ height: props.headerHeight, backgroundColor: '#202C33' }}>
        <Card.Title className="text-white">{activeContact?.phone}</Card.Title>
      </div>
      <Card className="flex-grow-1" style={{ backgroundColor: '#111B21' }}>
        {activeContact ? (
          <Card.Body
            className="d-flex flex-column"
            style={{ overflow: 'hidden' }}>
            <div
              className="flex-grow-1"
              style={{ height: 'calc(100vh - 12rem)', overflowY: 'scroll' }}>
              {activeContact
                .getMessages()
                .map(({ sender, textMessage }, index) => (
                  <MessageComponent
                    key={index}
                    isMine={activeContact?.getChatId() !== sender}
                    textMessage={textMessage}
                  />
                ))}
            </div>
            <div className="d-flex justify-content-evenly p-3">
              <InputGroup
                className="mb-3"
                style={{ width: '80%', height: '3rem' }}>
                <Form.Control
                  style={{ backgroundColor: '#2A3942', color: '#D1D7DB' }}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder=""
                  value={inputValue}
                />
              </InputGroup>
              <Button
                variant="secondary"
                style={{ height: '3rem' }}
                onClick={() => setAndSendMessage(inputValue!)}>
                Send
              </Button>
            </div>
          </Card.Body>
        ) : (
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <span className="fs-1 text-light">No chat selected</span>
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default Chat;
