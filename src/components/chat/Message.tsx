import clsx from 'clsx';
import React from 'react';
import { Alert } from 'react-bootstrap';

type MessageComponentProps = {
  isMine: boolean;
  textMessage: string;
};

const MessageComponent = (props: MessageComponentProps) => {
  return (
    <div className={clsx('d-flex ', props.isMine && 'justify-content-end')}>
      <Alert
        style={{ maxWidth: '40%' }}
        variant={props.isMine ? 'success' : 'dark'}>
        {props.textMessage}
      </Alert>
    </div>
  );
};

export default MessageComponent;
