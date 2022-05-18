rm -rf pg-data
cd frontend
npm install
cd ../backend
npm install
cd ..
npm run docker:up
cd backend
npm run db:reset
cd ..
