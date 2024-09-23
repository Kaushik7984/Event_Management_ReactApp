import { Link } from 'react-router-dom';
import classes from './EventsList.module.css';

function EventsList({ events }) {
  return (
    <div className={classes.events}>
      <h1 className={classes.title}>All Events</h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={event._id} className={classes.link}>
              <img src={event.image} alt={event.title} className={classes.image} />
              <div className={classes.content}>
                <h2 className={classes.eventTitle}>{event.title}</h2>
                <time className={classes.date}>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className={classes.addButtonContainer}>
        <Link to="/events/new" className={classes.addButton}>
          Add New Event
        </Link>
      </div>
    </div>
  );
}

export default EventsList;
