import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rules';

const createRule = async (ruleString) => {
    const response = await axios.post(`${API_URL}/create_rule`, { ruleString });
    return response.data;
};

const combineRules = async (ruleStrings) => {
    const response = await axios.post(`${API_URL}/combine_rules`, { ruleStrings });
    return response.data;
};

const evaluateRule = async (ast, userData) => {
    const response = await axios.post(`${API_URL}/evaluate_rule`, { ast, userData });
    return response.data;
};

export default { createRule, combineRules, evaluateRule };
