import { Component } from '@angular/core';

type DemoExampleId = 'fizzbuzz' | 'complex' | 'simple';
type DemoView = 'ccode' | 'crypt' | 'output';
type EncryptionMethod = 'caesar' | 'reverse' | 'addx';

type DemoExample = {
  id: DemoExampleId;
  label: string;
  title: string;
  ccode: string;
  crypt: Record<EncryptionMethod, string>;
  output: string;
  fileExplanation: string;
  encryptionExplanation: string;
  outputExplanation: string;
};

@Component({
  selector: 'app-demo',
  imports: [],
  templateUrl: './demo.html',
  styleUrl: './demo.scss'
})

export class Demo {
  selectedExampleId: DemoExampleId = 'fizzbuzz';
  selectedView: DemoView = 'ccode';
  selectedEncryption: EncryptionMethod = 'caesar';

  encryptionMethods: { id: EncryptionMethod; label: string }[] = [
    { id: 'caesar', label: 'Caesar' },
    { id: 'reverse', label: 'Reverse' },
    { id: 'addx', label: 'AddX' }
  ];

  examples: DemoExample[] = [
    {
      id: 'fizzbuzz',
      label: 'FizzBuzz',
      title: 'FizzBuzz program',
      ccode: `fizzbuzz 1 to 15`,
      crypt: {
        caesar: `Key: 1
ilccargg 1 gb 15`,
        reverse: `Key: 2
51 ot 1 zzubzzif`,
        addx: `Key: 3
gj{{cv{{!2!up!26`
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
FizzBuzz`,
      fileExplanation:
        'This is the shortest demo because FizzBuzz is built directly into the language as a command.',
      encryptionExplanation:
        'The encrypted version stores the command in a .crypt file. The Key line tells the interpreter which decryptor to use for the encrypted line.',
      outputExplanation:
        'The interpreter prints numbers from 1 to 15, replacing multiples of 3 with Fizz, multiples of 5 with Buzz, and multiples of both with FizzBuzz.'
    },
    {
      id: 'complex',
      label: 'Complex',
      title: 'Counter with conditions',
      ccode: `set total to 0
count i from 1 to 5
set total to total + i
when i mod 2 is 0
print even
else
print odd
end
end
print total`,
      crypt: {
        caesar: `Key: 1 1 1 1 1 1 1 1 1 1
vhg gbgnm gb 0
pbhag v sebz 1 gb 5
vhg gbgnm gb gbgnm + v
jura v zbq 2 vf 0
cevag rira
ryfr
cevag bqq
raq
raq
cevag gbgnm`,
        reverse: `Key: 2 2 2 2 2 2 2 2 2 2
0 ot latot tes
5 ot 1 morf i tnuoc
i + latot ot latot tes
0 si 2 dom i nehw
neve tnirp
esle
ddo tnirp
dne
dne
latot tnirp`,
        addx: `Key: 3 3 3 3 3 3 3 3 3 3
tfu!upubm!up!1
dpvou!j!gspn!2!up!6
tfu!upubm!up!upubm!,!j
xifo!j!npe!3!jt!1
qsjou!fwfo
fmtf
qsjou!pee
foe
foe
qsjou!upubm`
      },
      output: `odd
even
odd
even
odd
15`,
      fileExplanation:
        'This program shows more of the language: variables, counting, math, conditions, else branches, and nested blocks.',
      encryptionExplanation:
        'Each non-empty line can be encrypted. In a real .crypt file, the Key line can choose the method for each line, so different lines can use different decryptors.',
      outputExplanation:
        'The loop counts from 1 to 5, prints whether each number is odd or even, keeps a running total, and prints 15 at the end.'
    },
    {
      id: 'simple',
      label: 'Simple',
      title: 'Hello and variable',
      ccode: `print Hello from CryptCode
set x to 5
print x`,
      crypt: {
        caesar: `Key: 1 1 1
cevag Uryyb sebz PelcgPbqr
vhg k gb 5
cevag k`,
        reverse: `Key: 2 2 2
edoCtpyrc morf olleH tnirp
5 ot x tes
x tnirp`,
        addx: `Key: 3 3 3
qsjou!Ifmmp!gspn!DszquDpef
tfu!y!up!6
qsjou!y`
      },
      output: `Hello from CryptCode
5`,
      fileExplanation:
        'This simple example shows the basic idea of writing readable CryptCode before turning it into an encrypted file.',
      encryptionExplanation:
        'The encrypted file hides the original commands, but the interpreter can recover them when the correct key information is available.',
      outputExplanation:
        'The program prints a message, stores a number in a variable, then prints the stored value.'
    }
  ];

  get selectedExample(): DemoExample {
    return this.examples.find(example => example.id === this.selectedExampleId) ?? this.examples[0];
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
}