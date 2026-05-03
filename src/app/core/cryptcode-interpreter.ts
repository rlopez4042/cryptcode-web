import { decryptProgram } from './cryptcode-encryption';

export type CryptCodeRunResult = {
  output: string[];
  errors: string[];
  variables: Record<string, number>;
  decryptedSource?: string;
};

export function runCryptCodeSource(source: string): CryptCodeRunResult {
  const variables: Record<string, number> = {};
  const output: string[] = [];
  const errors: string[] = [];

  try {
    const lines = source.split('\n');
    executeLines(lines, variables, output, 0);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }

  return {
    output,
    errors,
    variables,
  };
}

export function runCryptCodeCrypt(cryptText: string): CryptCodeRunResult {
  const variables: Record<string, number> = {};
  const output: string[] = [];
  const errors: string[] = [];

  try {
    const decryptedProgram = decryptProgram(cryptText);
    executeLines(decryptedProgram.decryptedLines, variables, output, 0);

    return {
      output,
      errors,
      variables,
      decryptedSource: decryptedProgram.decryptedSource,
    };
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));

    return {
      output,
      errors,
      variables,
    };
  }
}

function executeLines(
  lines: string[],
  variables: Record<string, number>,
  output: string[],
  lineOffset: number = 0,
): void {
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    const currentLineNumber = lineOffset + i + 1;

    try {
      if (line === '') {
        i++;
        continue;
      }

      if (line.startsWith('print ')) {
        const message = line.slice('print '.length);

        if (message in variables) {
          output.push(String(variables[message]));
        } else {
          output.push(message);
        }

        i++;
        continue;
      }

      if (line.startsWith('set ')) {
        const parts = line.split(/\s+/);

        if (parts.length < 4 || parts[2] !== 'to') {
          throw new Error(`Invalid set syntax: ${line}`);
        }

        const variableName = parts[1];
        const expression = parts.slice(3).join(' ');

        variables[variableName] = evalExpression(expression, variables);

        i++;
        continue;
      }

      if (line.startsWith('count ')) {
        const parts = line.split(/\s+/);

        if (parts.length !== 6 || parts[2] !== 'from' || parts[4] !== 'to') {
          throw new Error(`Invalid count syntax: ${line}`);
        }

        const variableName = parts[1];
        const start = Number.parseInt(parts[3], 10);
        const end = Number.parseInt(parts[5], 10);

        if (Number.isNaN(start) || Number.isNaN(end)) {
          throw new Error(`Invalid count range: ${line}`);
        }

        const blockStart = i + 1;
        const blockEnd = findMatchingEnd(lines, blockStart);
        const block = lines.slice(blockStart, blockEnd);

        for (let value = start; value <= end; value++) {
          variables[variableName] = value;
          executeLines(block, variables, output, lineOffset + blockStart);
        }

        i = blockEnd + 1;
        continue;
      }

      if (line.startsWith('repeat ')) {
        const parts = line.split(/\s+/);

        if (parts.length !== 2) {
          throw new Error(`Invalid repeat syntax: ${line}`);
        }

        const repeatCount = getValue(parts[1], variables);

        const blockStart = i + 1;
        const blockEnd = findMatchingEnd(lines, blockStart);
        const block = lines.slice(blockStart, blockEnd);

        for (let repeatIndex = 0; repeatIndex < repeatCount; repeatIndex++) {
          executeLines(block, variables, output, lineOffset + blockStart);
        }

        i = blockEnd + 1;
        continue;
      }

      if (line.startsWith('fizzbuzz ')) {
        const parts = line.split(/\s+/);

        if (parts.length !== 4 || parts[2] !== 'to') {
          throw new Error(`Invalid fizzbuzz syntax: ${line}`);
        }

        const start = Number.parseInt(parts[1], 10);
        const end = Number.parseInt(parts[3], 10);

        if (Number.isNaN(start) || Number.isNaN(end)) {
          throw new Error(`Invalid fizzbuzz range: ${line}`);
        }

        for (let number = start; number <= end; number++) {
          if (number % 15 === 0) {
            output.push('FizzBuzz');
          } else if (number % 3 === 0) {
            output.push('Fizz');
          } else if (number % 5 === 0) {
            output.push('Buzz');
          } else {
            output.push(String(number));
          }
        }

        i++;
        continue;
      }

      if (line.startsWith('when ')) {
        i = executeWhenChain(lines, i, variables, output, lineOffset);
        continue;
      }

      if (line === 'end') {
        i++;
        continue;
      }

      throw new Error(`Unknown CryptCode command: ${line}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      if (message.startsWith('Line ')) {
        throw error;
      }

      throw new Error(`Line ${currentLineNumber}: ${message}`);
    }
  }
}

function findMatchingEnd(lines: string[], startIndex: number): number {
  let depth = 0;

  for (let index = startIndex; index < lines.length; index++) {
    const line = lines[index].trim();

    if (line.startsWith('count ') || line.startsWith('repeat ') || line.startsWith('when ')) {
      depth++;
    } else if (line === 'end') {
      if (depth === 0) {
        return index;
      }

      depth--;
    }
  }

  throw new Error("Missing 'end'.");
}

function getValue(token: string, variables: Record<string, number>): number {
  if (token in variables) {
    return variables[token];
  }

  const value = Number.parseInt(token, 10);

  if (Number.isNaN(value)) {
    throw new Error(`Invalid value: ${token}`);
  }

  return value;
}

function evalExpression(expression: string, variables: Record<string, number>): number {
  const parts = expression.split(/\s+/);

  if (parts.length === 1) {
    return getValue(parts[0], variables);
  }

  if (parts.length === 3) {
    const left = getValue(parts[0], variables);
    const operator = parts[1];
    const right = getValue(parts[2], variables);

    if (operator === '+') {
      return left + right;
    }

    if (operator === '-') {
      return left - right;
    }

    if (operator === '*') {
      return left * right;
    }

    if (operator === '/') {
      return Math.trunc(left / right);
    }

    if (operator === 'mod') {
      return left % right;
    }

    throw new Error(`Unknown operator: ${operator}`);
  }

  throw new Error(`Invalid expression: ${expression}`);
}

function conditionIsTrue(line: string, variables: Record<string, number>): boolean {
  const parts = line.split(/\s+/);

  if (parts.length === 4 && parts[2] === 'is') {
    const left = getValue(parts[1], variables);
    const right = getValue(parts[3], variables);

    return left === right;
  }

  if (parts.length === 5 && parts[2] === 'is' && parts[3] === 'not') {
    const left = getValue(parts[1], variables);
    const right = getValue(parts[4], variables);

    return left !== right;
  }

  if (parts.length === 4 && parts[2] === 'greater') {
    const left = getValue(parts[1], variables);
    const right = getValue(parts[3], variables);

    return left > right;
  }

  if (parts.length === 4 && parts[2] === 'less') {
    const left = getValue(parts[1], variables);
    const right = getValue(parts[3], variables);

    return left < right;
  }

  if (parts.length === 6 && parts[2] === 'mod' && parts[4] === 'is') {
    const left = getValue(parts[1], variables);
    const divisor = getValue(parts[3], variables);
    const expected = getValue(parts[5], variables);

    return left % divisor === expected;
  }

  throw new Error(`Invalid when condition: ${line}`);
}

function executeWhenChain(
  lines: string[],
  startIndex: number,
  variables: Record<string, number>,
  output: string[],
  lineOffset: number = 0,
): number {
  const branches: {
    condition: string;
    block: string[];
    blockStart: number;
  }[] = [];

  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.startsWith('when ')) {
      const condition = line;
      const blockStart = i + 1;
      i++;

      while (i < lines.length) {
        const nextLine = lines[i].trim();

        if (nextLine.startsWith('when ') || nextLine === 'else' || nextLine === 'end') {
          break;
        }

        i++;
      }

      branches.push({
        condition,
        block: lines.slice(blockStart, i),
        blockStart,
      });

      continue;
    }

    if (line === 'else') {
      const blockStart = i + 1;
      i++;

      while (i < lines.length && lines[i].trim() !== 'end') {
        i++;
      }

      branches.push({
        condition: 'else',
        block: lines.slice(blockStart, i),
        blockStart,
      });

      continue;
    }

    if (line === 'end') {
      break;
    }

    break;
  }

  for (const branch of branches) {
    if (branch.condition === 'else' || conditionIsTrue(branch.condition, variables)) {
      executeLines(branch.block, variables, output, lineOffset + branch.blockStart);
      break;
    }
  }

  return i;
}
