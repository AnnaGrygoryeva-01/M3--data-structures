// 1. Написати клас для реалізації структури даних Зв’язаний Список (LinkedList) та виконати на його основі наступну задачу:
// - реалізувати у класа метод deleteItem(data), який приймає певне значення data і видаляє зі зв’язаного списка перший знайдений елемент з такими даними.
// - реалізувати метод addNthElement(data, position), який приймає значення data і порядковий номер елемента position, після якого він має вставити новий вузел списку з такими самими даними

// 2. Написати клас для реалізації власної структури даних, яка представляє собою колекцію елементів, нумеровану на кшталт “*1*”, “*2*” і т.д.

// 3*. До колекції з завдання №2 написати метод [Symbol.iterator], який реалізує принцип обходу колекції

// 4. Задача про парні дужки.Написати функцію, яка приймає вираз, що містить дужки різних типів - (), [], {}, <>, і перевіряє, чи правильно вони відкриваються і закриваються.

class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

function checkSequence(sequence, brackets = ["()", "[]", "{}", "<>"]) {
  if (typeof sequence !== "string") {
    throw new TypeError("Input must be a string");
  }

  const stack = new Stack();
  const openingBrackets = new Set();
  const closingBrackets = new Map();

  for (const pair of brackets) {
    openingBrackets.add(pair[0]);
    closingBrackets.set(pair[1], pair[0]);
  }

  for (const char of sequence) {
    if (openingBrackets.has(char)) {
      stack.push(char);
    } else if (closingBrackets.has(char)) {
      const expectedOpening = closingBrackets.get(char);
      const actualOpening = stack.pop();
      if (actualOpening !== expectedOpening) {
        return false;
      }
    }
  }

  return stack.isEmpty();
}

// Task 4: Tests
console.log(" Task 4: Parentheses Checker");
try {
  console.log("Check '()(([]))':", checkSequence("()(([]))"));
  console.log("Check '{][)':", checkSequence("{][)"));
  console.log("Check '<{[()]}>':", checkSequence("<{[()]}>"));
  console.log("Custom '<<>>' with ['<>']:", checkSequence("<<>>", ["<>"]));
  // Trigger Type Error
  // checkSequence(null);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
