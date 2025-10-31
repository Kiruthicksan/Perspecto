import jwt from "jsonwebtoken";

export const genrateToken =  ( email : string ) => {
  return jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};
