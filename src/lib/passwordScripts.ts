import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
    if (!password) {
        throw new Error("Password is required");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const comparePassword = async (
    password: string,
    hashedPassword: string | null
) => {
    if (!password || !hashedPassword) {
        throw new Error("Password and hashed password are required");
    }

    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};
