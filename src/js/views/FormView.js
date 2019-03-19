import { elementsClass } from "./base";
import View from "./View";

const FormView = Object.create(View);

FormView.setup = function(el) {
  this.init(el);
  this.inputTitleEl = el.querySelector(elementsClass.inputTitle);
  this.inputPriceEl = el.querySelector(elementsClass.inputPrice);
  this.inputMethodEl = el.querySelector(elementsClass.inputMethod);
  this.addEl = el.querySelector(elementsClass.btnAddExpense);
  this.updateEl = el.querySelector(elementsClass.btnUpdateExpense);
  this.updateCancelEl = el.querySelector(elementsClass.btnUpdateCancelExpense);
  this.registerEvents();
  return this;
};

FormView.registerEvents = function() {
  this.on("submit", e => e.preventDefault());
  this.addEl.addEventListener("click", () => this.onClickCreate());
  this.updateEl.addEventListener("click", () => this.onClickUpdate());
  this.updateCancelEl.addEventListener("click", () =>
    this.onClickUpdateCancel()
  );
};

FormView.onClickCreate = function() {
  this.emit("@submit", {
    title: this.inputTitleEl.value,
    price: this.inputPriceEl.value,
    type: this.inputMethodEl.value
  });

  this.clearForm();
};

FormView.onClickUpdate = function() {
  this.emit("@update", {
    title: this.inputTitleEl.value,
    price: this.inputPriceEl.value,
    type: this.inputMethodEl.value
  });

  this.clearForm();
};

FormView.onClickUpdateCancel = function() {
  this.emit("@updateCancel");
};

FormView.displayCurrentItem = function(title, price, type) {
  this.inputTitleEl.value = title;
  this.inputPriceEl.value = price;
  this.inputMethodEl.value = type;
};

FormView.displayButtons = function() {
  this.updateEl.style.display = "block";
  this.updateCancelEl.style.display = "block";
  this.addEl.style.display = "none";
};

FormView.hideButtons = function() {
  this.updateEl.style.display = "none";
  this.updateCancelEl.style.display = "none";
  this.addEl.style.display = "block";
};

FormView.clearForm = function() {
  this.inputTitleEl.value = "";
  this.inputPriceEl.value = "";
};

export default FormView;
