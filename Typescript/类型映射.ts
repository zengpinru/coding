/**
 * 1. 映射修饰符
 * +?
 * -?
 * +readonly
 * -readonly
 */

type Required<T> = {
  [prop in keyof T]-?: T[prop];
};

interface A {
  a: string;
  b?: number;
}

type B = Required<A>;

/**
 * 2. 键名重映射
 */
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

interface Person {
  age: number;
  name: string;
}

type getPersion = Getters<Person>;

export {};
