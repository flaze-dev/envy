import {emitSetValue, onSetValue} from "../events/setValueEvent";
import Counter from "../utils/Counter";
import List, {ValueOrList} from "../utils/List";
import {Value} from "./value";


export const view = <V>(dependencies: ValueOrList<Value<any>>, compute: () => V) => {
  const __id = Counter.getNext();
  let __value = compute();

  const deps = List.get(dependencies);

  for (const dep of deps) {
    dep.on("update", () => {
      __value = compute();
      emitSetValue(__id, __value);
    });
  }

  // Methods
  const get = (): V => {
    return __value;
  }

  const on = (type: "update", callback: (value: V) => void) => {
    return onSetValue((id) => (id === __id) && callback(__value));
  };

  return {
    __id,
    __value,
    get,
    on,
  };
}

export type View<T> = ReturnType<typeof view<T>>;
