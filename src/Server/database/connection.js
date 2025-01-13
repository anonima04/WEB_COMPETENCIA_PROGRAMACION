import sql from "mssql";
const dbSettings = {
  user: "sa",
  password: "danna1234",
  server: "LAPTOP-0EQV7TAC\\SQLEXPRESS",
  database: "DB_PROGRAMACION_COMPETITIVA",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    connectTimeout: 30000,  // Tiempo de espera extendido
    requestTimeout: 30000,
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);

    const result = pool.request().query("SELECT GETDATE() AS currentDate");
    console.log((await result).recordset);
    return pool;
  } catch (error) {
    console.log(error);
  }
};
