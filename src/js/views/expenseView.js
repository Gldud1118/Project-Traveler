import View from "./view";

const ExpenseView = Object.create(View);

ExpenseView.setup = function(el) {
  this.init(el);
  return this;
};

ExpenseView.clearResults = function() {
  this.el.innerHTML = "";
};

ExpenseView.renderResults = function(data) {
  data.forEach(this.renderItem, this);
};

ExpenseView.renderItem = function(item) {
  const html = `<div class="item" data-id=${item.id}>
    <span class="item__type">${item.type}</span>
    <span class="item__title">${item.title}</span>
    <span class="item__price">${item.price}</span>
    <button type="button" class="btn-edit">수정</button>
    <button type="button" class="btn-delete">삭제</button> 
  </div>`;

  this.el.insertAdjacentHTML("afterbegin", html);
};

export default ExpenseView;
