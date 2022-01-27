import { Base } from '@/models/base'

export class Geo extends Base {
  constructor(key: number | null, public speed: number) {
    super(key)
  }

  public static create(position: GeolocationPosition): Geo | null {
    const speed = position.coords.speed
    if (speed === null) {
      return null
    }
    return new Geo(null, speed)
  }

  get speedMs(): number {
    return this.speed
  }
  get speedKmh(): number {
    return (this.speed * 60 * 60) / 1000
  }
}
