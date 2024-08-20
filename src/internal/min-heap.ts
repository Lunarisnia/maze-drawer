import Vector2 from "./vector2.ts";

export class Weight {
    finalCost: number
    startCost: number
    endCost: number
    passable: boolean
    position: Vector2
    parent: Weight | null
    constructor(parent: Weight | null, finalCost: number, startCost: number, endCost: number, passable: boolean, position: Vector2) {
        this.finalCost = finalCost;
        this.startCost = startCost;
        this.endCost = endCost;
        this.passable = passable;
        this.position = position
        this.parent = parent
    }
}
export class MinHeap {
    private heap: Weight[] = [];

    private getParentIndex(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private getLeftChildIndex(index: number): number {
        return 2 * index + 1;
    }

    private getRightChildIndex(index: number): number {
        return 2 * index + 2;
    }

    private swap(index1: number, index2: number): void {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    private heapifyUp(): void {
        let index = this.heap.length - 1;
        while (this.getParentIndex(index) >= 0 && this.heap[this.getParentIndex(index)].finalCost > this.heap[index].finalCost) {
            this.swap(index, this.getParentIndex(index));
            index = this.getParentIndex(index);
        }
    }

    private heapifyDown(): void {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.getRightChildIndex(index) < this.heap.length && this.heap[this.getRightChildIndex(index)].finalCost < this.heap[smallerChildIndex].finalCost) {
                smallerChildIndex = this.getRightChildIndex(index);
            }

            if (this.heap[index].finalCost <= this.heap[smallerChildIndex].finalCost) {
                break;
            }

            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }

    insert(weight: Weight): void {
        for (const w of this.heap) {
            if (w == weight) {
                return
            }
        }
        this.heap.push(weight);
        this.heapifyUp();
    }

    extractMin(): Weight | undefined {
        if (this.heap.length === 0) {
            return undefined;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown();

        return min;
    }

    peek(): Weight | undefined {
        return this.heap.length > 0 ? this.heap[0] : undefined;
    }

    size(): number {
        return this.heap.length;
    }
}
