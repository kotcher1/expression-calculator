function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    const openBracket = '(';
    const closeBracket = ')';
    let actualExpression = '';

    while (!(expr.indexOf(openBracket) === -1 && expr.indexOf(closeBracket) === -1)) {

        let openBracketsNumber = 0;
        let closeBracketsNumber = 0;
        let openBracketsArray = [];
        let closeBracketsArray = [];

        expr = expr.replace(/ /g, '');
        for (let i = 0; i <= expr.length - 1; i++) {
            if (expr[i] === openBracket) {
                openBracketsNumber += 1;
                openBracketsArray.push(i);
            } else if (expr[i] === closeBracket) {
                closeBracketsNumber += 1;
                closeBracketsArray.push(i);
            }
        }

        if (openBracketsNumber !== closeBracketsNumber) {
            throw ('ExpressionError: Brackets must be paired');
        }

        let rightSymbolNumber = openBracketsArray.length - 1;
        let leftSymbolNumber = 0;

        while (openBracketsArray[rightSymbolNumber] > closeBracketsArray[0]) {
            rightSymbolNumber -= 1;
        }

        actualExpression = expr.slice(openBracketsArray[rightSymbolNumber], closeBracketsArray[leftSymbolNumber] + 1);
        let originalExpression = expr.slice(openBracketsArray[rightSymbolNumber], closeBracketsArray[leftSymbolNumber] + 1);

        while (!(actualExpression.indexOf('/') === -1 &&  actualExpression.indexOf('*') === -1)) {
        
            for (let j = 1; j <= actualExpression.length - 1; j++) {
                
                if (actualExpression[j] === '*') {
                    let rightNumber = '';
                    let leftNumber = '';
                    for (let li = 1; !isNaN(Number(actualExpression[j - li])) || (actualExpression[j - li] === '-' && isNaN(actualExpression[j - li - 1])) || actualExpression[j - li] === '.'; li++) {
                        leftNumber = actualExpression[j - li] + leftNumber;
                    }
                    for (let ri = 1; !isNaN(Number(actualExpression[j + ri])) || (actualExpression[j + ri] === '-' && actualExpression[j + ri - 1] === '*') || actualExpression[j + ri] === '.'; ri++) {
                        rightNumber = rightNumber + actualExpression[j + ri];
                    }
                    let newNumber = String((Number(leftNumber) * Number(rightNumber)).toFixed(20));
                    actualExpression = actualExpression.replace(leftNumber + actualExpression[j] + rightNumber, newNumber);
                    j = 1;

                } else if (actualExpression[j] === '/') {
                    if (actualExpression[j + 1] == 0) {
                        throw ('TypeError: Division by zero.');
                    }
                    let rightNumber = '';
                    let leftNumber = '';
                    for (let li = 1; !isNaN(Number(actualExpression[j - li])) || (actualExpression[j - li] === '-' && isNaN(actualExpression[j - li - 1])) || actualExpression[j - li] === '.'; li++) {
                        leftNumber = actualExpression[j - li] + leftNumber;
                    }
                    for (let ri = 1; !isNaN(Number(actualExpression[j + ri])) || (actualExpression[j + ri] === '-' && actualExpression[j + ri - 1] === '/') || actualExpression[j + ri] === '.'; ri++) {
                        rightNumber = rightNumber + actualExpression[j + ri];
                    }
                    let newNumber = String((Number(leftNumber) / Number(rightNumber)).toFixed(20));
                    actualExpression = actualExpression.replace(leftNumber + actualExpression[j] + rightNumber, newNumber);
                    j = 1;
                }
            }

        }

        while (!((actualExpression.indexOf('-') === -1 || (actualExpression.split(/\-/g).length - 1 === 1 && actualExpression.indexOf('-') === 1)) && actualExpression.indexOf('+') === -1)) {

            for (let j = 1; j <= actualExpression.length - 1; j++) {
                if (actualExpression[j] === '+') {
                    let rightNumber = '';
                    let leftNumber = '';
                    for (let li = 1; !isNaN(Number(actualExpression[j - li])) || (actualExpression[j - li] === '-' && isNaN(actualExpression[j - li - 1])) || actualExpression[j - li] === '.'; li++) {
                        leftNumber = actualExpression[j - li] + leftNumber;
                    }
                    for (let ri = 1; !isNaN(Number(actualExpression[j + ri])) || (actualExpression[j + ri] === '-' && actualExpression[j + ri - 1] === '+') || actualExpression[j + ri] === '.'; ri++) {
                        rightNumber = rightNumber + actualExpression[j + ri];
                    }
                    let newNumber = String(Number(leftNumber) + Number(rightNumber));
                    actualExpression = actualExpression.replace(leftNumber + actualExpression[j] + rightNumber, newNumber);
                    j = 1;

                } else if (actualExpression[j] === '-') {
                    let rightNumber = '';
                    let leftNumber = '';
                    if (actualExpression[j - 1] !== '('){
                        for (let li = 1; !isNaN(Number(actualExpression[j - li])) || (actualExpression[j - li] === '-' && isNaN(actualExpression[j - li - 1])) || actualExpression[j - li] === '.'; li++) {
                            leftNumber = actualExpression[j - li] + leftNumber;
                        }
                        for (let ri = 1; !isNaN(Number(actualExpression[j + ri])) || (actualExpression[j + ri] === '-' && actualExpression[j + ri - 1] === '-') || actualExpression[j + ri] === '.'; ri++) {
                            rightNumber = rightNumber + actualExpression[j + ri];
                        }
                        let newNumber = String(Number(leftNumber) - Number(rightNumber));
                        actualExpression = actualExpression.replace(leftNumber + actualExpression[j] + rightNumber, newNumber);
                        j = 1;
                    }
                    
                }
            }
        }

        actualExpression = actualExpression.replace(/[\(\)]/g, '');
        expr = expr.replace(originalExpression, actualExpression);
    }

    expr = expr.replace(/ /g, '');
    actualExpression = expr;

    while (!(actualExpression.indexOf('/') === -1 &&  actualExpression.indexOf('*') === -1)) {
        
        for (let j = 1; j <= actualExpression.length - 1; j++) {
            if (actualExpression[j] === '*') {
                let rightNumber = '';
                let leftNumber = '';
                for (let li = 1; !isNaN(Number(actualExpression[j - li])) || (actualExpression[j - li] === '-' && isNaN(actualExpression[j - li - 1])) || actualExpression[j - li] === '.'; li++) {
                    leftNumber = actualExpression[j - li] + leftNumber;
                }
                for (let ri = 1; !isNaN(Number(actualExpression[j + ri])) || (actualExpression[j + ri] === '-' && actualExpression[j + ri - 1] === '*') || actualExpression[j + ri] === '.'; ri++) {
                    rightNumber = rightNumber + actualExpression[j + ri];
                }
                let newNumber = String((Number(leftNumber) * Number(rightNumber)).toFixed(20));
                actualExpression = actualExpression.replace(leftNumber + actualExpression[j] + rightNumber, newNumber);
                j = 1;

            } else if (actualExpression[j] === '/') {
                if (actualExpression[j + 1] == 0) {
                    throw ('TypeError: Division by zero.');
                }
                let rightNumber = '';
                let leftNumber = '';
                for (let li = 1; !isNaN(Number(actualExpression[j - li])) || (actualExpression[j - li] === '-' && isNaN(actualExpression[j - li - 1])) || actualExpression[j - li] === '.'; li++) {
                    leftNumber = actualExpression[j - li] + leftNumber;
                }
                for (let ri = 1; !isNaN(Number(actualExpression[j + ri])) || (actualExpression[j + ri] === '-' && actualExpression[j + ri - 1] === '/') || actualExpression[j + ri] === '.'; ri++) {
                    rightNumber = rightNumber + actualExpression[j + ri];
                }
                let newNumber = String((Number(leftNumber) / Number(rightNumber)).toFixed(20));
                actualExpression = actualExpression.replace(leftNumber + actualExpression[j] + rightNumber, newNumber);
                j = 1;
            }
        }

    }
    
    while (!((actualExpression.indexOf('-') === -1 || (actualExpression.split(/\-/g).length - 1 === 1 && actualExpression.indexOf('-') === 0)) && actualExpression.indexOf('+') === -1)) {

        for (let j = 1; j <= actualExpression.length - 1; j++) {
            if (actualExpression[j] === '+') {
                let rightNumber = '';
                let leftNumber = '';
                for (let li = 1; !isNaN(Number(actualExpression[j - li])) || (actualExpression[j - li] === '-' && isNaN(actualExpression[j - li - 1])) || actualExpression[j - li] === '.'; li++) {
                    leftNumber = actualExpression[j - li] + leftNumber;
                }
                for (let ri = 1; !isNaN(Number(actualExpression[j + ri])) || (actualExpression[j + ri] === '-' && actualExpression[j + ri - 1] === '+') || actualExpression[j + ri] === '.'; ri++) {
                    rightNumber = rightNumber + actualExpression[j + ri];
                }
                let newNumber = String(Number(leftNumber) + Number(rightNumber));
                actualExpression = actualExpression.replace(leftNumber + actualExpression[j] + rightNumber, newNumber);
                j = 1;

            } else if (actualExpression[j] === '-') {
                let rightNumber = '';
                let leftNumber = '';
                if (actualExpression[j - 1] !== '('){
                    for (let li = 1; !isNaN(Number(actualExpression[j - li])) || (actualExpression[j - li] === '-' && isNaN(actualExpression[j - li - 1])) || actualExpression[j - li] === '.'; li++) {
                        leftNumber = actualExpression[j - li] + leftNumber;
                    }
                    for (let ri = 1; !isNaN(Number(actualExpression[j + ri])) || (actualExpression[j + ri] === '-' && actualExpression[j + ri - 1] === '-') || actualExpression[j + ri] === '.'; ri++) {
                        rightNumber = rightNumber + actualExpression[j + ri];
                    }
                    let newNumber = String(Number(leftNumber) - Number(rightNumber));
                    actualExpression = actualExpression.replace(leftNumber + actualExpression[j] + rightNumber, newNumber);
                    j = 1;
                }
            }
        }
    }

    expr = Number(actualExpression);
    return expr;
}  

module.exports = {
    expressionCalculator
}