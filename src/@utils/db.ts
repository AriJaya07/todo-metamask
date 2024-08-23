import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Constrain T to be an array with RowDataPacket[] or an array of other valid MySQL response types
export async function query<
  T extends
    | mysql.RowDataPacket[]
    | mysql.OkPacket
    | mysql.ResultSetHeader
    | mysql.RowDataPacket[][]
    | mysql.OkPacket[]
>(sql: string, values?: any[]): Promise<T> {
  const [rows] = await pool.execute<T>(sql, values);
  return rows;
}
