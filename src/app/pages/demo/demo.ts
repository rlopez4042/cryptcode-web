import { Component } from '@angular/core';

type DemoExampleId = 'fizzbuzz' | 'complex' | 'simple';
type DemoView = 'ccode' | 'crypt' | 'output';
type EncryptionMethod = 'caesar' | 'reverse' | 'addx' | 'mixed';

type DemoExample = {
  id: DemoExampleId;
  label: string;
  title: string;
  ccode: string;
  crypt: Record<EncryptionMethod, string>;
  output: string;
  fileExplanation: string;
  outputExplanation: string;
};

@Component({
  selector: 'app-demo',
  imports: [],
  templateUrl: './demo.html',
  styleUrl: './demo.scss',
})
export class Demo {
  selectedExampleId: DemoExampleId = 'fizzbuzz';
  selectedView: DemoView = 'ccode';
  selectedEncryption: EncryptionMethod = 'caesar';

  encryptionMethods: { id: EncryptionMethod; label: string }[] = [
    { id: 'caesar', label: 'Caesar' },
    { id: 'reverse', label: 'Reverse' },
    { id: 'addx', label: 'AddX' },
    { id: 'mixed', label: 'Mixed' },
  ];

  examples: DemoExample[] = [
    {
      id: 'fizzbuzz',
      label: 'FizzBuzz',
      title: 'FizzBuzz command',
      ccode: `fizzbuzz 1 to 30`,
      crypt: {
        caesar: `Key: 1
svmmohmm 1 gb 30`,
        reverse: `Key: 2
03 ot 1 zzubzzif`,
        addx: `Key: 3
fxixzxzxbxuxzxzx x1x xtxox x3x0x`,
        mixed: `Key: 1
svmmohmm 1 gb 30`,
      },
      output: `1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
Buzz
Fizz
22
23
Fizz
Buzz
26
Fizz
28
29
FizzBuzz`,
      fileExplanation:
        'This example uses the built-in FizzBuzz command. It keeps the source short while still showing how CryptCode can run a recognizable programming exercise.',
      outputExplanation:
        'The interpreter counts from 1 to 30, replacing multiples of 3 with Fizz, multiples of 5 with Buzz, and multiples of both with FizzBuzz.',
    },
    {
      id: 'complex',
      label: 'Loop Logic',
      title: 'Loop with conditions',
      ccode: `set total to 0
count i from 1 to 6
set total to total + i
when i mod 2 is 0
print even
else
print odd
end
when i mod 3 is 0
print multiple of three
end
end
print total`,
      crypt: {
        caesar: `Key: 1 1 1 1 1 1 1 1 1 1 1 1 1
frg gbgny gb 0
pbhag v sebz 1 gb 6
frg gbgny gb gbgny + v
jura v zbq 2 vf 0
cevag rira
ryfr
cevag bqq
raq
jura v zbq 3 vf 0
cevag zhygvcyr bs guerr
raq
raq
cevag gbgny`,
        reverse: `Key: 2 2 2 2 2 2 2 2 2 2 2 2 2
0 ot latot tes
6 ot 1 morf i tnuoc
i + latot ot latot tes
0 si 2 dom i nehw
neve tnirp
esle
ddo tnirp
dne
0 si 3 dom i nehw
eerht fo elpitlum tnirp
dne
dne
latot tnirp`,
        addx: `Key: 3 3 3 3 3 3 3 3 3 3 3 3 3
sxextx xtxoxtxaxlx xtxox x0x
cxoxuxnxtx xix xfxrxoxmx x1x xtxox x6x
sxextx xtxoxtxaxlx xtxox xtxoxtxaxlx x+x xix
wxhxexnx xix xmxoxdx x2x xixsx x0x
pxrxixnxtx xexvxexnx
exlxsxex
pxrxixnxtx xoxdxdx
exnxdx
wxhxexnx xix xmxoxdx x3x xixsx x0x
pxrxixnxtx xmxuxlxtxixpxlxex xoxfx xtxhxrxexex
exnxdx
exnxdx
pxrxixnxtx xtxoxtxaxlx`,
        mixed: `Key: 1 2 3 1 2 3 1 2 3 1 2 3 1
frg gbgny gb 0
6 ot 1 morf i tnuoc
sxextx xtxoxtxaxlx xtxox xtxoxtxaxlx x+x xix
jura v zbq 2 vf 0
neve tnirp
exlxsxex
cevag bqq
dne
wxhxexnx xix xmxoxdx x3x xixsx x0x
cevag zhygvcyr bs guerr
dne
exnxdx
cevag gbgny`,
      },
      output: `odd
even
odd
multiple of three
even
odd
even
multiple of three
21`,
      fileExplanation:
        'This example shows the larger language flow: a variable, a count loop, math, conditions, else branches, and explicit end statements.',
      outputExplanation:
        'The program counts from 1 to 6, prints whether each number is odd or even, marks multiples of 3, keeps a running total, and prints 21 at the end.',
    },
    {
      id: 'simple',
      label: 'Variables',
      title: 'Variables and repeat',
      ccode: `print Welcome to CryptCode
set score to 10
print score
set score to score + 5
print score
repeat 3
print loop
end
print done`,
      crypt: {
        caesar: `Key: 1 1 1 1 1 1 1 1 1
cevag Jrypbzr gb PelcgPbqr
frg fpber gb 10
cevag fpber
frg fpber gb fpber + 5
cevag fpber
ercrng 3
cevag ybbc
raq
cevag qbar`,
        reverse: `Key: 2 2 2 2 2 2 2 2 2
edoCtpyrC ot emocleW tnirp
01 ot erocs tes
erocs tnirp
5 + erocs ot erocs tes
erocs tnirp
3 taeper
pool tnirp
dne
enod tnirp`,
        addx: `Key: 3 3 3 3 3 3 3 3 3
pxrxixnxtx xWxexlxcxoxmxex xtxox xCxrxyxpxtxCxoxdxex
sxextx xsxcxoxrxex xtxox x1x0x
pxrxixnxtx xsxcxoxrxex
sxextx xsxcxoxrxex xtxox xsxcxoxrxex x+x x5x
pxrxixnxtx xsxcxoxrxex
rxexpxexaxtx x3x
pxrxixnxtx xlxoxoxpx
exnxdx
pxrxixnxtx xdxoxnxex`,
        mixed: `Key: 1 2 3 1 2 3 1 2 3
cevag Jrypbzr gb PelcgPbqr
01 ot erocs tes
pxrxixnxtx xsxcxoxrxex
frg fpber gb fpber + 5
erocs tnirp
rxexpxexaxtx x3x
cevag ybbc
dne
pxrxixnxtx xdxoxnxex`,
      },
      output: `Welcome to CryptCode
10
15
loop
loop
loop
done`,
      fileExplanation:
        'This example focuses on the basics: printing text, storing a value, changing that value, repeating a block, and ending the program cleanly.',
      outputExplanation:
        'The program prints a welcome message, shows the score before and after adding 5, repeats a word three times, and then prints done.',
    },
  ];

  get selectedExample(): DemoExample {
    return (
      this.examples.find((example) => example.id === this.selectedExampleId) ?? this.examples[0]
    );
  }

  get selectedEncryptionExplanation(): string {
    const lineCount = this.getNonEmptyLineCount(this.selectedExample.ccode);

    if (this.selectedEncryption === 'caesar') {
      return `Caesar uses key 1 on all ${lineCount} non-empty line${lineCount === 1 ? '' : 's'}. Each line is shifted during encryption, then shifted back when the interpreter runs it.`;
    }

    if (this.selectedEncryption === 'reverse') {
      return `Reverse uses key 2 on all ${lineCount} non-empty line${lineCount === 1 ? '' : 's'}. Each encrypted line is written backward, and the interpreter reverses it before running it.`;
    }

    if (this.selectedEncryption === 'addx') {
      return `AddX uses key 3 on all ${lineCount} non-empty line${lineCount === 1 ? '' : 's'}. It hides the source by inserting extra x characters, then removes them during decryption.`;
    }

    return `Mixed cycles through keys 1, 2, and 3 line by line. The Key line tells CryptCode which decryptor to use for each encrypted line.`;
  }

  get displayedCode(): string {
    if (this.selectedView === 'ccode') {
      return this.selectedExample.ccode;
    }

    if (this.selectedView === 'crypt') {
      return this.selectedExample.crypt[this.selectedEncryption];
    }

    return this.selectedExample.output;
  }

  setSelectedExample(exampleId: DemoExampleId): void {
    this.selectedExampleId = exampleId;
    this.selectedView = 'ccode';
  }

  setSelectedView(view: DemoView): void {
    this.selectedView = view;
  }

  setSelectedEncryption(method: EncryptionMethod): void {
    this.selectedEncryption = method;
    this.selectedView = 'crypt';
  }

  private getNonEmptyLineCount(source: string): number {
    return source.split('\n').filter((line) => line.trim() !== '').length;
  }
}
