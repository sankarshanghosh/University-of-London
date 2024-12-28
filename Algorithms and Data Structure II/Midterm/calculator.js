// CLASS PostfixCalculator
class PostfixCalculator {
    // METHOD INITIALIZE()
    constructor() {
        // THIS.STACK ← EMPTY_LIST
        this.stack = [];
        // THIS.SYMBOL_TABLE ← LIST_OF_LENGTH(26, VALUE NIL)  // A-Z
        this.symbolTable = Array(26).fill(undefined);
    }

    // METHOD GET_INDEX(VARIABLE)
    getIndex(variable) {
        // RETURN ASCII(VARIABLE) - ASCII("A")
        return variable.charCodeAt(0) - 'A'.charCodeAt(0);
    }

    // METHOD PROCESS_TOKEN(TOKEN)
    processToken(token) {
        // IF IS_NUMBER(TOKEN) THEN
        if (!isNaN(token)) {
            // PUSH(TOKEN, THIS.STACK)
            this.stack.push(Number(token));
            // ELSE IF IS_VARIABLE(TOKEN) THEN
        } else if (token.match(/[A-Z]/)) {
            // INDEX ← THIS.GET_INDEX(TOKEN)
            const index = this.getIndex(token);
            // VALUE ← THIS.SYMBOL_TABLE[INDEX]
            if (this.symbolTable[index] !== undefined) {
                // PUSH(VALUE, THIS.STACK)
                this.stack.push(this.symbolTable[index]);
            } else {
                // PUSH(TOKEN, THIS.STACK)
                this.stack.push(token);
            }
            // ELSE IF TOKEN = "=" THEN
        } else if (token === '=') {
            // VALUE ← POP(THIS.STACK)
            const value = this.stack.pop();
            // VARIABLE ← POP(THIS.STACK)
            const variable = this.stack.pop();
            // IF IS_VARIABLE(VARIABLE) THEN
            if (typeof variable === 'string' && variable.match(/[A-Z]/)) {
                // INDEX ← THIS.GET_INDEX(VARIABLE)
                const index = this.getIndex(variable);
                // THIS.SYMBOL_TABLE[INDEX] ← VALUE
                this.symbolTable[index] = value;
                // ELSE
            } else {
                // THROW_ERROR("Invalid assignment")
                throw new Error('Invalid assignment');
            }
            // ELSE
        } else {
            // B ← POP(THIS.STACK)
            const b = this.stack.pop();
            // A ← POP(THIS.STACK)
            const a = this.stack.pop();
            // RESULT ← NIL
            let result;

            // IF TOKEN = "+" THEN
            switch (token) {
                case '+': result = a + b; break;
                // ELSE IF TOKEN = "-" THEN
                case '-': result = a - b; break;
                // ELSE IF TOKEN = "*" THEN
                case '*': result = a * b; break;
                // ELSE IF TOKEN = "/" THEN
                case '/':
                    // IF B = 0 THEN THROW_ERROR("Division by zero")
                    if (b === 0) throw new Error('Division by zero');
                    result = a / b;
                    break;
                // ELSE IF TOKEN = "%" THEN
                case '%':
                    if (b === 0) throw new Error('Division by zero');
                    result = a % b;
                    break;
                // ELSE IF TOKEN = "^" THEN
                case '^': result = Math.pow(a, b); break;
                // ELSE
                default: throw new Error(`Unknown operator: ${token}`);
            }

            // PUSH(RESULT, THIS.STACK)
            this.stack.push(result);
        }
    }

    // METHOD EVALUATE(EXPRESSION)
    evaluate(expression) {
        // TOKENS ← SPLIT(EXPRESSION, " ")
        const tokens = expression.split(' ');
        // FOR EACH TOKEN IN TOKENS DO
        tokens.forEach(token => this.processToken(token));
        // END FOR
        // RETURN TOP(THIS.STACK)
        return this.stack.length ? this.stack[this.stack.length - 1] : null;
    }

    // METHOD SEARCH(VARIABLE)
    searchVariable(variable) {
        // INDEX ← THIS.GET_INDEX(VARIABLE)
        const index = this.getIndex(variable);
        // VALUE ← THIS.SYMBOL_TABLE[INDEX]
        if (this.symbolTable[index] !== undefined) {
            // RETURN VARIABLE + " = " + VALUE
            return `${variable} = ${this.symbolTable[index]}`;
        } else {
            // RETURN VARIABLE + " is undefined."
            return `${variable} is undefined.`;
        }
    }

    // METHOD DELETE(VARIABLE)
    deleteVariable(variable) {
        // INDEX ← THIS.GET_INDEX(VARIABLE)
        const index = this.getIndex(variable);
        // IF THIS.SYMBOL_TABLE[INDEX] ≠ NIL THEN
        if (this.symbolTable[index] !== undefined) {
            // THIS.SYMBOL_TABLE[INDEX] ← NIL
            this.symbolTable[index] = undefined;
            // RETURN VARIABLE + " has been deleted."
            return `${variable} has been deleted.`;
        } else {
            // RETURN VARIABLE + " is already undefined."
            return `${variable} is already undefined.`;
        }
    }

    // METHOD DISPLAY_ALL()
    displayAllVariables() {
        // VARIABLES ← EMPTY_LIST
        const vars = [];
        // FOR INDEX FROM 0 TO 25 DO
        this.symbolTable.forEach((value, index) => {
            // VARIABLE ← CHAR(ASCII("A") + INDEX)
            const variable = String.fromCharCode('A'.charCodeAt(0) + index);
            // VALUE ← THIS.SYMBOL_TABLE[INDEX]
            if (value !== undefined) {
                // ADD(VARIABLE + " = " + VALUE, VARIABLES)
                vars.push(`${variable} = ${value}`);
            }
        });
        // END FOR
        // IF LENGTH(VARIABLES) > 0 THEN
        return vars.length > 0 ? vars.join('\n') : 'No variables defined.';
    }
}



// Initialize the calculator
// CALCULATOR ← CREATE PostfixCalculator()
const calculator = new PostfixCalculator();

// Print program instructions
// PRINT "Welcome to the Postfix++ Calculator!"
// PRINT "Enter Postfix expressions or commands:"
// PRINT "Examples:"
// PRINT "  A 5 =            (assign 5 to A)"
// PRINT "  B 3 =            (assign 3 to B)"
// PRINT "  A B +            (add A and B)"
// PRINT "Commands:"
// PRINT "  SEARCH A         (find the value of variable A)"
// PRINT "  DEL A            (delete variable A)"
// PRINT "  SHOW             (display all variables)"
// PRINT "  EXIT             (quit the program)"
console.log("Welcome to the Postfix++ Calculator!");
console.log("Enter Postfix expressions or commands:");
console.log("Examples:");
console.log("  A 5 =            (assign 5 to A)");
console.log("  B 3 =            (assign 3 to B)");
console.log("  A B +            (add A and B)");
console.log("Commands:");
console.log("  SEARCH A         (find the value of variable A)");
console.log("  DEL A            (delete variable A)");
console.log("  SHOW             (display all variables)");
console.log("  EXIT             (quit the program)");

// Continuously process user input
// WHILE TRUE DO
process.stdin.on('data', (data) => {
    // INPUT ← READ_INPUT()
    const input = data.toString().trim();

    // IF INPUT = "EXIT" THEN
    if (input.toUpperCase() === 'EXIT') {
        // PRINT "Goodbye!"
        console.log("Goodbye!");
        // BREAK
        process.exit();
        // ELSE IF INPUT STARTS_WITH "SEARCH" THEN
    } else if (input.toUpperCase().startsWith('SEARCH')) {
        // VARIABLE ← EXTRACT_VARIABLE(INPUT)
        const variable = input.split(' ')[1];
        // IF IS_VALID_VARIABLE(VARIABLE) THEN
        if (variable && variable.match(/[A-Z]/)) {
            // RESULT ← CALCULATOR.SEARCH(VARIABLE)
            console.log(calculator.searchVariable(variable));
            // ELSE
        } else {
            // PRINT "Invalid SEARCH command. Use: SEARCH A"
            console.log("Invalid SEARCH command. Use: SEARCH A");
        }
        // ELSE IF INPUT STARTS_WITH "DEL" THEN
    } else if (input.toUpperCase().startsWith('DEL')) {
        // VARIABLE ← EXTRACT_VARIABLE(INPUT)
        const variable = input.split(' ')[1];
        // IF IS_VALID_VARIABLE(VARIABLE) THEN
        if (variable && variable.match(/[A-Z]/)) {
            // RESULT ← CALCULATOR.DELETE(VARIABLE)
            console.log(calculator.deleteVariable(variable));
            // ELSE
        } else {
            // PRINT "Invalid DEL command. Use: DEL A"
            console.log("Invalid DEL command. Use: DEL A");
        }
        // ELSE IF INPUT = "SHOW" THEN
    } else if (input.toUpperCase() === 'SHOW') {
        // PRINT CALCULATOR.DISPLAY_ALL()
        console.log(calculator.displayAllVariables());
        // ELSE
    } else {
        // TRY
        try {
            // RESULT ← CALCULATOR.EVALUATE(INPUT)
            const result = calculator.evaluate(input);
            // IF RESULT ≠ NIL THEN
            if (result !== null) {
                // PRINT "Result: " + RESULT
                console.log(`Result: ${result}`);
            }
            // CATCH ERROR
        } catch (err) {
            // PRINT "Error: " + ERROR.MESSAGE
            console.log(`Error: ${err.message}`);
        }
    }
});

