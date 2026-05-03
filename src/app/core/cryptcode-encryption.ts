export const PUBLIC_KEY = 3;
export const PRIVATE_KEY = 23;

export type CryptCodeAlgorithmKey = '1' | '2' | '3';

export type EncryptProgramResult = {
  cryptText: string;
  keys: CryptCodeAlgorithmKey[];
};

export type DecryptProgramResult = {
  decryptedSource: string;
  decryptedLines: string[];
};

export function caesarEncrypt(text: string, shift: number = PUBLIC_KEY): string {
  let result = '';

  for (const char of text) {
    if (char >= 'a' && char <= 'z') {
      result += String.fromCharCode(
        ((char.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % 26) + 'a'.charCodeAt(0),
      );
    } else if (char >= 'A' && char <= 'Z') {
      result += String.fromCharCode(
        ((char.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % 26) + 'A'.charCodeAt(0),
      );
    } else {
      result += char;
    }
  }

  return result;
}

export function caesarDecrypt(text: string, shift: number = PRIVATE_KEY): string {
  let result = '';

  for (const char of text) {
    if (char >= 'a' && char <= 'z') {
      result += String.fromCharCode(
        ((char.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % 26) + 'a'.charCodeAt(0),
      );
    } else if (char >= 'A' && char <= 'Z') {
      result += String.fromCharCode(
        ((char.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % 26) + 'A'.charCodeAt(0),
      );
    } else {
      result += char;
    }
  }

  return result;
}

export function reverseEncrypt(line: string): string {
  return line.split('').reverse().join('');
}

export function reverseDecrypt(line: string): string {
  return line.split('').reverse().join('');
}

export function addxEncrypt(text: string): string {
  let result = '';

  for (const char of text) {
    result += char + 'x';
  }

  return result;
}

export function addxDecrypt(text: string): string {
  return text.replaceAll('x', '');
}

export function validateKeyPair(
  publicKey: number = PUBLIC_KEY,
  privateKey: number = PRIVATE_KEY,
): void {
  if (publicKey === privateKey) {
    throw new Error('Public and private keys must be different.');
  }

  if ((publicKey + privateKey) % 26 !== 0) {
    throw new Error('Invalid key pair. For Caesar, public key + private key must equal 26.');
  }
}

export function encryptLine(line: string, key: CryptCodeAlgorithmKey): string {
  if (key === '1') {
    return caesarEncrypt(line);
  }

  if (key === '2') {
    return reverseEncrypt(line);
  }

  if (key === '3') {
    return addxEncrypt(line);
  }

  throw new Error(`Unknown encryptor key: ${key}`);
}

export function decryptLine(line: string, key: CryptCodeAlgorithmKey): string {
  if (key === '1') {
    return caesarDecrypt(line);
  }

  if (key === '2') {
    return reverseDecrypt(line);
  }

  if (key === '3') {
    return addxDecrypt(line);
  }

  throw new Error(`Unknown decryptor key: ${key}`);
}

export function encryptProgram(
  source: string,
  requestedKeys: CryptCodeAlgorithmKey[],
): EncryptProgramResult {
  validateKeyPair();

  const plainLines = source.split('\n');
  const codeLines = plainLines.filter((line) => line.trim() !== '');

  const keys =
    requestedKeys.length === 1 ? Array(codeLines.length).fill(requestedKeys[0]) : requestedKeys;

  if (keys.length !== codeLines.length) {
    throw new Error('Number of keys must match number of non-empty code lines.');
  }

  const encryptedLines: string[] = [];
  let keyIndex = 0;

  for (const line of plainLines) {
    if (line.trim() === '') {
      encryptedLines.push('');
      continue;
    }

    const key = keys[keyIndex];
    encryptedLines.push(encryptLine(line, key));
    keyIndex++;
  }

  return {
    keys,
    cryptText: `Key: ${keys.join(' ')}\n\n${encryptedLines.join('\n')}`,
  };
}

export function decryptProgram(cryptText: string): DecryptProgramResult {
  validateKeyPair();

  const allLines = cryptText.split('\n');

  if (allLines.length === 0 || !allLines[0].startsWith('Key:')) {
    throw new Error("CryptCode programs must start with 'Key:'");
  }

  const keys = allLines[0]
    .replace('Key:', '')
    .trim()
    .split(/\s+/)
    .filter(Boolean) as CryptCodeAlgorithmKey[];

  const encryptedLines = allLines.slice(1);
  const encryptedCodeLines = encryptedLines.filter((line) => line.trim() !== '');

  if (keys.length !== encryptedCodeLines.length) {
    throw new Error('Number of keys must match number of non-empty encrypted lines.');
  }

  const decryptedLines: string[] = [];
  let keyIndex = 0;

  for (const line of encryptedLines) {
    if (line.trim() === '') {
      decryptedLines.push('');
      continue;
    }

    const key = keys[keyIndex];

    if (!isValidAlgorithmKey(key)) {
      throw new Error(`Unknown decryptor key: ${key}`);
    }

    decryptedLines.push(decryptLine(line, key));
    keyIndex++;
  }

  return {
    decryptedLines,
    decryptedSource: decryptedLines.join('\n').trim(),
  };
}

function isValidAlgorithmKey(key: string): key is CryptCodeAlgorithmKey {
  return key === '1' || key === '2' || key === '3';
}
