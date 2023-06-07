import React, { useState, HTMLProps, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import AddContactModal from './AddContactModal';
import { Contact, Message } from '../../entities/contact';
import { MessengerContext } from '../../contexts/messengerContext';
import { ApiService, MessageJSON } from '../../services/apiServiсe';

type ContactsProps = HTMLProps<HTMLDivElement> & {
  headerHeight: string;
};

const Contacts = (props: ContactsProps) => {
  const { activeContact, setActiveContact } = useContext(MessengerContext);
  const [isShow, setIsShow] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  //recursion to check incoming requests
  // useEffect(() => {
  //   checkNotification();
  // }, [contacts]);

  const textFunction = () => {
    const fetchMessages = async (): Promise<Message[]> => {
      return (await ApiService.fetchMessages()).map((message: MessageJSON) => ({
        sender: message.chatId,
        textMessage: message.message,
      }));
    };

    fetchMessages().then((messages) => {
      const newContacts: Contact[] = [...contacts];
      messages.forEach((message) => {
        let recipient = newContacts.find(
          (contact) => contact.getChatId() === message.sender,
        );
        if (recipient) {
          recipient.addMessage(message);
        } else {
          recipient = new Contact(message.sender.slice(0, 11));
          recipient.addMessage(message);
          newContacts.push(recipient);
        }
      });
      setContacts(newContacts);
    });
  };

  // function checkNotification() {
  //   ApiService.fetchNotification().then((response) => {
  //     if (response.data) {
  //       textFunction();
  //     } else {
  //       checkNotification();
  //     }
  //   });
  // }

  const onClose = (isShow: boolean) => {
    setIsShow(isShow);
  };

  const addContact = (phone: string) => {
    if (contacts.find((contact) => contact.phone === phone)) {
      return;
    }
    const contact = new Contact(phone);

    setContacts([...contacts, contact]);
    setIsShow(false);
  };

  const checkActiveListItem = (contact: Contact): boolean => {
    return activeContact?.id === contact.id;
  };

  return (
    <div className="d-flex flex-column" style={props.style}>
      <div
        className="d-flex justify-content-around align-items-center square border border-3 border-dark"
        style={{ flexBasis: props.headerHeight, backgroundColor: '#202C33' }}>
        <Card.Title className="text-white">Contacts</Card.Title>
        <Button
          className="rounded-circle"
          variant="success"
          onClick={() => setIsShow(true)}>
          +
        </Button>
        <Button
          className="rounded-circle"
          variant="success"
          onClick={() => textFunction()}>
          Update
        </Button>
      </div>
      <Card className="flex-grow-1" style={{ backgroundColor: '#111B21' }}>
        <Card.Body>
          <ListGroup>
            {contacts.map((contact) => (
              <ListGroup.Item
                key={contact.id}
                onClick={() => setActiveContact(contact)}
                style={{ backgroundColor: '#111B21', color: 'white' }}
                action
                active={checkActiveListItem(contact)}>
                +{contact.phone}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
      <AddContactModal
        onSave={addContact}
        isShow={isShow}
        onClose={onClose}></AddContactModal>
    </div>
  );
};

export default Contacts;
