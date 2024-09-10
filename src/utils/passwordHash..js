import crypto from 'crypto';

export const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');

    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    return  hash;
}