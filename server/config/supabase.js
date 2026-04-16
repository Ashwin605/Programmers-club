import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables.');
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder_key');

// Test the connection immediately on startup
const testConnection = async () => {
  if (!supabaseUrl || !supabaseKey) return;
  
  try {
    const { data, error } = await supabase.from('users').select('id').limit(1);
    if (error) {
      console.error('❌ Supabase Connection Failed: ', error.message);
    } else {
      console.log('✅ Supabase Connected Successfully!');
    }
  } catch (err) {
    console.error('❌ Supabase Connection Error: ', err.message);
  }
};

testConnection();
