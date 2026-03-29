class CalculatorView {
  constructor() {
    this.expressionElement = document.getElementById("expression");
    this.resultElement = document.getElementById("result");
    this.keysContainer = document.querySelector(".keys");
  }

  render(state) {
    this.expressionElement.textContent = state.expression;
    this.resultElement.textContent = state.displayValue;
  }

  bindButtonClick(handler) {
    this.keysContainer.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) {
        return;
      }

      const number = target.dataset.number;
      const operator = target.dataset.operator;
      const action = target.dataset.action;

      if (number !== undefined) {
        handler({ type: "number", value: number });
        return;
      }

      if (operator !== undefined) {
        handler({ type: "operator", value: operator });
        return;
      }

      if (action !== undefined) {
        handler({ type: action });
      }
    });
  }
}

window.CalculatorView = CalculatorView;
