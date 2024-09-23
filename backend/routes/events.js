const express = require('express');
const Event = require('../models/event');
const { isValidText, isValidDate, isValidImageUrl } = require('../util/validation');

const router = express.Router();

//Get all event
router.get('/', async (req, res, next) => {
  try {
    const events = await Event.find();
    const formattedEvents = events.map(event => ({
      ...event.toObject(),
      date: event.date.toLocaleDateString('en-GB', { timeZone: 'UTC' }) // Format to show only the date
    }));
    res.json({ events: formattedEvents });
  } catch (error) {
    next(error);
  }
});


//Get single Event
router.get('/:id', async (req, res, next) => {
  // console.log(req.params.id)
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }
    res.json({ event });
  } catch (error) {
    next(error);
  }
});

//Create event
router.post('/', async (req, res, next) => {
  const { title, description, date, image } = req.body;

  let errors = {};
  if (!isValidText(title)) errors.title = 'Invalid title.';
  if (!isValidText(description)) errors.description = 'Invalid description.';
  if (!isValidDate(date)) errors.date = 'Invalid date.';
  if (!isValidImageUrl(image)) errors.image = 'Invalid image.';

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ message: 'Validation failed.', errors });
  }

  const event = new Event({ title, description, date, image });

  try {
    await event.save();
    res.status(201).json({ message: 'Event created.', event });
  } catch (error) {
    next(error);
  }
});

//edit event
router.patch('/:id', async (req, res, next) => {
  // console.log(req.params.id)
  const { title, description, date, image } = req.body;

  let errors = {};
  if (!isValidText(title)) errors.title = 'Invalid title.';
  if (!isValidText(description)) errors.description = 'Invalid description.';
  if (!isValidDate(date)) errors.date = 'Invalid date.';
  if (!isValidImageUrl(image)) errors.image = 'Invalid image.';

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ message: 'Validation failed.', errors });
  }

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found.' });

    event.title = title;
    event.description = description;
    event.date = date;
    event.image = image;

    await event.save();
    res.json({ message: 'Event updated.', event });
  } catch (error) {
    next(error);
  }
});


// Delete Event
router.delete('/:id', async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found.' });

    res.json({ message: 'Event deleted.' });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
