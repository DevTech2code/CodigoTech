import { Response } from 'express';
export declare const encryptToken: (plain: string) => string;
export declare const decryptToken: (cipherText: string) => string;
export declare const setAuthCookie: (res: Response, token: string) => void;
export declare const clearAuthCookie: (res: Response) => void;
