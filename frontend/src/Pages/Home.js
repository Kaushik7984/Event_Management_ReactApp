import React from "react";
import { Link } from "react-router-dom";
import classes from './Home.module.css';

function HomePage() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay}></div>
      <div className={classes.container}>
        <h1 className={classes.title}>Welcome to Event Planner</h1>
        <p className={classes.subtitle}>
          Your one-stop solution to manage, organize, and enhance your events.
        </p>
        <Link to="/events" className={classes.eventButton}>
          View Events
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
