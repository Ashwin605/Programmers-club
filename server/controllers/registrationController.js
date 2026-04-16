import { supabase } from '../config/supabase.js';

// @desc    Register for an event
// @route   POST /api/registrations
// @access  Public
export const createRegistration = async (req, res) => {
  try {
    const { name, email, phone, rollNumber, branch, year, section, event } = req.body;

    // Basic validation
    if (!name || !email || !event) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if already registered for this event
    const { data: existing } = await supabase
      .from('registrations')
      .select('id')
      .eq('email', email)
      .eq('event', event);
      
    if (existing && existing.length > 0) {
        return res.status(400).json({ message: 'You have already registered for this event' });
    }

    const { data: registration, error } = await supabase
      .from('registrations')
      .insert([{
        name,
        email,
        phone,
        rollNumber,
        branch,
        year,
        section,
        event,
        registeredAt: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all registrations
// @route   GET /api/registrations
// @access  Private/Admin
export const getRegistrations = async (req, res) => {
  try {
    const { data: registrations, error } = await supabase
      .from('registrations')
      .select('*');
      
    if (error) throw error;
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
