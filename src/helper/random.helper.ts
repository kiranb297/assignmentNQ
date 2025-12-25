export function randomString(type: 'alphabets' | 'alphanumeric' | 'numeric', length: number): string {
    if (!Number.isInteger(length) || length < 0) throw new Error('length must be a non-negative integer');

    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const chars = type === 'alphabets' ? alpha : type === 'numeric' ? digits : alpha + digits;

    let outString = '';
    for (let i = 0; i < length; i++) {
        outString += chars[Math.floor(Math.random() * chars.length)];
    }
    return outString;
}