import "dotenv/config";
import { connect, set } from "mongoose";

async function dbConnect(): Promise<void> {
  const {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_DATABASE,
    NODE_ENV,
    DB_DEV_HOST,
    DB_DEV_DATABASE,
  } = process.env;
  set("strictQuery", false);
  if (NODE_ENV === "PRODUCTION") {
    await connect(
      `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`
    );
  } else {
    await connect(`mongodb://${DB_DEV_HOST}/${DB_DEV_DATABASE}`);
  }
}

export default dbConnect;
