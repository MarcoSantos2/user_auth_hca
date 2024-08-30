import crypto from 'crypto';

console.log('Random strong secret:', crypto.randomBytes(32).toString('base64'));
