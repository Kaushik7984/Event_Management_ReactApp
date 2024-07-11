import React from "react";
import { Link } from "react-router-dom";
import classes from './Home.module.css'

function HomePage() {
  return (
    <div className={classes.container}>
      <h1>This is Home Page</h1>
      <h1>
        Go to <Link to="/events">Event Page</Link>{" "}
      </h1>
      <p>
        
        Offers an easy way to manage your events likes (Add Event, Edit Event,
        and Delete Event).
      </p>
    </div>
  );
}

export default HomePage;
