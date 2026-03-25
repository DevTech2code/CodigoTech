"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookie = exports.setAuthCookie = exports.decryptToken = exports.encryptToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const DEFAULT_MAX_AGE = Number(process.env.AUTH_COOKIE_MAX_AGE ?? '') || (Number(process.env.AUTH_TOKEN_EXPIRES_DAYS ?? '365') * 24 * 60 * 60 * 1000);
const LONG_LIVED_MAX_AGE = 3650 * 24 * 60 * 60 * 1000;
function getKey() {
    const raw = process.env.COOKIE_ENCRYPTION_KEY ?? '';
    if (!raw)
        return null;
    if (/^[0-9a-fA-F]{64}$/.test(raw)) {
        return Buffer.from(raw, 'hex');
    }
    return crypto_1.default.createHash('sha256').update(raw).digest();
}
const encryptToken = (plain) => {
    const key = getKey();
    if (!key)
        return plain;
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv('aes-256-cbc', key, iv);
    const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
    return iv.toString('base64') + ':' + encrypted.toString('base64');
};
exports.encryptToken = encryptToken;
const decryptToken = (cipherText) => {
    const key = getKey();
    if (!key)
        return cipherText;
    const parts = cipherText.split(':');
    if (parts.length !== 2)
        throw new Error('Invalid encrypted token format');
    const iv = Buffer.from(parts[0], 'base64');
    const encrypted = Buffer.from(parts[1], 'base64');
    const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
};
exports.decryptToken = decryptToken;
const setAuthCookie = (res, token) => {
    const value = (0, exports.encryptToken)(token);
    const hasHttps = !!(process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH);
    const isProduction = process.env.NODE_ENV === 'production';
    const secureFlag = hasHttps || isProduction;
    const sameSiteVal = isProduction ? 'none' : 'lax';
    const configuredMax = Number(process.env.AUTH_COOKIE_MAX_AGE ?? DEFAULT_MAX_AGE);
    const effectiveMaxAge = Math.max(configuredMax || 0, LONG_LIVED_MAX_AGE);
    res.cookie('jwt', value, {
        httpOnly: true,
        secure: secureFlag,
        sameSite: sameSiteVal,
        maxAge: effectiveMaxAge,
        path: '/',
    });
};
exports.setAuthCookie = setAuthCookie;
const clearAuthCookie = (res) => {
    res.clearCookie('jwt');
};
exports.clearAuthCookie = clearAuthCookie;
//# sourceMappingURL=auth-cookie.helper.js.map