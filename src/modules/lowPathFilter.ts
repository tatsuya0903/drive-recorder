import { Acc } from '@/models/acc'

export class LowPathFilter {
  private static readonly defaultSize = 10

  private items: Acc[] = []
  constructor(public readonly size: number = LowPathFilter.defaultSize) {}

  public add(acc: Acc): void {
    this.items.unshift(acc)
    this.items.splice(this.size)
  }

  public renew(): Acc | null {
    const count = this.items.length
    if (count === null) {
      return null
    }

    let x = 0
    let y = 0
    let z = 0
    for (const item of this.items) {
      x += item.x
      y += item.y
      z += item.z
    }
    x /= count
    y /= count
    z /= count

    return new Acc(null, x, y, z)
  }
}
