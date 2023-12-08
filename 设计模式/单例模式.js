class Logger {
  constructor() {
    if (!Logger.instance) {
      Logger.instance = this;
    }
    return Logger.instance;
  }
  info() {
    console.log('info');
  }
}

const log1 = new Logger();
const log2 = new Logger();

console.log(log1 === log2);

log1.test = 'xx';
console.log(log2.test);
