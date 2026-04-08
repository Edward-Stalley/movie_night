import { Client } from 'pg';

let client: Client | null = null;

export async function getListenerClient() {
  if (client) return client;

  client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  return client;
}
