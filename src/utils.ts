/**
 * Get current timestanp
 */
export function currentTimestamp(): string{
  return String(Date.parse(new Date().toString()) / 1000);
}

/**
 * 生成隨機數
 * @param n 位數
 */
export function generateNonce(length: number): string{
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}