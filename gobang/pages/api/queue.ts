export default class Queue {
    private queue: any[] = [];

    public push(item: any) {
        this.queue.push(item);
    }

    public pop() {
        return this.queue.shift();
    }

    public size() {
        return this.queue.length;
    }
}
