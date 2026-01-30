
import { Question, Subject } from '../types';

export const PYQ_DATA: Question[] = [
  {
    id: 'pyq_2024_1',
    year: 2024,
    subject: Subject.Mathematics,
    text: 'If f(x) = x² + 2x + 1, then the value of f\'(1) is:',
    options: [
      { id: 'a', text: '4' },
      { id: 'b', text: '2' },
      { id: 'c', text: '3' },
      { id: 'd', text: '1' }
    ],
    correctOptionId: 'a'
  },
  {
    id: 'pyq_2024_2',
    year: 2024,
    subject: Subject.ComputerAwareness,
    text: 'Which of the following data structures uses the LIFO principle?',
    options: [
      { id: 'a', text: 'Queue' },
      { id: 'b', text: 'Stack' },
      { id: 'c', text: 'Linked List' },
      { id: 'd', text: 'Array' }
    ],
    correctOptionId: 'b'
  },
  {
    id: 'pyq_2023_1',
    year: 2023,
    subject: Subject.ComputerAwareness,
    text: 'What is the binary equivalent of decimal number 25?',
    options: [
      { id: 'a', text: '11001' },
      { id: 'b', text: '11011' },
      { id: 'c', text: '10101' },
      { id: 'd', text: '11100' }
    ],
    correctOptionId: 'a'
  },
  {
    id: 'pyq_2023_2',
    year: 2023,
    subject: Subject.Mathematics,
    text: 'The probability of getting a sum of 7 when two dice are thrown is:',
    options: [
      { id: 'a', text: '1/6' },
      { id: 'b', text: '5/36' },
      { id: 'c', text: '7/36' },
      { id: 'd', text: '1/12' }
    ],
    correctOptionId: 'a'
  },
  {
    id: 'pyq_2022_1',
    year: 2022,
    subject: Subject.GeneralAptitude,
    text: 'If "COMPUTER" is coded as "RFUVQNPC", then "MEDICINE" is coded as:',
    options: [
      { id: 'a', text: 'EOJDJEFM' },
      { id: 'b', text: 'EOJDEJFM' },
      { id: 'c', text: 'MFEJDJOE' },
      { id: 'd', text: 'EOJDJFME' }
    ],
    correctOptionId: 'd'
  }
];
