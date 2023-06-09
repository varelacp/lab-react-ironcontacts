const ContactRow = ({ contact, onDelete }) => {
  const { id, pictureUrl, name, popularity, wonOscar, wonEmmy } = contact;

  return (
    <tr key={id}>
      <td>
        <img src={pictureUrl} alt={name} height="100" />
      </td>
      <td>{name}</td>
      <td>{popularity}</td>
      <td>
        {wonOscar ? (
          <span role="img" aria-label="trophy">
            🏆
          </span>
        ) : null}
      </td>
      <td>
        {wonEmmy ? (
          <span role="img" aria-label="emmy">
            ⭐️
          </span>
        ) : null}
      </td>
      <td>
        <button className="delete-button" onClick={() => onDelete(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ContactRow;
