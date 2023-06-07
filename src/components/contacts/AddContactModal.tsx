import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

type AddContactModalProps = {
  isShow: boolean;
  onClose: (_isShow: boolean) => void;
  onSave: (_phone: any) => void;
};

const AddContactModal = (props: AddContactModalProps) => {
  const [phone, setPhone] = useState<string>();

  return (
    <Modal
      animation={false}
      show={props.isShow}
      onHide={() => props.onClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Enter new contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <Form.Control
            onChange={(event) => setPhone(event.target.value)}
            placeholder="79991234567"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onClose(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => props.onSave(phone)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddContactModal;
