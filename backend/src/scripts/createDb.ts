import { dataSourceOptions } from '../datasource';
import mysql from 'mysql2/promise';

async function createDatabaseIfNotExists() {
  const dbName = dataSourceOptions.database as string;

  // Create a connection to the MySQL server (not the database itself)
  const connection = await mysql.createConnection({
    host: dataSourceOptions.host,
    port: dataSourceOptions.port,
    user: dataSourceOptions.username,
    password: dataSourceOptions.password,
    multipleStatements: true,
  });

  // Check if the database exists
  const [rows] = await connection.query(`SHOW DATABASES LIKE '${dbName}'`);
  
  if (Array.isArray(rows) && rows.length === 0) {
    await connection.query(`CREATE DATABASE \`${dbName}\`;`);
    console.log(`Database ${dbName} created successfully.`);
    console.log(`\n      \\////\n     /     \\\n   <| ô   ô |>\n    |   ^   |\n     \\ \\_/ /\n      \\___/\n\nYou can Smile now!`);
  } else {
    console.log(`Database ${dbName} already exists.`);
  }

  connection.end();
}

async function main() {
  await createDatabaseIfNotExists();
}

main().catch(console.error);
