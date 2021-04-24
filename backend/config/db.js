import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB connected: ${conn.connection.host}`.brightMagenta.bold.italic
        .underline
    );
  } catch (err) {
    console.error(`Error: ${err}`.bgRed.white.bold.italic.underline);
    process.exit(1);
  }
};

export default connectDB;
