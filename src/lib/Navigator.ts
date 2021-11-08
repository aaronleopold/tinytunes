export default class Navigator {
  private _pos: number;
  private _items: [string?, string?, string?];

  constructor() {
    this._pos = 0;
    this._items = ['/', undefined, undefined];
  }

  public isEmpty(): boolean {
    return this._items.length === 0;
  }
}
