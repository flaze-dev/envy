import {createNanoEvents} from "nanoevents";


interface Events {
  setValue: (id: number, value: any) => void;
}

const emitter = createNanoEvents<Events>();

export const emitSetValue = <V>(id: number, value: V) => {
  emitter.emit("setValue", id, value);
}

export const onSetValue = <V>(callback: (id: number, value: V) => void) => {
  return emitter.on("setValue", (id, value) => {
    callback(id, value);
  });
}
