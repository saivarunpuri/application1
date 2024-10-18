const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    ruleId: String,
    ast: Object, // Store AST in MongoDB as a JSON object
});

module.exports = mongoose.model('Rule', ruleSchema);
