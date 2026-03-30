// 1. Написати клас для реалізації структури даних Зв’язаний Список (LinkedList) та виконати на його основі наступну задачу:
// - реалізувати у класа метод deleteItem(data), який приймає певне значення data і видаляє зі зв’язаного списка перший знайдений елемент з такими даними.
// - реалізувати метод addNthElement(data, position), який приймає значення data і порядковий номер елемента position, після якого він має вставити новий вузел списку з такими самими даними

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
