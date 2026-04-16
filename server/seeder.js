import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';
import User from './models/User.js';
import { connectDB } from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Event.deleteMany();
    // await User.deleteMany(); // Keep users for now

    const events = [
      // Competitions
      {
        title: 'Binary Hunt',
        description: 'A fun logic-based competition where participants solve puzzles using binary concepts.',
        date: null,
        location: 'Lab 1',
        category: 'Competition',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
      },
      {
        title: 'Prompt Challenges',
        description: 'Creative problem-solving using AI prompts to generate efficient and innovative outputs.',
        date: null,
        location: 'Innovation Hub',
        category: 'Competition',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop',
      },
      {
        title: 'Debug-A-Thon',
        description: 'Participants identify and fix errors in given code snippets within a time limit.',
        date: null,
        location: 'Lab 2',
        category: 'Competition',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      },
      {
        title: 'Technical Quiz',
        description: 'A quiz covering programming fundamentals, computer science concepts, and recent technologies.',
        date: null,
        location: 'Seminar Hall',
        category: 'Competition',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
      },
      
      // Workshops
      {
        title: 'Beginner to Career',
        description: 'Roadmap from basic programming skills to career readiness.',
        date: null,
        location: 'Auditorium',
        category: 'Workshop',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
      },
      {
        title: 'AI Tools (3 Sessions)',
        description: 'Hands-on sessions on modern AI tools and their real-world applications.',
        date: null,
        location: 'Computer Lab',
        category: 'Workshop',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
      },
      {
        title: 'Git & GitHub',
        description: 'Version control, collaboration, and open-source contribution basics.',
        date: null,
        location: 'Lab 1',
        category: 'Workshop',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop',
      },
      {
        title: 'Resume Building',
        description: 'Creating ATS-friendly resumes and professional portfolios.',
        date: null,
        location: 'Seminar Hall',
        category: 'Workshop',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
      },
      {
        title: 'No-Code App Building',
        description: 'Building functional applications without traditional coding.',
        date: null,
        location: 'Innovation Hub',
        category: 'Workshop',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
      },
    ];

    await Event.insertMany(events);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
