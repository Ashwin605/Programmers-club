import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';

const createAdminUser = async () => {
    try {
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

        // Check if admin already exists
        const existingAdmin = users.find(user => user.email === 'admin@vemu.com');
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        // Create admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const adminUser = {
            _id: Date.now().toString(),
            createdAt: new Date(),
            name: 'Admin User',
            email: 'admin@vemu.com',
            password: hashedPassword,
            role: 'admin'
        };

        users.push(adminUser);
        await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
        console.log('Admin user created successfully');
        console.log('Email: admin@vemu.com');
        console.log('Password: admin123');

    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

createAdminUser();