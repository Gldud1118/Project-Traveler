import { elementsClass } from "./base";
import View from "./View";

const FormView = Object.create(View);

FormView.setup = function(el) {
  this.init(el);
  this.inputTitleEl = el.querySelector(elementsClass.inputTitle);
  this.inputPriceEl = el.querySelector(elementsClass.inputPrice);
  this.inputMethodEl = el.querySelector(elementsClass.inputMethod);
  this.addEl = el.querySelector(elementsClass.btnAddExpense);
  this.registerEvents();
  return this;
};

FormView.registerEvents = function() {
  this.on("submit", e => e.preventDefault());
  this.addEl.addEventListener("click", () => this.onClickCreate());
};

FormView.onClickCreate = function() {
  this.emit("@submit", {
    title: this.inputTitleEl.value,
    price: this.inputPriceEl.value,
    type: this.inputMethodEl.value
  });

  this.clearForm();
};

FormView.clearForm = function() {
  this.inputTitleEl.value = "";
  this.inputPriceEl.value = "";
};

export default FormView;
