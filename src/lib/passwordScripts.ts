import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
    if (!password) {
        console.log("Password is missing");
        return null;
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
        console.log("Password or hashed password is missing");
        return false;
    }

    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};
