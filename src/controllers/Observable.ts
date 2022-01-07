export type Observer<T> = (newValue?: T) => void;

export class Observable<T> {
  private _observer: Observer<T>;

  constructor(observer: Observer<T>) {
    this._observer = observer;
  }

  notifyObserver(change?: T) {
    this._observer(change);
  }
}

export class ObservableValue<T> extends Observable<T> {
  private _value: T;

  constructor(readonly initialValue: T, observer: Observer<T>) {
    super(observer);
    this._value = initialValue;
  }

  get value(): Readonly<T> {
    return this._value;
  }

  update(newValue: T | ((prevValue: T) => T)): void {
    if (newValue instanceof Function) {
      this._value = newValue(this._value);
    } else {
      this._value = newValue;
    }
    this.notifyObserver(this._value);
  }
}
