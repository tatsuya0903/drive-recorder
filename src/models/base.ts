class Key {
  private static num = 1
  public static create(): number {
    return this.num++
  }
}

export abstract class Base {
  public readonly key: number
  constructor(key: number | null) {
    this.key = key ?? Key.create()
  }
}
