import bcrypt from "bcryptjs";

/**
 * Hash the provided string password
 * @param password 
 * @param salt 
 * @returns string data
 */
export async function hashPassword(password: string, salt: number = 13) {
  return bcrypt.hash(password, salt);
}

/**
 * Validate if a plain password matches the hashed password
 * @param password - Plain text password
 * @param hashedPassword - Hashed password stored in DB
 * @returns true if passwords match, false otherwise
 */
export async function validatePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
