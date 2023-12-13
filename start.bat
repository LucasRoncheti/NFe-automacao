@echo off
start /min node robo.mjs 
start /min npm node express-server.js
start /min npm start
timeout /nobreak /t 1 >nul