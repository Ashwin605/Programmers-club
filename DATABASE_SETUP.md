# Database Setup Guide

It appears that **MongoDB** is not running on your local machine. You have two easy options to fix this:

## Option 1: Use MongoDB Atlas (Cloud) - **Recommended**

This is the easiest method and allows your database to work from anywhere.

1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up for a free account.
2.  Create a new **Cluster** (select the free tier).
3.  In the "Database Access" tab, create a database user (username and password).
4.  In the "Network Access" tab, allow access from anywhere (IP: `0.0.0.0/0`).
5.  Click **Connect** -> **Connect your application**.
6.  Copy the connection string (it looks like `mongodb+srv://<username>:<password>@cluster0.mongodb.net/...`).
7.  Update your `server/.env` file:
    ```env
    MONGO_URI=your_copied_connection_string_here
    ```

## Option 2: Install MongoDB Locally

If you prefer to run it offline on your computer:

1.  Download **MongoDB Community Server** from [here](https://www.mongodb.com/try/download/community).
2.  Run the installer. **Important:** In the setup, check the box **"Install MongoDB as a Service"**.
3.  Once installed, the service should start automatically.
4.  Your current `.env` configuration (`mongodb://127.0.0.1:27017/programmers-club`) should then work immediately.

## Troubleshooting

If you have installed it but it's not working:

- Open Windows **Services** (Win+R -> `services.msc`).
- Look for "MongoDB Server".
- Right-click and select **Start**.
