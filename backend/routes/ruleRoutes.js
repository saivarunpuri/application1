// backend/routes/ruleRoutes.js
const express = require('express');
const router = express.Router();
const {
    createRuleHandler,
    combineRulesHandler,
    evaluateRuleHandler,
} = require('../controllers/ruleController');

router.post('/create', createRuleHandler);
router.post('/combine', combineRulesHandler);
router.post('/evaluate', evaluateRuleHandler);

module.exports = router;
