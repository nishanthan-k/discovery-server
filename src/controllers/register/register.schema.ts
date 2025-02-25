import { z } from 'zod';

export enum AccessType {
    PUBLIC = 'public',
    PRIVATE = 'private',
}

export enum RegisterStatus {
    UP = "UP",
    DOWN = "DOWN"
}

export const RegisterSchema = z.object({
    serviceName: z.string({ required_error: "Service name is required!" }).min(1, "Service name cannot be empty!"),
    host: z.string({ required_error: "Host must be provided!" }).min(1, "Host cannot be empty!"),
    port: z.string({ required_error: "Port is required!" }).min(1, "Port cannot be empty!"),
    access: z.enum(["public", "private"], { message: "Access must be either public or private!" }),
    type: z.string({ required_error: "Type must be provided!" }).min(1, "Type cannot be empty!"),
    lastHeartBeat: z.date().default(() => new Date()),
  });
