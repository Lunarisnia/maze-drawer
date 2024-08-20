export default class Vector2 {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    zero(): boolean {
        return this.x == 0 && this.y == 0;
    }

    subtract(b: Vector2): Vector2 {
        return new Vector2(this.x - b.x, this.y - b.y)
    }

    length(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }
}
