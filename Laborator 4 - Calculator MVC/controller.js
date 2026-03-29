class CalculatorController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindButtonClick(this.handleInput.bind(this));
    this.updateView();
  }

  handleInput(input) {
    switch (input.type) {
      case "number":
        this.model.inputNumber(input.value);
        break;
      case "operator":
        this.model.setOperator(input.value);
        break;
      case "equals":
        this.model.evaluate();
        break;
      case "clear":
        this.model.reset();
        break;
      default:
        return;
    }

    this.updateView();
  }

  updateView() {
    this.view.render(this.model.getState());
  }
}

const model = new CalculatorModel();
const view = new CalculatorView();
new CalculatorController(model, view);
