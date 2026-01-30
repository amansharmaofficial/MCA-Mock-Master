
import { Question, Subject } from '../types';

/**
 * CUET PG MCA (SCQP09) Syllabus Accurate Question Bank
 * Structure: 30 Math, 35 Computer Awareness, 10 General Aptitude
 */

export const MOCK_TEST_1: Question[] = [
  // --- MATHEMATICS (1-30) ---
  { id: 'm1', subject: Subject.Mathematics, text: 'If A is a square matrix of order 3 and |A| = 5, then the value of |adj(adj A)| is:', options: [{id:'a',text:'25'},{id:'b',text:'125'},{id:'c',text:'625'},{id:'d',text:'3125'}], correctOptionId: 'c' },
  { id: 'm2', subject: Subject.Mathematics, text: 'The value of lim (x→0) (sin x / x) is 1. What is the value of lim (x→0) (1 - cos x) / x²?', options: [{id:'a',text:'0'},{id:'b',text:'1'},{id:'c',text:'1/2'},{id:'d',text:'2'}], correctOptionId: 'c' },
  { id: 'm3', subject: Subject.Mathematics, text: 'If A and B are two sets such that n(A)=35, n(B)=30 and n(A∪B)=45, then n(A∩B) is:', options: [{id:'a',text:'10'},{id:'b',text:'15'},{id:'c',text:'20'},{id:'d',text:'25'}], correctOptionId: 'c' },
  { id: 'm4', subject: Subject.Mathematics, text: 'The area bounded by the curve y = x², x-axis and the lines x = 1 and x = 2 is:', options: [{id:'a',text:'7/3'},{id:'b',text:'8/3'},{id:'c',text:'1'},{id:'d',text:'2'}], correctOptionId: 'a' },
  { id: 'm5', subject: Subject.Mathematics, text: 'The probability that a non-leap year has 53 Sundays is:', options: [{id:'a',text:'1/7'},{id:'b',text:'2/7'},{id:'c',text:'53/365'},{id:'d',text:'0'}], correctOptionId: 'a' },
  { id: 'm6', subject: Subject.Mathematics, text: 'The value of ∫ (e^x / (1 + e^x)) dx is:', options: [{id:'a',text:'log(1 + e^x) + C'},{id:'b',text:'e^x + C'},{id:'c',text:'1/(1+e^x) + C'},{id:'d',text:'log(e^x) + C'}], correctOptionId: 'a' },
  { id: 'm7', subject: Subject.Mathematics, text: 'If the vectors 2i - j + k, i + 2j - 3k and 3i + aj + 5k are coplanar, then a is:', options: [{id:'a',text:'-4'},{id:'b',text:'4'},{id:'c',text:'-2'},{id:'d',text:'2'}], correctOptionId: 'a' },
  { id: 'm8', subject: Subject.Mathematics, text: 'The order of the differential equation (d²y/dx²)³ + (dy/dx)² + sin(dy/dx) + 1 = 0 is:', options: [{id:'a',text:'1'},{id:'b',text:'2'},{id:'c',text:'3'},{id:'d',text:'Not defined'}], correctOptionId: 'b' },
  { id: 'm9', subject: Subject.Mathematics, text: 'If sin⁻¹x + sin⁻¹y = π/2, then cos⁻¹x + cos⁻¹y is:', options: [{id:'a',text:'π/2'},{id:'b',text:'π'},{id:'c',text:'0'},{id:'d',text:'π/4'}], correctOptionId: 'a' },
  { id: 'm10', subject: Subject.Mathematics, text: 'A man draws 2 cards from a pack of 52. The probability that both are kings is:', options: [{id:'a',text:'1/221'},{id:'b',text:'1/13'},{id:'c',text:'1/26'},{id:'d',text:'2/13'}], correctOptionId: 'a' },
  { id: 'm11', subject: Subject.Mathematics, text: 'The eccentricity of the ellipse x²/16 + y²/9 = 1 is:', options: [{id:'a',text:'√7/4'},{id:'b',text:'7/16'},{id:'c',text:'3/4'},{id:'d',text:'4/3'}], correctOptionId: 'a' },
  { id: 'm12', subject: Subject.Mathematics, text: 'The value of det|1 omega omega²; omega omega² 1; omega² 1 omega| where omega is cube root of unity is:', options: [{id:'a',text:'0'},{id:'b',text:'1'},{id:'c',text:'omega'},{id:'d',text:'omega²'}], correctOptionId: 'a' },
  { id: 'm13', subject: Subject.Mathematics, text: 'If f(x) = |x - 1|, then f\'(1) is:', options: [{id:'a',text:'1'},{id:'b',text:'-1'},{id:'c',text:'0'},{id:'d',text:'Does not exist'}], correctOptionId: 'd' },
  { id: 'm14', subject: Subject.Mathematics, text: 'The period of sin(2x) is:', options: [{id:'a',text:'π'},{id:'b',text:'2π'},{id:'c',text:'π/2'},{id:'d',text:'4π'}], correctOptionId: 'a' },
  { id: 'm15', subject: Subject.Mathematics, text: 'The number of ways in which 5 people can be seated around a circular table is:', options: [{id:'a',text:'120'},{id:'b',text:'24'},{id:'c',text:'60'},{id:'d',text:'720'}], correctOptionId: 'b' },
  // ... adding more to reach 30 math
  { id: 'm16', subject: Subject.Mathematics, text: 'In a group of 100 people, 70 like coffee and 60 like tea. The minimum number of people who like both is:', options: [{id:'a',text:'10'},{id:'b',text:'30'},{id:'c',text:'60'},{id:'d',text:'70'}], correctOptionId: 'b' },
  { id: 'm17', subject: Subject.Mathematics, text: 'The equation of the line passing through (1,2) and parallel to 3x - 4y + 5 = 0 is:', options: [{id:'a',text:'3x - 4y + 5 = 0'},{id:'b',text:'3x - 4y + 11 = 0'},{id:'c',text:'4x + 3y - 10 = 0'},{id:'d',text:'3x - 4y - 5 = 0'}], correctOptionId: 'd' },
  { id: 'm18', subject: Subject.Mathematics, text: 'The value of i^100 + i^101 + i^102 + i^103 is:', options: [{id:'a',text:'0'},{id:'b',text:'1'},{id:'c',text:'i'},{id:'d',text:'-1'}], correctOptionId: 'a' },
  { id: 'm19', subject: Subject.Mathematics, text: 'If x + y = 10, the maximum value of xy is:', options: [{id:'a',text:'20'},{id:'b',text:'25'},{id:'c',text:'30'},{id:'d',text:'100'}], correctOptionId: 'b' },
  { id: 'm20', subject: Subject.Mathematics, text: 'The coordinate of the focus of the parabola y² = 12x is:', options: [{id:'a',text:'(0,3)'},{id:'b',text:'(3,0)'},{id:'c',text:'(-3,0)'},{id:'d',text:'(0,-3)'}], correctOptionId: 'b' },
  { id: 'm21', subject: Subject.Mathematics, text: 'The distance between the points (2,3) and (5,7) is:', options: [{id:'a',text:'5'},{id:'b',text:'7'},{id:'c',text:'√13'},{id:'d',text:'25'}], correctOptionId: 'a' },
  { id: 'm22', subject: Subject.Mathematics, text: 'If f(x) = x³ - 6x² + 9x + 15, then f(x) is decreasing in:', options: [{id:'a',text:'(1,3)'},{id:'b',text:'(-∞, 1)'},{id:'c',text:'(3, ∞)'},{id:'d',text:'None'}], correctOptionId: 'a' },
  { id: 'm23', subject: Subject.Mathematics, text: 'The mean of first 10 natural numbers is:', options: [{id:'a',text:'5'},{id:'b',text:'5.5'},{id:'c',text:'6'},{id:'d',text:'4.5'}], correctOptionId: 'b' },
  { id: 'm24', subject: Subject.Mathematics, text: 'The value of tan 75° is:', options: [{id:'a',text:'2 + √3'},{id:'b',text:'2 - √3'},{id:'c',text:'√3 + 1'},{id:'d',text:'√3 - 1'}], correctOptionId: 'a' },
  { id: 'm25', subject: Subject.Mathematics, text: 'If P(A) = 0.4, P(B) = 0.8 and P(B|A) = 0.6, then P(A∪B) is:', options: [{id:'a',text:'0.96'},{id:'b',text:'0.24'},{id:'c',text:'0.48'},{id:'d',text:'0.84'}], correctOptionId: 'a' },
  { id: 'm26', subject: Subject.Mathematics, text: 'The solution of dy/dx = y/x is:', options: [{id:'a',text:'y = cx'},{id:'b',text:'x = cy'},{id:'c',text:'xy = c'},{id:'d',text:'x+y = c'}], correctOptionId: 'a' },
  { id: 'm27', subject: Subject.Mathematics, text: 'The inverse of the matrix [1 2; 3 4] is:', options: [{id:'a',text:'[-2 1; 1.5 -0.5]'},{id:'b',text:'[4 -2; -3 1]'},{id:'c',text:'[1 0; 0 1]'},{id:'d',text:'[-2 3; 2 -1]'}], correctOptionId: 'a' },
  { id: 'm28', subject: Subject.Mathematics, text: 'The number of diagonals in a decagon is:', options: [{id:'a',text:'35'},{id:'b',text:'45'},{id:'c',text:'20'},{id:'d',text:'10'}], correctOptionId: 'a' },
  { id: 'm29', subject: Subject.Mathematics, text: 'The value of cos⁻¹(-1/2) is:', options: [{id:'a',text:'π/3'},{id:'b',text:'2π/3'},{id:'c',text:'-π/3'},{id:'d',text:'5π/6'}], correctOptionId: 'b' },
  { id: 'm30', subject: Subject.Mathematics, text: 'If nCr = nC(r-1), then r is:', options: [{id:'a',text:'n/2'},{id:'b',text:'(n+1)/2'},{id:'c',text:'n'},{id:'d',text:'1'}], correctOptionId: 'b' },

  // --- COMPUTER AWARENESS (31-65) ---
  { id: 'c1', subject: Subject.ComputerAwareness, text: 'What is the correct postfix expression for the infix (A + B) * C?', options: [{id:'a',text:'AB+C*'},{id:'b',text:'ABC+*'},{id:'c',text:'*+ABC'},{id:'d',text:'AB*C+'}], correctOptionId: 'a' },
  { id: 'c2', subject: Subject.ComputerAwareness, text: 'Which of the following is a synchronization tool to solve the Critical Section Problem?', options: [{id:'a',text:'Semaphore'},{id:'b',text:'Paging'},{id:'c',text:'Segmentation'},{id:'d',text:'Virtual Memory'}], correctOptionId: 'a' },
  { id: 'c3', subject: Subject.ComputerAwareness, text: 'The time complexity of searching an element in a Balanced Binary Search Tree is:', options: [{id:'a',text:'O(n)'},{id:'b',text:'O(log n)'},{id:'c',text:'O(1)'},{id:'d',text:'O(n log n)'}], correctOptionId: 'b' },
  { id: 'c4', subject: Subject.ComputerAwareness, text: 'Belady\'s Anomaly occurs in which page replacement algorithm?', options: [{id:'a',text:'LRU'},{id:'b',text:'Optimal'},{id:'c',text:'FIFO'},{id:'d',text:'MRU'}], correctOptionId: 'c' },
  { id: 'c5', subject: Subject.ComputerAwareness, text: 'In 2\'s complement representation, the binary number 1111 corresponds to decimal:', options: [{id:'a',text:'15'},{id:'b',text:'-1'},{id:'c',text:'-7'},{id:'d',text:'-8'}], correctOptionId: 'b' },
  { id: 'c6', subject: Subject.ComputerAwareness, text: 'Which layer of OSI model is responsible for end-to-end error recovery?', options: [{id:'a',text:'Network Layer'},{id:'b',text:'Transport Layer'},{id:'c',text:'Data Link Layer'},{id:'d',text:'Physical Layer'}], correctOptionId: 'b' },
  { id: 'c7', subject: Subject.ComputerAwareness, text: 'A K-map of 4 variables has how many cells?', options: [{id:'a',text:'4'},{id:'b',text:'8'},{id:'c',text:'16'},{id:'d',text:'32'}], correctOptionId: 'c' },
  { id: 'c8', subject: Subject.ComputerAwareness, text: 'Which of the following sorting algorithms is NOT stable?', options: [{id:'a',text:'Merge Sort'},{id:'b',text:'Insertion Sort'},{id:'c',text:'Quick Sort'},{id:'d',text:'Bubble Sort'}], correctOptionId: 'c' },
  { id: 'c9', subject: Subject.ComputerAwareness, text: 'A deadlock can be prevented by:', options: [{id:'a',text:'Allowing circular wait'},{id:'b',text:'Eliminating mutual exclusion'},{id:'c',text:'Resource allocation graph'},{id:'d',text:'Ignoring the problem'}], correctOptionId: 'b' },
  { id: 'c10', subject: Subject.ComputerAwareness, text: 'The number of bits in a MAC address is:', options: [{id:'a',text:'32'},{id:'b',text:'48'},{id:'c',text:'64'},{id:'d',text:'128'}], correctOptionId: 'b' },
  { id: 'c11', subject: Subject.ComputerAwareness, text: 'Which of the following is used to resolve collisions in a Hash Table?', options: [{id:'a',text:'Chaining'},{id:'b',text:'Paging'},{id:'c',text:'Indexing'},{id:'d',text:'Sorting'}], correctOptionId: 'a' },
  { id: 'c12', subject: Subject.ComputerAwareness, text: 'What is the full form of RISC in Computer Architecture?', options: [{id:'a',text:'Reduced Instruction Set Computer'},{id:'b',text:'Rapid Instruction Set Computer'},{id:'c',text:'Reliable Instruction Set Computer'},{id:'d',text:'Revised Integrated System Center'}], correctOptionId: 'a' },
  { id: 'c13', subject: Subject.ComputerAwareness, text: 'A process is in "Ready" state when it is:', options: [{id:'a',text:'Waiting for I/O'},{id:'b',text:'Waiting for CPU'},{id:'c',text:'Executing'},{id:'d',text:'Terminated'}], correctOptionId: 'b' },
  { id: 'c14', subject: Subject.ComputerAwareness, text: 'How many NAND gates are required to implement an OR gate?', options: [{id:'a',text:'1'},{id:'b',text:'2'},{id:'c',text:'3'},{id:'d',text:'4'}], correctOptionId: 'c' },
  { id: 'c15', subject: Subject.ComputerAwareness, text: 'In C++, which keyword is used for dynamic memory allocation?', options: [{id:'a',text:'malloc'},{id:'b',text:'new'},{id:'c',text:'alloc'},{id:'d',text:'create'}], correctOptionId: 'b' },
  { id: 'c16', subject: Subject.ComputerAwareness, text: 'The height of a full binary tree with n nodes is:', options: [{id:'a',text:'log(n+1)'},{id:'b',text:'log(n)'},{id:'c',text:'n'},{id:'d',text:'n/2'}], correctOptionId: 'a' },
  { id: 'c17', subject: Subject.ComputerAwareness, text: 'Which protocol is used for sending emails?', options: [{id:'a',text:'HTTP'},{id:'b',text:'FTP'},{id:'c',text:'SMTP'},{id:'d',text:'SNMP'}], correctOptionId: 'c' },
  { id: 'c18', subject: Subject.ComputerAwareness, text: 'What is the default port for HTTP?', options: [{id:'a',text:'21'},{id:'b',text:'25'},{id:'c',text:'80'},{id:'d',text:'443'}], correctOptionId: 'c' },
  { id: 'c19', subject: Subject.ComputerAwareness, text: 'A flip-flop can store how many bits of information?', options: [{id:'a',text:'1'},{id:'b',text:'2'},{id:'c',text:'4'},{id:'d',text:'8'}], correctOptionId: 'a' },
  { id: 'c20', subject: Subject.ComputerAwareness, text: 'Which of the following is a DDL command in SQL?', options: [{id:'a',text:'SELECT'},{id:'b',text:'INSERT'},{id:'c',text:'CREATE'},{id:'d',text:'UPDATE'}], correctOptionId: 'c' },
  { id: 'c21', subject: Subject.ComputerAwareness, text: 'Primary key ensures:', options: [{id:'a',text:'Null values'},{id:'b',text:'Uniqueness'},{id:'c',text:'Redundancy'},{id:'d',text:'None of these'}], correctOptionId: 'b' },
  { id: 'c22', subject: Subject.ComputerAwareness, text: 'The 1\'s complement of 1010 is:', options: [{id:'a',text:'0101'},{id:'b',text:'1111'},{id:'c',text:'0000'},{id:'d',text:'1011'}], correctOptionId: 'a' },
  { id: 'c23', subject: Subject.ComputerAwareness, text: 'Which logic gate output is 1 only if all inputs are 0?', options: [{id:'a',text:'NOR'},{id:'b',text:'NAND'},{id:'c',text:'XOR'},{id:'d',text:'OR'}], correctOptionId: 'a' },
  { id: 'c24', subject: Subject.ComputerAwareness, text: 'The range of an 8-bit signed integer is:', options: [{id:'a',text:'0 to 255'},{id:'b',text:'-128 to 127'},{id:'c',text:'-127 to 128'},{id:'d',text:'-256 to 255'}], correctOptionId: 'b' },
  { id: 'c25', subject: Subject.ComputerAwareness, text: 'A bridge works in which layer of OSI model?', options: [{id:'a',text:'Physical'},{id:'b',text:'Data Link'},{id:'c',text:'Network'},{id:'d',text:'Application'}], correctOptionId: 'b' },
  { id: 'c26', subject: Subject.ComputerAwareness, text: 'Which of the following is a non-linear data structure?', options: [{id:'a',text:'Stack'},{id:'b',text:'Queue'},{id:'c',text:'Graph'},{id:'d',text:'Array'}], correctOptionId: 'c' },
  { id: 'c27', subject: Subject.ComputerAwareness, text: 'Page fault occurs when:', options: [{id:'a',text:'Page is in memory'},{id:'b',text:'Page is not in memory'},{id:'c',text:'Memory is full'},{id:'d',text:'Process is dead'}], correctOptionId: 'b' },
  { id: 'c28', subject: Subject.ComputerAwareness, text: 'The size of a pointer in a 32-bit system is:', options: [{id:'a',text:'2 bytes'},{id:'b',text:'4 bytes'},{id:'c',text:'8 bytes'},{id:'d',text:'Depends on type'}], correctOptionId: 'b' },
  { id: 'c29', subject: Subject.ComputerAwareness, text: 'Which operator cannot be overloaded in C++?', options: [{id:'a',text:'+'},{id:'b',text:'*'},{id:'c',text:'::'},{id:'d',text:'<<'}], correctOptionId: 'c' },
  { id: 'c30', subject: Subject.ComputerAwareness, text: 'What is the base of the Octal number system?', options: [{id:'a',text:'2'},{id:'b',text:'8'},{id:'c',text:'10'},{id:'d',text:'16'}], correctOptionId: 'b' },
  { id: 'c31', subject: Subject.ComputerAwareness, text: 'The number of address lines for a 1 KB memory is:', options: [{id:'a',text:'10'},{id:'b',text:'8'},{id:'c',text:'12'},{id:'d',text:'16'}], correctOptionId: 'a' },
  { id: 'c32', subject: Subject.ComputerAwareness, text: 'A program that translates assembly language to machine language is:', options: [{id:'a',text:'Compiler'},{id:'b',text:'Assembler'},{id:'c',text:'Interpreter'},{id:'d',text:'Linker'}], correctOptionId: 'b' },
  { id: 'c33', subject: Subject.ComputerAwareness, text: 'Virtual memory is implemented using:', options: [{id:'a',text:'Demand Paging'},{id:'b',text:'Cache'},{id:'c',text:'SRAM'},{id:'d',text:'ROM'}], correctOptionId: 'a' },
  { id: 'c34', subject: Subject.ComputerAwareness, text: 'Which of the following is a valid C++ identifier?', options: [{id:'a',text:'2abc'},{id:'b',text:'_abc'},{id:'c',text:'abc$'},{id:'d',text:'int'}], correctOptionId: 'b' },
  { id: 'c35', subject: Subject.ComputerAwareness, text: 'The complexity of Bubble Sort in average case is:', options: [{id:'a',text:'O(n)'},{id:'b',text:'O(n²)'},{id:'c',text:'O(log n)'},{id:'d',text:'O(n log n)'}], correctOptionId: 'b' },

  // --- GENERAL APTITUDE (66-75) ---
  { id: 'g1', subject: Subject.GeneralAptitude, text: 'Find the missing number in the series: 2, 6, 12, 20, 30, ?', options: [{id:'a',text:'40'},{id:'b',text:'42'},{id:'c',text:'44'},{id:'d',text:'48'}], correctOptionId: 'b' },
  { id: 'g2', subject: Subject.GeneralAptitude, text: 'Pointing to a photograph, a man said, "I have no brother or sister but that man\'s father is my father\'s son." Whose photograph was it?', options: [{id:'a',text:'His own'},{id:'b',text:'His son\'s'},{id:'c',text:'His father\'s'},{id:'d',text:'His nephew\'s'}], correctOptionId: 'b' },
  { id: 'g3', subject: Subject.GeneralAptitude, text: 'If A is 25% more than B, then B is what percentage less than A?', options: [{id:'a',text:'20%'},{id:'b',text:'25%'},{id:'c',text:'15%'},{id:'d',text:'30%'}], correctOptionId: 'a' },
  { id: 'g4', subject: Subject.GeneralAptitude, text: 'A train 150m long crosses a pole in 15 seconds. Its speed in km/h is:', options: [{id:'a',text:'36'},{id:'b',text:'45'},{id:'c',text:'54'},{id:'d',text:'60'}], correctOptionId: 'a' },
  { id: 'g5', subject: Subject.GeneralAptitude, text: 'Find the odd one out: 144, 169, 196, 210, 225', options: [{id:'a',text:'169'},{id:'b',text:'196'},{id:'c',text:'210'},{id:'d',text:'225'}], correctOptionId: 'c' },
  { id: 'g6', subject: Subject.GeneralAptitude, text: 'If "COMPUTER" is coded as "RFUVQNPC", how is "MEDICINE" coded?', options: [{id:'a',text:'EOJDEJFM'},{id:'b',text:'EOJDJEFM'},{id:'c',text:'MFEJDJOE'},{id:'d',text:'EOJDJFME'}], correctOptionId: 'd' },
  { id: 'g7', subject: Subject.GeneralAptitude, text: 'A is the father of B but B is not his son. What is B to A?', options: [{id:'a',text:'Daughter'},{id:'b',text:'Wife'},{id:'c',text:'Brother'},{id:'d',text:'Niece'}], correctOptionId: 'a' },
  { id: 'g8', subject: Subject.GeneralAptitude, text: 'If a clock shows 3:00, what is the angle between the hands?', options: [{id:'a',text:'45°'},{id:'b',text:'90°'},{id:'c',text:'180°'},{id:'d',text:'60°'}], correctOptionId: 'b' },
  { id: 'g9', subject: Subject.GeneralAptitude, text: 'A sum of money doubles itself in 5 years at simple interest. In how many years will it triple?', options: [{id:'a',text:'10'},{id:'b',text:'15'},{id:'c',text:'12'},{id:'d',text:'20'}], correctOptionId: 'a' },
  { id: 'g10', subject: Subject.GeneralAptitude, text: 'If the day after tomorrow is Sunday, what was the day before yesterday?', options: [{id:'a',text:'Monday'},{id:'b',text:'Tuesday'},{id:'c',text:'Wednesday'},{id:'d',text:'Thursday'}], correctOptionId: 'b' }
];

export const MOCK_TEST_2: Question[] = [
  ...MOCK_TEST_1.slice().reverse().map(q => ({...q, id: q.id + '_test2'}))
];

export const ALL_TESTS = [
  { id: 'test_1', name: 'Full Mock Test 1 (Accurate Pattern)', questions: MOCK_TEST_1, count: 75 },
  { id: 'test_2', name: 'Full Mock Test 2 (Shuffle Pattern)', questions: MOCK_TEST_2, count: 75 },
];

export const MOCK_QUESTIONS = MOCK_TEST_1;
