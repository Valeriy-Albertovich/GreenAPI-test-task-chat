import React, { useEffect, useState } from 'react';
import Contacts from '../components/contacts/Contacts';
import Chat from '../components/chat/Chat';
import { Contact } from '../entities/contact';
import { MessengerContext } from '../contexts/messengerContext';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { ApiService } from '../services/apiServiсe';

const Messenger = () => {
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const navigate = useNavigate();
  const headerHeight = '4rem';

  useEffect(() => {
    if (!ApiService.isAuthorized()) {
      navigate(LOGIN_ROUTE);
    }
  });

  return (
    <MessengerContext.Provider value={{ activeContact, setActiveContact }}>
      <div className="d-flex" style={{ height: '100vh' }}>
        <Contacts
          headerHeight={headerHeight}
          style={{ width: '300px' }}></Contacts>
        <Chat headerHeight={headerHeight} className="flex-grow-1"></Chat>
      </div>
    </MessengerContext.Provider>
  );
};

export default Messenger;
