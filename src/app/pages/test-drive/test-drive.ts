import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { encryptProgram } from '../../core/cryptcode-encryption';
import { runCryptCodeCrypt } from '../../core/cryptcode-interpreter';

type EncryptionMode = 'caesar' | 'reverse' | 'addx' | 'mixed';

@Component({
  selector: 'app-test-drive',
  imports: [FormsModule],
  templateUrl: './test-drive.html',
  styleUrl: './test-drive.scss',
})
export class TestDrive {
  private readonly defaultSourceCode = `set total to 0
count i from 1 to 5
  set total to total + i
end
print total`;

  sourceCode = this.defaultSourceCode;

  encryptedCode = 'Click Encrypt & Run to generate a .crypt file.';

  runOutput = 'Click Encrypt & Run to see the interpreter output.';

  decryptedSource = '';

  selectedEncryptionMode: EncryptionMode = 'caesar';

  encryptionModes: { id: EncryptionMode; label: string; description: string }[] = [
    {
      id: 'caesar',
      label: 'Caesar',
      description: 'shifts letters with a key',
    },
    {
      id: 'reverse',
      label: 'Reverse',
      description: 'reverses every line',
    },
    {
      id: 'addx',
      label: 'AddX',
      description: 'adds x after each character',
    },
    {
      id: 'mixed',
      label: 'Mixed',
      description: 'cycles through all methods',
    },
  ];

  encryptSource(): void {
    try {
      const encrypted = encryptProgram(this.sourceCode, this.getEncryptionKeys());

      this.encryptedCode = encrypted.cryptText;
      this.decryptedSource = '';

      this.runEncrypted();
    } catch (error) {
      const message = this.formatError(error);

      this.encryptedCode = message;
      this.runOutput = message;
      this.decryptedSource = '';
    }
  }

  selectEncryptionMode(mode: EncryptionMode): void {
    this.selectedEncryptionMode = mode;
  }

  private getEncryptionKeys(): ('1' | '2' | '3')[] {
    if (this.selectedEncryptionMode === 'caesar') {
      return ['1'];
    }

    if (this.selectedEncryptionMode === 'reverse') {
      return ['2'];
    }

    if (this.selectedEncryptionMode === 'addx') {
      return ['3'];
    }

    return this.buildMixedKeys();
  }

  private buildMixedKeys(): ('1' | '2' | '3')[] {
    const nonEmptyLineCount = this.sourceCode
      .split('\n')
      .filter((line) => line.trim() !== '').length;

    const pattern: ('1' | '2' | '3')[] = ['1', '2', '3'];
    const keys: ('1' | '2' | '3')[] = [];

    for (let i = 0; i < nonEmptyLineCount; i++) {
      keys.push(pattern[i % pattern.length]);
    }

    return keys;
  }

  runEncrypted(): void {
    if (!this.encryptedCode.trim()) {
      this.runOutput = 'Encrypt the .ccode file before running it.';
      return;
    }

    const result = runCryptCodeCrypt(this.encryptedCode);

    this.runOutput = result.errors.length ? result.errors.join('\n') : result.output.join('\n');

    this.decryptedSource = result.decryptedSource ?? '';
  }

  resetExample(): void {
    this.sourceCode = this.defaultSourceCode;
    this.encryptedCode = 'Click Encrypt & Run to generate a .crypt file.';
    this.runOutput = 'Click Encrypt & Run to see the interpreter output.';
    this.decryptedSource = '';
  }

  private formatError(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}