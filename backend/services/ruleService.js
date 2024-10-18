const { parseRuleStringToAST, evaluateAST } = require('../utils/astUtils');

exports.createRule = (ruleString) => {
    return parseRuleStringToAST(ruleString);
};

exports.combineRules = (ruleStrings) => {
    // Logic for combining multiple ASTs into one
    const combinedAST = ruleStrings.reduce((acc, ruleString) => {
        const ast = parseRuleStringToAST(ruleString);
        return { type: 'AND', left: acc, right: ast }; // Example combination
    });
    return combinedAST;
};

exports.evaluateRule = (ruleAst, userData) => {
    return evaluateAST(ruleAst, userData);
};
