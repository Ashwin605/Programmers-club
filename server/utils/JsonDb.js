import fs from 'fs/promises';
import path from 'path';

// Helper to get absolute path to data files
const getDataPath = (collection) => path.join(process.cwd(), 'data', `${collection}.json`);

// Generic File DB Class
class JsonDb {
  constructor(collection) {
    this.collection = collection;
    this.filePath = getDataPath(collection);
  }

  // Initialize file if not exists
  async init() {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, JSON.stringify([], null, 2));
    }
  }

  // Get all documents
  async find(query = {}) {
    await this.init();
    const data = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
    
    // Simple query filtering
    return data.filter(item => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  }

  // Get single document
  async findOne(query) {
    const items = await this.find(query);
    return items[0] || null;
  }

  // Get by ID
  async findById(id) {
    return this.findOne({ _id: id });
  }

  // Create new document
  async create(doc) {
    const items = await this.find();
    const newDoc = {
      _id: Date.now().toString(), // Simple string ID
      createdAt: new Date(),
      ...doc
    };
    items.push(newDoc);
    await this.saveToFile(items);
    return newDoc;
  }

  // Helper to save entire array
  async saveToFile(items) {
    await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
  }
  
  // Update document by ID
  async updateById(id, updates) {
      const items = await this.find();
      const index = items.findIndex(i => i._id === id);
      if (index === -1) return null;
      
      items[index] = { ...items[index], ...updates };
      await this.saveToFile(items);
      return items[index];
  }

  // Delete document by ID
  async deleteById(id) {
    const items = await this.find();
    const filtered = items.filter(i => i._id !== id);
    if (items.length === filtered.length) return false;
    
    await this.saveToFile(filtered);
    return true;
  }
}

export default JsonDb;
