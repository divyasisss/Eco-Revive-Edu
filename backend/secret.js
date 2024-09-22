const crypto = require('crypto');
const fs = require('fs');

// Generate a secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Log the generated secret key
console.log('Generated Secret Key:', secretKey);

// Write the secret key to a .env file
const envContent = `SECRET_KEY=${secretKey}\n`;
fs.writeFileSync('.env', envContent);
console.log('Secret key written to .env file');

// Load and print the secret key from the .env file
require('dotenv').config();
const loadedSecretKey = process.env.SECRET_KEY;
console.log('Secret Key from .env:', loadedSecretKey);
