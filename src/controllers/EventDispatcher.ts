type RemoveEventListenerCallback = () => void;

type Callback = (...args: any[]) => void;
type FuncArgs<T> = Parameters<Extract<T, Callback>>;

export class EventDispatcher<T> {
  private listeners: T[] = [];

  public addEventListener(listener: T): RemoveEventListenerCallback {
    this.listeners = [...this.listeners, listener];
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  _dispatchEvent<E extends keyof T>(
    eventKey: E,
    ...args: FuncArgs<T[E]>
  ): void {
    this.listeners.forEach(listener => {
      const callback = listener[eventKey];
      if (callback instanceof Function) {
        callback(...args);
      }
    });
  }
}
