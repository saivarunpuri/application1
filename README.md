
# Rule Engine Application

## Overview

This project implements a rule engine with a 3-tier architecture where users can create rules, combine them, and evaluate JSON data against the rules. The rule engine uses Abstract Syntax Tree (AST) for parsing and manipulating rules, allowing dynamic rule creation, modification, and combination.

The frontend is built using React, and the backend is powered by Node.js with Express. The backend handles rule creation, combination, and evaluation, while the frontend allows users to interact with these functionalities through a form interface.

## Features

- **Create Rule:** Allows users to input rule strings and generates an Abstract Syntax Tree (AST) for the rule.
- **Combine Rules:** Allows users to combine multiple rules into a single AST.
- **Evaluate Rule:** Takes a JSON input with user data and evaluates the combined rule against it, returning whether the rule passes or fails.

## Tech Stack

- **Frontend:** React, Axios
- **Backend:** Node.js, Express
- **AST Parsing:** Custom rule parsing logic (implemented in `astUtils.js`)
- **Styling:** Custom CSS

## Directory Structure

```
my-app/
│
├── backend/
│   ├── controllers/
│   │   └── ruleController.js  # Handles rule creation, combination, and evaluation logic
│   ├── routes/
│   │   └── ruleRoutes.js      # API routes for rule operations
│   └── server.js              # Main server file
│
├── src/
│   ├── components/
│   │   └── RuleForm.js        # React component for rule form
│   ├── services/
│   │   └── api.js             # API calls to backend
│   └── App.js                 # Main React App component
│
├── public/
│   └── index.html             # Entry point for React
│
└── package.json               # Project dependencies and scripts
```

## Installation and Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (if you have a database for storing rules, though it's optional in this case)
  
### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/saivarunpuri/application1.git
   cd my-app
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Start the Backend Server**:
   ```bash
   node server.js
   ```

   The backend will run on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the Frontend**:
   ```bash
   cd ../
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Frontend**:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

### Testing with Postman

To test the APIs via Postman:

- **Create Rule**: 
  - Endpoint: `POST http://localhost:5000/api/rules/create`
  - Body (JSON):
    ```json
    {
      "rule": "(age > 30 AND department = 'Sales')"
    }
    ```

- **Combine Rules**: 
  - Endpoint: `POST http://localhost:5000/api/rules/combine`
  - Body (JSON):
    ```json
    {
      "rules": ["(age > 30)", "(department = 'Sales')"]
    }
    ```

- **Evaluate Rule**: 
  - Endpoint: `POST http://localhost:5000/api/rules/evaluate`
  - Body (JSON):
    ```json
    {
      "ast": { /* Combined AST from the combine rules */ },
      "data": {
        "age": 35,
        "department": "Sales",
        "salary": 60000,
        "experience": 3
      }
    }
    ```

## Usage

1. **Create a Rule**:
   - Enter a rule string in the "Create Rule" form and click "Create Rule". The rule's AST will be displayed.

2. **Combine Rules**:
   - Enter multiple rules (comma-separated) and click "Combine Rules". The combined AST will be displayed.

3. **Evaluate Rule**:
   - Enter a JSON object with attributes (e.g., `{"age": 35, "department": "Sales"}`) in the "Evaluate Rule" form, and the evaluation result (True/False) will be shown based on whether the rule passes.

