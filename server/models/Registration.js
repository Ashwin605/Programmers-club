import JsonDb from '../utils/JsonDb.js';

const db = new JsonDb('registrations');

class Registration {
  constructor(data) {
    Object.assign(this, data);
  }

  static async find(query = {}) {
    const registrations = await db.find(query);
    return registrations.map(r => new Registration(r));
  }

  static async create(data) {
    const newRegistration = await db.create(data);
    return new Registration(newRegistration);
  }
}

export default Registration;
