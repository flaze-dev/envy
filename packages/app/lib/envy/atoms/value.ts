import {emitSetValue, onSetValue} from "../events/setValueEvent";
import Counter from "../utils/Counter";


export const value = <V>(value: V) => {
  const __id = Counter.getNext();
  let __value = value;

  // Methods
  const get = (): V => {
    return __value;
  }

  const set = (value: V | ((v: V) => V)) => {
    __value = (typeof value === "function") ? (value as (v: V) => V)(__value) : value;
    emitSetValue(__id, __value);
  }

  const on = (type: "update", callback: (value: V) => void) => {
    return onSetValue((id) => (id === __id) && callback(__value));
  };

  return {
    __id,
    __value,
    get,
    set,
    on,
  };
}

export type Value<T> = ReturnType<typeof value<T>>;
