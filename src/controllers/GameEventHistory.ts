import {DonsolCard} from './DonsolCard';
import type {GameState} from './GameController';
import {ChangeHandler, ChangeNotifier} from './Observable';

type EnterRoomReason = 'Flee' | 'Clear';
export type GameEvent =
  | {kind: 'EnterRoom'; reason: EnterRoomReason}
  | {kind: 'Fight'; card: DonsolCard; totalDamage: number}
  | {kind: 'ShieldAbsorb'; damage: number; broke: boolean}
  | {kind: 'DrinkPotion'; health: number; sick: boolean}
  | {kind: 'StateChange'; state: GameState}
  | {kind: 'PickShield'; card: DonsolCard};

type GameEventKind = GameEvent['kind'];
type GameEventMap = {[E in GameEvent as E['kind']]: E};
type WithoutKind<D> = Omit<D, 'kind'>;

export class GameEventHistory extends ChangeNotifier {
  private _history: GameEvent[] = [];

  public get history(): GameEvent[] {
    return [...this._history];
  }

  constructor(changeHandler: ChangeHandler) {
    super(changeHandler);
  }

  public add<K extends GameEventKind, D extends GameEventMap[K]>(
    kind: K,
    data: WithoutKind<D>,
  ) {
    this._history.unshift({...data, kind} as D);
    this.notifyObserver();
  }

  reset(): void {
    this._history = [];
    this.notifyObserver();
  }

  private findLastEventOfKind<
    K extends GameEventKind,
    D extends GameEventMap[K],
  >(searchKind: K): D | undefined {
    const event: GameEvent | undefined = this._history.find(
      ({kind}) => kind === searchKind,
    );
    if (event) {
      return event as D;
    } else {
      return undefined;
    }
  }

  private findEventsOfKind<K extends GameEventKind, D extends GameEventMap[K]>(
    searchKind: K,
  ): D[] {
    return this.history.filter(({kind}) => kind === searchKind) as D[];
  }

  public get lastEnterRoomReason(): EnterRoomReason | undefined {
    return this.findLastEventOfKind('EnterRoom')?.reason;
  }

  public get roomCount(): number {
    return this.findEventsOfKind('EnterRoom').length;
  }
}
