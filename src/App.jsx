import './App.css';
import contacts from './contacts.json';
import { useState } from 'react';
import ContactRow from './components/ContactRow';

function App() {
  const firstContacts = contacts.slice(0, 5);
  const firstRemainingContacts = contacts.slice(5);

  const [contactList, setContactList] = useState(firstContacts);
  const [remainingContacts, setRemainingContacts] = useState(
    firstRemainingContacts
  );
  const [sortBy, setSortBy] = useState('name');
  const [sortByOrder, setSortByOrder] = useState('ascending');

  const sortByName = () => {
    const sortedContacts = contactList.slice().sort((a, b) => {
      if (a.name < b.name) return sortByOrder === 'ascending' ? -1 : 1;
      if (a.name > b.name) return sortByOrder === 'ascending' ? 1 : -1;
      return 0;
    });

    setContactList(sortedContacts);
    setSortBy('name');
    setSortByOrder(sortByOrder === 'ascending' ? 'descending' : 'ascending');
  };

  const sortByPopularity = () => {
    const sortedContacts = contactList.slice().sort((a, b) => {
      return sortByOrder === 'ascending'
        ? b.popularity - a.popularity
        : a.popularity - b.popularity;
    });

    setContactList(sortedContacts);
    setSortBy('popularity');
    setSortByOrder(sortByOrder === 'ascending' ? 'descending' : 'ascending');
  };

  const addRandomContact = () => {
    if (remainingContacts.length === 0) {
      return; // no more contacts to add
    }

    const selectedContactIndex = Math.floor(
      Math.random() * remainingContacts.length
    );
    const randomContact = remainingContacts[selectedContactIndex];

    setContactList(previousContacts => [...previousContacts, randomContact]);
    setRemainingContacts(prevRemaining => {
      const updatedRemaining = [...prevRemaining];
      updatedRemaining.splice(selectedContactIndex, 1);
      return updatedRemaining; // to remove the one that was selected already
    });
  };

  const deleteContact = id => {
    const updatedContacts = [];
    contactList.forEach(contact => {
      if (contact.id !== id) {
        updatedContacts.push(contact);
      }
    });
    setContactList(updatedContacts);
  };

  return (
    <div className="App">
      <h2>IronContacts</h2>
      <div className="button-container">
        <button
          onClick={addRandomContact}
          // if no more contacts to add
          disabled={remainingContacts.length === 0}
        >
          Add Random Contacts
        </button>
        <button
          onClick={sortByName}
          className={sortBy === 'name' ? 'active' : ''}
        >
          Sort by Name
        </button>
        <button
          onClick={sortByPopularity}
          className={sortBy === 'popularity' ? 'active' : ''}
        >
          Sort by Popularity
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>
              Won <br /> Oscar
            </th>
            <th>
              Won <br /> Emmy
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map(contact => (
            <ContactRow
              key={contact.id}
              contact={contact}
              onDelete={deleteContact}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
