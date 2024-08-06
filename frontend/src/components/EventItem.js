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

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} className={classes.image} />
      <div className={classes.content}>
        <h1 className={classes.title}>{event.title}</h1>
        <time className={classes.date}>{event.date}</time>
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
