import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, {
        message: "Company name must be at least 2 characters.",
    }),
    email: z
        .string()
        .email({
            message: "Invalid email address.",
        })
        .min(1),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." })
        .refine((value) => /[a-zA-Z]/.test(value), {
            message: "Password must contain at least one letter.",
        })
        .refine((value) => /[0-9]/.test(value), {
            message: "Password must contain at least one number.",
        }),
    password_confirmation: z.string(),
});