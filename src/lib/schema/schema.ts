import { z } from "zod";

const CredentialSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export { CredentialSchema };
