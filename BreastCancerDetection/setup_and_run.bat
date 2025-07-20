@echo off
echo Setting up database and history records...

cd server
echo Installing npm dependencies...
npm install

echo Seeding the database with sample user data and history records...
npm run seed

echo Starting the server...
start npm run dev

cd ../frontend
echo Installing frontend dependencies...
npm install

echo Starting the frontend application...
start npm run dev

echo Setup complete! The application is now running.
echo Visit http://localhost:5173 in your browser to access the application.
echo Login with:
echo   Username: user1
echo   Password: password
