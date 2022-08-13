import {useEffect, useState} from "react";

let id = 0;

// Containers
export const value = (value: any, actions: any = {}) => {
  const __id = id++;
  let __value = value;

  // Add Default Methods
  const result: any = {
    __id,
    get: () => {
      return __value;
    },
    set: (value: any) => {
      __value = (typeof value === "function") ? value(__value) : value;

      // Send out event
      const event = new CustomEvent("set-value", {detail: {id: __id, value: __value}});
      document.dispatchEvent(event);
    }
  };

  // Add Actions
  const keys = Object.keys(actions);

  for (const key of keys) {
    result[key as any] = () => {
      const updated = actions[key as any](__value);
      result.set(updated);
    };
  }

  return result;
}

export const view = (values: any[], callback: (values: any[]) => void) => {
  return {
    values,
    callback,
  };
}

// Hooks
export const useValue = (value: any) => {
  const [__value, __setValue] = useState(value.get());

  const listener = (e: Event) => {
    const {detail} = (e as any) as { detail: { id: number, value: any } };

    if (detail.id === value.__id) {
      const updated = value.get();
      __setValue(updated);
    }
  }

  useEffect(() => {
    document.addEventListener("set-value", listener);

    return () => {
      document.removeEventListener("set-value", listener);
    };
  }, []);

  return __value;
}

export const useView = (view: any) => {
  const {values, callback} = view;
  const valuesWithIds = values.map((v: any) => ({id: v.__id, value: v.get()}));
  const [__values, __setValues] = useState(valuesWithIds);

  const listener = (e: Event) => {
    const {detail} = (e as any) as { detail: { id: number, value: any } };

    const ids = values.map((v: any) => v.__id);
    if (ids.includes(detail.id)) {
      const value = values.find((v: any) => v.__id === detail.id)!;
      const updated = value.get();
      __setValues((s: any) => {
        return s.map((v: any) => {
          if (v.id === detail.id) {
            return {
              id: v.id,
              value: updated,
            };
          }

          return v;
        });
      });
    }
  }

  useEffect(() => {
    document.addEventListener("set-value", listener);

    return () => {
      document.removeEventListener("set-value", listener);
    };
  }, []);

  const plainValues = __values.map((v: any) => v.value);
  return callback(plainValues);
}
