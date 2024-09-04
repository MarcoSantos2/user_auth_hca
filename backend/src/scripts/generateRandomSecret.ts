import crypto from 'crypto';

function generateSecret() {
  const secret = crypto.randomBytes(32).toString('hex');
  console.log('Your new JWT secret is:', secret);
}

generateSecret();
