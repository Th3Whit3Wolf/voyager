#!/bin/bash
rm -rf pg-data
cd frontend
npm install
cd ../backend
npm install
cd ..
npm run docker:up
cd backend
yes | npm run db:reset
cd ..
open http://localhost:3000
