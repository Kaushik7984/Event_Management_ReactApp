const Event = require('../models/event');
const { NotFoundError } = require('../util/errors');

async function getAll() {
  const events = await Event.find();
  if (!events || events.length === 0) {
    throw new NotFoundError('Could not find any events.');
  }
  return events;
}

async function get(id) {
  const event = await Event.findById(id);
  if (!event) {
    throw new NotFoundError('Could not find event for id ' + id);
  }
  return event;
}

async function add(data) {
  const newEvent = new Event(data);
  await newEvent.save();
}

async function replace(id, data) {
  const event = await Event.findByIdAndUpdate(id, data, { new: true });
  if (!event) {
    throw new NotFoundError('Could not find event for id ' + id);
  }
  return event;
}

async function remove(id) {
  const event = await Event.findByIdAndDelete(id);
  if (!event) {
    throw new NotFoundError('Could not find event for id ' + id);
  }
}

module.exports = { getAll, get, add, replace, remove };
