import { Base } from '@/models/base'

export class Acc extends Base {
  static readonly gravity = 9.807

  constructor(key: number | null, public x: number, public y: number, public z: number) {
    super(key)
  }

  public static create(acceleration: DeviceMotionEventAcceleration | null): Acc | null {
    if (
      acceleration === null ||
      acceleration.x === null ||
      acceleration.y === null ||
      acceleration.z === null
    ) {
      return null
    }
    return new Acc(null, acceleration.x, acceleration.y, acceleration.z)
  }
}
