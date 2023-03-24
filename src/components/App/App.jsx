import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Filter from '../Filter/Filter';
import ContactsList from '../ContactList/ContactList';
import ContactsForm from '../ContactForm/ContactForm';

import css from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      return alert(`${name} is already in contacts`);
    }
    setContacts(prevState => [...prevState, contact]);
  };

  const getFilteredContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const changeFilter = filter => {
    setFilter(filter);
  };

  const removeContact = id => {
    setContacts(prev => [...prev.filter(contact => contact.id !== id)]);
    return;
  };

  return (
    <div className={css.data}>
      <h1>Phonebook</h1>
      <ContactsForm
        addContact={addContact}
      />

      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      <ContactsList
        contacts={getFilteredContact()}
        onRemoveContact={removeContact}
      />
    </div>
  );
}
