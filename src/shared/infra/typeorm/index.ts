import { Connection, createConnection, getConnectionOptions } from "typeorm"

export default async (host = "database_postgress"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database_postgress: process.env.NODE_ENV === "test" ? "base_test" : defaultOptions.database
    })
  )
}