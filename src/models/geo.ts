import { Base } from '@/models/base'

export class Geo extends Base {
  constructor(
    key: number | null,
    public speed: number,
    public accuracy: number,
    public altitudeAccuracy: number,
  ) {
    super(key)
  }

  public static create(position: GeolocationPosition): Geo | null {
    const speed = position.coords.speed
    const accuracy = position.coords.accuracy
    const altitudeAccuracy = position.coords.altitudeAccuracy
    if (speed === null ) {
      return null
    }
    return new Geo(null, speed, accuracy ?? -1, altitudeAccuracy ?? -1)
  }

  get speedMs(): number {
    return this.speed
  }
  get speedKmh(): number {
    return (this.speed * 60 * 60) / 1000
  }
}
