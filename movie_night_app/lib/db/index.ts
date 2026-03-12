import mysql from "mysql2/promise";

declare global {
  var mysqlPool: mysql.Pool | undefined;
}
export const pool =
  global.mysqlPool ??
  mysql.createPool({
    host: process.env.DB_HOST || "db",
    user: process.env.DB_USER || "devuser",
    password: process.env.DB_PASSWORD || "devpassword",
    database: process.env.DB_NAME || "movie_night",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

if (process.env.NODE_ENV !== "production") {
  global.mysqlPool = pool;
}
