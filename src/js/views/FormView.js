import { elementsClass } from "./base";
import View from "./View";

const FormView = Object.create(View);

FormView.setup = function(el) {
  this.init(el);
  this.inputTitleEl = el.querySelector(elementsClass.inputTitle);
  this.inputPriceEl = el.querySelector(elementsClass.inputPrice);
  this.inputMethodEl = el.querySelector(elementsClass.inputMethod);
  this.addEl = el.querySelector(elementsClass.btnAddExpense);
  this.registerEvent();
  return this;
};

FormView.registerEvent = function() {
  this.on("submit", e => e.preventDefault());
  this.el.addEventListener("submit", () => this.onClickCreate());
};

FormView.onClickCreate = function() {
  this.emit("@submit", {
    title: this.inputTitleEl.value,
    price: this.inputPriceEl.value,
    type: this.inputMethodEl.value
  });
};

export default FormView;
