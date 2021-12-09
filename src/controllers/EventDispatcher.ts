export type IEventListener = {[key in string]: Function};

type RemoveEventListenerCallback = () => void;

export class EventDispatcher<T extends IEventListener> {
  private listeners: T[] = [];

  public addEventListener(listener: T): RemoveEventListenerCallback {
    this.listeners = [...this.listeners, listener];
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  _dispatchEvent<E extends keyof T>(event: E, ...args: never[]): void {
    this.listeners.forEach(listener => listener[event](...args));
  }
}
