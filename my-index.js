class Node {
    value;
    next;
    constructor(value) {
        this.value = value;
    }
}

export default class MyQueue {
    #header;
    #tail;
    #size;
    constructor() {
        this.clear();
    }
    // 添加元素
    enqueue (value) {
        const node = new Node(value);
        if (this.#header) {
            // *设置上一个node的next属性为当前node实例；实现链式查找元素
            this.#tail.next = node;
            // 更新当前节点
            this.#tail = node;
        }
        // 队列插入第一个元素
        else {
            this.#header = node;
            this.#tail = node;
        }
        this.#size++;
    }
    // 删除元素
    dequeue () {
        const current = this.#header;
        // 队列中没有元素 返回undefined
        if (!current) return;
        // 队列尾部元素替代头部元素 完成删除操作
        this.#header = this.#header.next;
        this.#size--;
        // 返回被删除的元素
        return current.value;
    }
    // 清除队列
    clear () {
        this.#size = 0;
        this.#header = undefined;
        this.#tail = undefined;
    }
    // 获取队列长度 一个get函数
    get size () {
        return this.#size;
    }
    // 定义迭代的构造器
    *[Symbol.iterator] () {
        let current = this.#header;
        while (current) {
            yield current.value; // for的每一次都会返回yield current.value的值。
            current = current.next; // 循环队列下一个元素
        }
    }
}