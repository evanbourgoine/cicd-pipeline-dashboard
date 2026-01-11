const bcrypt = require('bcryptjs');

const password = 'password123';
const hash = bcrypt.hashSync(password, 10);

console.log('Hashed password:', hash);
console.log('\nCopy this hash into your auth.js file');