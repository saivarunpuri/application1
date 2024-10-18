// utils/ruleUtils.js
class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type; // "operator" or "operand"
        this.value = value; // For operand nodes, e.g., comparison value
        this.left = left; // Reference to left child
        this.right = right; // Reference to right child
    }
}

// Function to create an AST from a rule string
const createRule = (ruleString) => {
    const tokens = ruleString.match(/([()])|[^() ]+/g); // Tokenize the input rule string
    let index = 0;

    const parseExpression = () => {
        let leftNode = parseOperand();

        while (index < tokens.length) {
            if (tokens[index] === 'AND' || tokens[index] === 'OR') {
                const operator = tokens[index++];
                const rightNode = parseOperand();
                leftNode = new Node("operator", operator, leftNode, rightNode);
            } else {
                break;
            }
        }

        return leftNode;
    };

    const parseOperand = () => {
        if (tokens[index] === '(') {
            index++;
            const node = parseExpression();
            index++; // Consume ')'
            return node;
        } else {
            const operand = tokens[index++];
            const operator = tokens[index++];
            const value = tokens[index++];
            return new Node("operand", { operand, operator, value });
        }
    };

    return parseExpression();
};

// Function to combine multiple rules into a single AST
const combineRules = (rules) => {
    let combinedAST = null;

    rules.forEach(ruleString => {
        const ast = createRule(ruleString);
        combinedAST = combineASTs(combinedAST, ast);
    });

    return combinedAST;
};

// Helper function to combine two ASTs
const combineASTs = (ast1, ast2) => {
    if (!ast1) return ast2;
    if (!ast2) return ast1;

    const rootNode = new Node("operator", "AND", ast1, ast2);
    return rootNode;
};

// Function to evaluate a rule against the provided data
// backend/utils/ruleUtils.js

function evaluate_rule(ast, data) {
    if (ast.type === 'literal') {
        return ast.value;
    }

    if (ast.type === 'variable') {
        return data[ast.name];
    }

    const left = evaluate_rule(ast.left, data);
    const right = evaluate_rule(ast.right, data);

    switch (ast.operator) {
        case 'AND':
            return left && right;
        case 'OR':
            return left || right;
        case '>':
            return left > right;
        case '<':
            return left < right;
        case '=':
            return left === right;
        // Add other operators as needed
        default:
            throw new Error(`Unknown operator: ${ast.operator}`);
    }
}


// Export the utility functions
module.exports = {
    createRule,
    combineRules,
    evaluate_rule,
};
