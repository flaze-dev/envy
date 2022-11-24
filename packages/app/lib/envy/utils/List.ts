export type ValueOrList<T> = T | T[];

class List {

  public static get<T>(value: ValueOrList<T>) {
    return Array.isArray(value) ? value : [value];
  }

}

export default List;