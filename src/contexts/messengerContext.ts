import { createContext } from 'react';
import { Contact } from '../entities/contact';

export type TMessengerContext = {
  activeContact: Contact | null;
  setActiveContact: any;
};

export const MessengerContext = createContext<TMessengerContext>(null!);
