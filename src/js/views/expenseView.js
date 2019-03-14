import View from "./view";

const ExpenseView = Object.create(View);

ExpenseView.setup = function(el) {
  this.init(el);
};

ExpenseView.clearResults = function() {
  this.el.innerHTML = "";
};

ExpenseView.renderResults = function(data) {
  data.forEach(this.renderItem, this);
};

ExpenseView.renderItem = function(item) {
  const html = `<div data-id=${item.id}>
    <span>${item.title}</span>
    <span>${item.price}</span>
  </div>`;

  this.el.insertAdjacentHTML("afterbegin", html);
};

export default ExpenseView;
