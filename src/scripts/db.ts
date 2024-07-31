import mongoose from "mongoose";

// 환경 변수 확인
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

// 글로벌 환경 변수 설정
let cached = global as typeof globalThis & {
  mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // 캐시된 연결 확인
  if (cached.mongoose!.conn) {
    console.log("Already connected to MongoDB");
    return cached.mongoose!.conn;
  }

  if (!cached.mongoose!.promise) {
    cached.mongoose!.promise = mongoose.connect(uri).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.mongoose!.conn = await cached.mongoose!.promise;
    console.log("MongoDB Connected");
    return cached.mongoose!.conn;
  } catch (error) {
    cached.mongoose!.promise = null;
    console.error(`MongoDB Error: ${error}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  console.log("Disconnecting MongoDB");
  if (cached.mongoose!.conn) {
    await mongoose.disconnect();
    cached.mongoose!.conn = null;
    cached.mongoose!.promise = null;
    console.log("MongoDB Disconnected");
  }
};

export { connectDB, disconnectDB };
