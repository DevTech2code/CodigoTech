import { SystemType } from '@prisma/client';
export declare class CreateCredentialDto {
    personId: number;
    username?: string;
    password?: string;
    system: SystemType;
    phone?: string;
    notes?: string;
}
