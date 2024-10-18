// src/components/RuleForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './RuleForm.css'; // Import the CSS file for styling

const RuleForm = () => {
    const [ruleString, setRuleString] = useState('');
    const [combinedRules, setCombinedRules] = useState('');
    const [evaluateData, setEvaluateData] = useState('');
    const [result, setResult] = useState(null);
    const [evaluateResult, setEvaluateResult] = useState(null);

    const handleCreateRule = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/rules/create', { rule: ruleString });
            console.log('Created Rule AST:', response.data);
            setResult(response.data); // Update result with created rule AST
        } catch (error) {
            console.error('Error creating rule:', error);
        }
    };

    const handleCombineRules = async (e) => {
        e.preventDefault();
        try {
            const rulesArray = combinedRules.split(',').map(rule => rule.trim());
            const response = await axios.post('http://localhost:5000/api/rules/combine', { rules: rulesArray });
            console.log('Combined Rules AST:', response.data);
            setResult(response.data); // Update result with combined rules AST
        } catch (error) {
            console.error('Error combining rules:', error);
        }
    };

    const handleEvaluateRule = async (e) => {
        e.preventDefault();
        try {
            const dataToEvaluate = JSON.parse(evaluateData);
            // Send both AST and data for evaluation
            const response = await axios.post('http://localhost:5000/api/rules/evaluate', {
                ast: result, // Include combined AST
                data: dataToEvaluate
            });
            console.log('Evaluation Result:', response.data);
            setEvaluateResult(response.data.result); // Update result with evaluation outcome
        } catch (error) {
            console.error('Error evaluating rule:', error);
        }
    };

    return (
        <div className="rule-form">
            <h2>Rule Management</h2>
            
            <form onSubmit={handleCreateRule} className="form-section">
                <h3>Create Rule</h3>
                <label>
                    Rule String:
                    <input 
                        type="text" 
                        value={ruleString} 
                        onChange={(e) => setRuleString(e.target.value)} 
                        placeholder="e.g. (age > 30 AND department = 'Sales')"
                        required
                    />
                </label>
                <button type="submit">Create Rule</button>
            </form>

            <form onSubmit={handleCombineRules} className="form-section">
                <h3>Combine Rules</h3>
                <label>
                    Enter Rules (comma separated):
                    <input 
                        type="text" 
                        value={combinedRules} 
                        onChange={(e) => setCombinedRules(e.target.value)} 
                        placeholder="e.g. rule1, rule2"
                        required
                    />
                </label>
                <button type="submit">Combine Rules</button>
            </form>

            <form onSubmit={handleEvaluateRule} className="form-section">
                <h3>Evaluate Rule</h3>
                <label>
                    Enter Data (JSON format):
                    <textarea 
                        rows="3"
                        value={evaluateData} 
                        onChange={(e) => setEvaluateData(e.target.value)} 
                        placeholder='{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}'
                        required
                    />
                </label>
                <button type="submit">Evaluate Rule</button>
            </form>

            {result && (
                <div className="result">
                    <h4>Result:</h4>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}

            {evaluateResult !== null && (
                <div className="evaluate-result">
                    <h4>Evaluation Result:</h4>
                    <p>{evaluateResult ? 'User is eligible based on the rules.' : 'User is NOT eligible based on the rules.'}</p>
                </div>
            )}
        </div>
    );
};

export default RuleForm;
