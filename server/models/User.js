import JsonDb from '../utils/JsonDb.js';
import bcrypt from 'bcryptjs';

const db = new JsonDb('users');

// Helper class to mimic Mongoose User Model behavior
class User {
  constructor(data) {
    Object.assign(this, data);
  }

  // Method to check password
  async matchPassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }

  // Static method to find one user
  static async findOne(query) {
    const user = await db.findOne(query);
    return user ? new User(user) : null;
  }

  // Static method to find by ID
  static async findById(id) {
    const user = await db.findById(id);
    return user ? new User(user) : null;
  }

  // Static method to create user
  static async create(data) {
    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    
    // Set default role if not provided
    if (!data.role) data.role = 'user';

    const newUser = await db.create(data);
    return new User(newUser);
  }

  // Static method to delete all (Mocking Mongoose deleteMany)
  static async deleteMany() {
      const users = await db.find({});
      for (const u of users) {
          await db.deleteById(u._id);
      }
  }
}

export default User;
