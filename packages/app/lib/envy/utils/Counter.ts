

class Counter {

  private static value: number = 0;

  public static getNext(): number {
    return this.value++;
  }
}

export default Counter;