interface TestObj {
  a?: string;
  readonly b: string;
  c: boolean;
  readonly d?: number;
}

/**
 * Record<K, T>
 */

type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
}

const obj: MyRecord<string, string | number | boolean> = {
  a: 1,
  b: '2',
  c: true
};

/**
 * Required<T>
 */
type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};
type TestObj_1 = MyRequired<TestObj>;

/**
 * Partial<T>
 */

type MyPartial<T> = {
  [P in keyof T]+?: T[P];
};

type TestObj_2 = MyPartial<TestObj>;

/**
 * Exclude<T, U>: 排除 U
 */
type MyExclude<T, U> = T extends U ? never : T;

/**
 * Extract<T, U>: 摘取 U
 */
type MyExtract<T, U> = T extends U ? T : never;

/**
 * Pick<T, K>
 */
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * Omit<T, K>
 */
type MyOmit<T, K extends keyof T> = MyPick<T, Exclude<keyof T, K>>;
type TestObj_3 = MyOmit<TestObj, 'a' | 'd'>;

/**
 * ReturnType<T>
 */
type MyReturnType<T> = T extends (...args: any) => infer R ? R : any;

/**
 * Parameters<T>
 */
type MyParameters<T> = T extends (...args: infer P) => any ? P : any;
