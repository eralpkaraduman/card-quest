export type ChangeHandler = () => void;

export abstract class ChangeNotifier {
  private _changeHandler: ChangeHandler;

  constructor(readonly changeHandler: ChangeHandler) {
    this._changeHandler = changeHandler;
  }

  notifyObserver() {
    this._changeHandler();
  }

  abstract reset(): void;
}

export class Observable<T> extends ChangeNotifier {
  private _value: T;
  private _initialValue: T;

  constructor(readonly initialValue: T, readonly changeHandler: ChangeHandler) {
    super(changeHandler);
    this._initialValue = initialValue;
    this._value = initialValue;
  }

  get value(): Readonly<T> {
    return this._value;
  }

  public update(newValue: T | ((prevValue: T) => T)): void {
    if (newValue instanceof Function) {
      this._value = newValue(this._value);
    } else {
      this._value = newValue;
    }
    this.notifyObserver();
  }

  public reset() {
    this.update(this._initialValue);
  }
}
