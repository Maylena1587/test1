import React, { useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import Container from './Components/Container';
import ContactList from './Components/ContactList';
import ContactForm from './Components/ContactForm';
import Section from './Components/Section';
import Filter from './Components/Filter';
import useLocalStorage from './hooks/customHooks';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in Phonebook`);
      return;
    }

    const newContact = {
      id: uniqueId(),
      name,
      number,
    };

    setContacts(prevState => {
      return [...prevState, newContact];
    });
  };

  const deleteContact = e => {
    const deletedId = e.currentTarget.dataset.id;

    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== deletedId);
    });

    e.currentTarget.blur();
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm getFormData={addContact} />
      </Section>
      <Section title="Contacts">
        {contacts.length ? (
          <>
            <Filter
              value={filter}
              onChange={e => setFilter(e.currentTarget.value)}
            />
            {filter.trim() ? (
              <ContactList
                contacts={getFilteredContacts()}
                deleteHandler={deleteContact}
              />
            ) : (
              <ContactList contacts={contacts} deleteHandler={deleteContact} />
            )}
          </>
        ) : (
          <div>Oops. no contacts here! Let's add some data!</div>
        )}
      </Section>
    </Container>
  );
}

export default App;