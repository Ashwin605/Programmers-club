import { supabase } from '../config/supabase.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const { data: events, error } = await supabase.from('events').select('*');
    if (error) throw error;
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
  try {
    const { data: event, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', req.params.id)
      .single();
      
    if (error) throw error;

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Event not found' });
  }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, image, maxParticipants } = req.body;

    const { data: createdEvent, error } = await supabase
      .from('events')
      .insert([{
        title,
        description,
        date,
        location,
        category,
        image,
        maxParticipants: maxParticipants ? Number(maxParticipants) : null,
      }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
export const updateEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, image } = req.body;

    const { data: updatedEvent, error } = await supabase
      .from('events')
      .update({
        title, description, date, location, category, image
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    if (updatedEvent) {
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Event not found' });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
export const deleteEvent = async (req, res) => {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
