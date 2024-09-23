import { Link, useSubmit } from 'react-router-dom';
import classes from './EventItem.module.css';

function EventItem({ event }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  // Format the date to "DD-MM-YYYY"
  const formatDate = (dateString) => {
    const eventDate = new Date(dateString);
    const day = String(eventDate.getDate()).padStart(2, '0');
    const month = String(eventDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = eventDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Make sure the event.date is being passed correctly
  const formattedDate = event.date ? formatDate(event.date) : 'Invalid date';
  console.log("Raw event date:", event.date);

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} className={classes.image} />
      <div className={classes.content}>
        <h1 className={classes.title}>{event.title}</h1>
        <time className={classes.date}>{formattedDate}</time>
        <p className={classes.description}>{event.description}</p>
      </div>
      <menu className={classes.actions}>
        <Link to="edit" className={classes.editButton}>Edit</Link>
        <button onClick={startDeleteHandler} className={classes.deleteButton}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
