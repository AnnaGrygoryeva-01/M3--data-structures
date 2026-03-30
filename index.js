// 1. Написати клас для реалізації структури даних Зв’язаний Список (LinkedList) та виконати на його основі наступну задачу:
// - реалізувати у класа метод deleteItem(data), який приймає певне значення data і видаляє зі зв’язаного списка перший знайдений елемент з такими даними.
// - реалізувати метод addNthElement(data, position), який приймає значення data і порядковий номер елемента position, після якого він має вставити новий вузел списку з такими самими даними

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  deleteItem(data) {
    if (!this.head) {
      throw new Error("Cannot delete from an empty list.");
    }

    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }

    throw new Error(`Element with data "${data}" not found in the list.`);
  }

  addNthElement(data, position) {
    if (typeof position !== "number") {
      throw new TypeError("Position must be a number.");
    }
    if (position < 0 || position >= this.size) {
      throw new RangeError("Position out of bounds.");
    }

    const newNode = new Node(data);
    let current = this.head;
    let currentIndex = 0;

    while (currentIndex < position) {
      current = current.next;
      currentIndex++;
    }

    newNode.next = current.next;
    current.next = newNode;
    this.size++;
    return true;
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}

// Task 1: Tests
console.log(" Task 1: LinkedList");
try {
  const list = new LinkedList();
  [10, 20, 30, 40].forEach((num) => list.append(num));
  console.log("Original List:", list.toArray());

  list.deleteItem(20);
  console.log("After deleting 20:", list.toArray());

  list.addNthElement(99, 1);
  console.log("After adding 99 after index 1:", list.toArray());

  // Trigger error test:
  //   list.addNthElement(5, 100);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

// 2. Написати клас для реалізації власної структури даних, яка представляє собою колекцію елементів, нумеровану на кшталт “*1*”, “*2*” і т.д.

//     ||
//     \/

// 3*. До колекції з завдання №2 написати метод [Symbol.iterator], який реалізує принцип обходу колекції

class NumberedCollection {
  #count = 0;

  add(value) {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new TypeError("Value must be a non-empty string");
    }

    this.#count++;
    this[this.#count] = value;
    return this.#count;
  }

  get(position) {
    if (typeof position !== "number" || position <= 0) {
      throw new RangeError("Position must be a positive number");
    }
    return this[position];
  }

  remove(position) {
    if (typeof position !== "number" || !this[position]) {
      return false;
    }
    delete this[position];
    return true;
  }

  [Symbol.iterator]() {
    const values = Object.values(this);
    let index = 0;
    return {
      next() {
        return index < values.length
          ? { done: false, value: values[index++] }
          : { done: true };
      },
    };
  }
}

// Task 2 & 3: Tests

console.log(" Task 2 & 3: NumberedCollection ");
try {
  const collection = new NumberedCollection();
  collection.add("First value");
  collection.add("Second value");
  collection.add("Third value");

  console.log("Collection instance:", collection);

  console.log("Iterating using for...of:");
  for (const item of collection) {
    console.log("->", item);
  }
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

// 4. Задача про парні дужки.Написати функцію, яка приймає вираз, що містить дужки різних типів - (), [], {}, <>, і перевіряє, чи правильно вони відкриваються і закриваються.
