/**
 * 1. keyof
 */

// type T = string | number | symbol
type Keyof = keyof any;

/**
 * 2. in 运算符
 */
type U = 'a'|'b'|'c';
/**
 *  等同于
 *  type Foo = {
 *    a: number,
 *    b: number,
 *    c: number
 *  };
 */
type Foo = {
  [Prop in U]: number;
};

/**
 * 3. []
 */
type Person = {
  age: number;
  name: string;
  alive: boolean;
};
// number|string
type T = Person['age'|'name'];
// number|string|boolean
type A = Person[keyof Person];

/**
 * 4. 条件运算符
 * T extends U ? X : Y
 */

/**
 * 5. infer 关键字
 */

/**
 * 6. is 运算符
 */

/**
 * 7. 模板字符串
 * type T = 'A'|'B';
 *
 * type U = '1'|'2';
 * 
 * 'A1'|'A2'|'B1'|'B2'
 * type V = `${T}${U}`;
 */

/**
 * 8. satisfies 运算符
 */
type Colors = "red" | "green" | "blue";
type RGB = [number, number, number];

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<Colors, string|RGB>;

const greenComponent = palette.green.substring(1); // 不报错