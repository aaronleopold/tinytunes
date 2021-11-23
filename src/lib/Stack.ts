export default class Stack<T> {
  private _stack: T[];

  public push(item: T): void {
    this._stack.push(item);
  }

  public pop(): T | undefined {
    return this._stack.pop();
  }

  public clear(): void {
    this._stack = [];
  }

  public peek(): T | undefined {
    if (this._stack.length === 0) {
      return undefined;
    }

    return this._stack[this._stack.length - 1];
  }

  public size(): number {
    return this._stack.length;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public hasStuffs(): boolean {
    return this._stack.length > 0;
  }

  constructor() {
    this._stack = [];
  }
}
