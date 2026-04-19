import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { supabase } from './config/supabase.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdminUser = async () => {
    try {
        // Admin credentials to use
        const ADMIN_EMAIL = 'ashwinsrichandra2008@gmail.com';
        const ADMIN_PASSWORD = 'ashwinsri@2008';
        const ADMIN_NAME = 'Ashwin Srichandra';

        // Check if admin already exists in Supabase
        const { data: existingAdmin, error: checkError } = await supabase
            .from('users')
            .select('id')
            .eq('email', ADMIN_EMAIL)
            .maybeSingle();

        if (checkError) {
            console.warn('Could not check Supabase for existing admin:', checkError.message);
        }

        if (existingAdmin) {
            // Update existing admin to ensure they have admin role
            const { error: updateError } = await supabase
                .from('users')
                .update({ role: 'admin' })
                .eq('email', ADMIN_EMAIL);

            if (updateError) {
                console.warn('Could not update admin role in Supabase:', updateError.message);
            } else {
                console.log('Admin user role updated in Supabase');
            }
        } else {
            // Create new admin user in Supabase
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

            const { error: insertError } = await supabase
                .from('users')
                .insert([{
                    name: ADMIN_NAME,
                    email: ADMIN_EMAIL,
                    password: hashedPassword,
                    role: 'admin'
                }]);

            if (insertError) {
                console.warn('Could not create admin in Supabase:', insertError.message);
            } else {
                console.log('✅ Admin user created in Supabase');
            }
        }

        // Also update local JSON database for fallback
        const usersPath = path.join(process.cwd(), 'data', 'users.json');

        // Read existing users
        let users = [];
        try {
            const data = await fs.readFile(usersPath, 'utf-8');
            users = JSON.parse(data);
        } catch (error) {
            // File doesn't exist or is empty
            users = [];
        }

        // Check if admin already exists locally
        const existingLocalAdmin = users.find(user => user.email === ADMIN_EMAIL);
        if (existingLocalAdmin) {
            // Update existing admin
            existingLocalAdmin.role = 'admin';
        } else {
            // Create new admin user locally
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

            const adminUser = {
                _id: Date.now().toString(),
                createdAt: new Date(),
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: hashedPassword,
                role: 'admin'
            };

            users.push(adminUser);
        }

        await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
        console.log('✅ Admin user setup completed');
        console.log('Email: ' + ADMIN_EMAIL);
        console.log('Password: ' + ADMIN_PASSWORD);

    } catch (error) {
        console.error('❌ Error creating admin user:', error);
    }
};

createAdminUser();