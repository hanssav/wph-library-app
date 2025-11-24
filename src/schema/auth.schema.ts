import { z } from 'zod';

export const RegisterRequestSchema = z.object({
  name: z.string().min(2, 'Name minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export const LoginRequestSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const UpdateProfileSchema = z.object({
  name: z.string().min(2, 'Name minimal 2 karakter'),
});

export type UpdateProfileReq = z.infer<typeof UpdateProfileSchema>;
