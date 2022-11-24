import {emitSetValue, onSetValue} from "../events/setValueEvent";
import Counter from "../utils/Counter";
import {Value} from "./value";


export const partial = <V, S>(value: Value<V>, selector: (value: V) => S) => {
  const __id = Counter.getNext();
  let __selection = selector(value.__value);

  // Change Listener
  value.on("update", (value) => {
    const selection = selector(value);

    // console.log(selection, __selection);

    if (JSON.stringify(__selection) !== JSON.stringify(selection)) {
      __selection = selection;
      emitSetValue(__id, __selection);
    }
  });

  // Methods
  const get = (): S => {
    return __selection;
  }

  const on = (type: "update", callback: (selection: S) => void) => {
    return onSetValue((id) => (id === __id) && callback(__selection));
  };

  return {
    __id,
    __value: __selection,
    get,
    on,
  };
}

export type Partial<V, S> = ReturnType<typeof partial<V, S>>;
