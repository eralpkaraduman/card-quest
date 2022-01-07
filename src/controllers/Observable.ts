export type Observer = () => void;

export class Observable {
  private _observer: Observer;

  constructor(observer: Observer) {
    this._observer = observer;
  }

  notifyObserver() {
    this._observer();
  }
}

export class ObservableValue<T> extends Observable {
  private _value: T;

  constructor(readonly initialValue: T, observer: Observer) {
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
    this.notifyObserver();
  }
}
