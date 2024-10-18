// backend/controllers/ruleController.js
const { create_rule, combine_rules, evaluate_rule } = require('../utils/astUtils'); // Ensure these functions are defined correctly

const createRuleHandler = async (req, res) => {
    try {
        const ruleString = req.body.rule; // Get rule string from request body
        const ruleAST = create_rule(ruleString); // Create AST from rule string
        res.json(ruleAST); // Return the generated AST as JSON
    } catch (error) {
        console.error('Error creating rule:', error); // Log the error for debugging
        res.status(500).json({ error: 'Error creating rule' }); // Return error response
    }
};

const combineRulesHandler = async (req, res) => {
    try {
        const rules = req.body.rules; // Get array of rules from request body
        const combinedAST = combine_rules(rules); // Combine rules into a single AST
        res.json(combinedAST); // Return the combined AST as JSON
    } catch (error) {
        console.error('Error combining rules:', error); // Log the error for debugging
        res.status(500).json({ error: 'Error combining rules' }); // Return error response
    }
};

const evaluateRuleHandler = async (req, res) => {
    try {
        const { ast, data } = req.body; // Get AST and user data from request body
        const result = evaluate_rule(ast, data); // Evaluate rule against data
        res.json({ result }); // Return evaluation result
    } catch (error) {
        console.error('Error evaluating rule:', error); // Log the error for debugging
        res.status(500).json({ error: 'Error evaluating rule' }); // Return error response
    }
};

module.exports = {
    createRuleHandler,
    combineRulesHandler,
    evaluateRuleHandler,
};
