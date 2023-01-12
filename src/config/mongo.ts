import 'dotenv/config';
import { connect } from 'mongoose';

async function dbConnect(): Promise<void> {
  const { DB_HOST, DB_USER, DB_PASS, DB_DATABASE } = process.env;
  await connect(
    `mongodb://${DB_HOST}/${DB_DATABASE}`
    // `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`
  );
}

export default dbConnect;
