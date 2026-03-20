// import bcrypt from "bcryptjs";

// const password = "123456";

// const hash1 = await bcrypt.hash(password, 10);
// console.log(hash1);

// // const hash2 = await bcrypt.hash(password, 10);
// // console.log(hash2);

// const ok = await bcrypt.compare(password, hash1);
// const fail = await bcrypt.compare("1234", hash1);

// console.log(ok);
// console.log(fail);

// ---

// import dotenv from "dotenv";
// dotenv.config();

import { config } from "dotenv";
config();

import jwt from "jsonwebtoken";

// const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, {
//   expiresIn: process.env.JWT_EXPIRES_IN,
// });

// console.log(token);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YmM0YjhkNjBhNzhhYTcxMTQ4NjdhYSIsImVtYWlsIjoidGVzdEBleGFtcGxlLm5ldCIsImlhdCI6MTc3Mzk0NzgwNCwiZXhwIjoxNzczOTUxNDA0fQ.18ty5RFhviKc38V0xRNcwWcK4w3GZgcLvABbC1gIXGI";

try {
  const isVerify = jwt.verify(token, process.env.JWT_SECRET);
  console.log(isVerify);

  const decoded = jwt.decode(token);
  console.log(decoded);

} catch (error) {
  console.log(error);
}
