class CalculatorModel {
  constructor() {
    this.reset();
  }

  reset() {
    this.operand1 = null;
    this.operand2 = null;
    this.operator = null;
    this.displayValue = "0";
    this.expression = "";
    this.error = "";
    this.waitingForSecondOperand = false;
  }

  inputNumber(number) {
    if (this.error) {
      this.reset();
    }

    if (this.waitingForSecondOperand) {
      this.displayValue = number;
      this.waitingForSecondOperand = false;
      return;
    }

    this.displayValue = this.displayValue === "0" ? number : this.displayValue + number;
  }

  setOperator(nextOperator) {
    if (this.error) {
      this.reset();
    }

    const inputValue = Number(this.displayValue);

    if (this.operator && !this.waitingForSecondOperand) {
      this.operand2 = inputValue;
      const result = this.calculate(this.operand1, this.operand2, this.operator);
      if (result === null) {
        return;
      }
      this.operand1 = result;
      this.displayValue = this.formatNumber(result);
    } else if (this.operand1 === null) {
      this.operand1 = inputValue;
    }

    this.operator = nextOperator;
    this.waitingForSecondOperand = true;
    this.expression = `${this.operand1} ${this.operator}`;
  }

  evaluate() {
    if (this.error || this.operator === null || this.waitingForSecondOperand) {
      return;
    }

    this.operand2 = Number(this.displayValue);
    const result = this.calculate(this.operand1, this.operand2, this.operator);

    if (result === null) {
      return;
    }

    this.expression = `${this.operand1} ${this.operator} ${this.operand2} =`;
    this.displayValue = this.formatNumber(result);
    this.operand1 = result;
    this.operator = null;
    this.operand2 = null;
    this.waitingForSecondOperand = false;
  }

  calculate(a, b, operator) {
    let result;

    switch (operator) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        if (b === 0) {
          this.error = "Eroare: impartire la zero";
          this.displayValue = this.error;
          this.expression = `${a} / ${b}`;
          return null;
        }
        result = a / b;
        break;
      default:
        return null;
    }

    if (!Number.isFinite(result)) {
      this.error = "Eroare: rezultat invalid";
      this.displayValue = this.error;
      return null;
    }

    return Number(result.toFixed(10));
  }

  formatNumber(value) {
    if (!Number.isFinite(value)) {
      return "Eroare: rezultat invalid";
    }
    return Number(value.toFixed(10)).toString();
  }

  getState() {
    return {
      expression: this.expression,
      displayValue: this.displayValue,
    };
  }
}

window.CalculatorModel = CalculatorModel;
