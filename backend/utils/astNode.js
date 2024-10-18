class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type; // "operator" or "operand"
        this.left = left; // left child node
        this.right = right; // right child node (only for operators)
        this.value = value; // value for operand nodes (e.g., numbers, strings)
    }
}

module.exports = Node;
