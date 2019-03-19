import View from "./view";
import { elementsClass } from "./base";

const FiterSortView = Object.create(View);

FiterSortView.setup = function(el) {
  this.init(el);
  this.bindEvents();
  return this;
};

FiterSortView.bindEvents = function() {
  Array.from(document.querySelectorAll(elementsClass.filter)).forEach(item => {
    item.addEventListener("change", () => this.onChangeEvent(item.id));
  });

  Array.from(document.querySelectorAll(elementsClass.btnSortExpense)).forEach(
    item => {
      item.addEventListener("click", () => this.onClickEvent(item.id));
    }
  );
};

FiterSortView.changeType = function() {
  document.getElementById("inc_all").checked = true;
};

FiterSortView.onChangeEvent = function(itemId) {
  const newFilterType = itemId.split("_")[1];
  this.emit("@filter", { type: newFilterType });
};

FiterSortView.onClickEvent = function(itemId) {
  this.emit("@sort", { type: itemId });
};

export default FiterSortView;
