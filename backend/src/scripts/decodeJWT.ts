import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

if (process.argv.length <= 1) {
    console.error('Missing token parameter');
    process.exit(1);
}

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in the environment variables.');
    process.exit(1);
}

const FgGray = "\x1b[90m"
const FgGreen = "\x1b[32m"
const FgYellow = "\x1b[33m"
const FgBlue = "\x1b[34m"
const resetColor = "\x1b[0m"

const token = process.argv[2];
const [header, payload, signature] = token.split('.');

console.info(`${FgBlue}%s${resetColor}${FgGray}%s${resetColor}`, 'Encoded Header: ', header);
console.info(`${FgBlue}%s${resetColor}${FgGray}%s${resetColor}`, 'Decoded Header: ', Buffer.from(header, 'base64'));
console.info(`${FgBlue}%s${resetColor}${FgGray}%s${resetColor}`, 'Encoded Payload: ', payload);
console.info(`${FgBlue}%s${resetColor}${FgGray}%s${resetColor}`, 'Decoded Payload: ', Buffer.from(payload, 'base64'));
console.info(`${FgBlue}%s${resetColor}${FgGray}%s${resetColor}`, 'Signature: ', signature);
console.info(`${FgYellow}%s${resetColor}`, 'Verifying JWT...');

jwt.verify(token, process.env.JWT_SECRET || '', function(err, decoded) {
    if (err) {
        console.error(err.message);
        process.exit(1);
    }
    console.log(`${FgGreen}%s${resetColor}`, 'JWT Valid!')
    console.log(`${FgGreen}%s${resetColor}${FgBlue}%s${resetColor}`,'Verified Payload: ', decoded);
  });
