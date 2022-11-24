import {useEffect, useState} from "react";
import {Partial} from "../atoms/partial";
import {Value} from "../atoms/value";
import {View} from "../atoms/view";


export const useValue = <V>(value: Value<V> | View<V> | Partial<any, V>) => {
  const [__value, __setValue] = useState(value.get());

  const listener = (value: V) => {
    __setValue(value);
  }

  useEffect(() => value.on("update", listener), []);
  return __value;
}