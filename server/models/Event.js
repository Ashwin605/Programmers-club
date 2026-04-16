import JsonDb from '../utils/JsonDb.js';

const db = new JsonDb('events');

class Event {
  constructor(data) {
    Object.assign(this, data);
  }

  // Static method to find all events
  static async find(query) {
    const events = await db.find(query);
    return events.map(e => new Event(e));
  }

  // Static method to find by ID
  static async findById(id) {
    const event = await db.findById(id);
    return event ? new Event(event) : null;
  }

  // Instance method to save (create or update)
  async save() {
    if (this._id) {
        // Update
        const updated = await db.updateById(this._id, this);
        Object.assign(this, updated);
        return this;
    } else {
        // Create (Mongoose style new Event().save())
        // But for our simpler "create" flow in controller: const event = new Event({...}); await event.save();
        // We need to implement create logic here if _id is missing
        const newEvent = await db.create(this);
        Object.assign(this, newEvent);
        return this;
    }
  }

  // Instance method to delete
  async deleteOne() {
      if (this._id) {
          await db.deleteById(this._id);
      }
  }

  // Static method to delete all (Mocking Mongoose deleteMany)
  static async deleteMany() {
      const all = await Event.find({});
      for (const e of all) {
          await e.deleteOne();
      }
  }

  // Static method to insert many (Mocking Mongoose insertMany)
  static async insertMany(events) {
      const createdEvents = [];
      for (const eData of events) {
          const event = new Event(eData);
          await event.save();
          createdEvents.push(event);
      }
      return createdEvents;
  }
}

export default Event;
