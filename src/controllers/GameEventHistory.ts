import {DonsolCard} from './DonsolCard';
import type {GameState} from './GameController';
import {ChangeHandler, ChangeNotifier} from './Observable';

type EnterRoomReason = 'Begin' | 'Flee' | 'Clear';
export type GameEvent =
  | {kind: 'EnterRoom'; reason: EnterRoomReason}
  | {kind: 'Fight'; monster: DonsolCard; hurt: number}
  | {
      kind: 'Block';
      amount: number;
      broke: boolean;
      monster: DonsolCard;
      shieldId?: string;
    }
  | {kind: 'DrinkPotion'; gainedHealth: number}
  | {kind: 'StateChange'; state: GameState}
  | {kind: 'PlayCard'; card: DonsolCard}
  | {kind: 'PickShield'; card: DonsolCard};

type GameEventKind = GameEvent['kind'];
type GameEventMap = {[E in GameEvent as E['kind']]: E};
type WithoutKind<D> = Omit<D, 'kind'>;

export class GameEventHistory extends ChangeNotifier {
  private _history: GameEvent[] = [];

  constructor(changeHandler: ChangeHandler, init?: GameEvent[]) {
    super(changeHandler);

    if (init) {
      this._history = [...init];
    } else {
      this._history = [];
    }
  }

  public get history(): GameEvent[] {
    return [...this._history];
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

  public findEventsOfKind<K extends GameEventKind, D extends GameEventMap[K]>(
    searchKind: K,
  ): D[] {
    return this.history.filter(({kind}) => kind === searchKind) as D[];
  }

  public get roomCount(): number {
    return this.findEventsOfKind('EnterRoom').length;
  }
}
