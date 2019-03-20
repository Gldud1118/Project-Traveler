import View from "./view";

const ExpenseView = Object.create(View);

ExpenseView.setup = function(el) {
  this.init(el);
  this.showButtons(true);
  this.registerEvents();
  return this;
};

ExpenseView.registerEvents = function() {
  this.el.addEventListener("click", e => {
    this.getEvents(e.target);
  });
};

ExpenseView.getEvents = function(target) {
  const item = target.closest(".item");
  const itemId = item.dataset.id;

  const currentItem = {
    id: itemId,
    title: item.querySelector(".item__title").textContent,
    price: item.querySelector(".item__price").textContent,
    type: item.querySelector(".item__type").textContent
  };

  if (target.matches(".btn-edit")) {
    this.onClickEdit(currentItem);
  } else if (target.matches(".btn-delete")) {
    this.onClickDelete(itemId);
  }
};

ExpenseView.showButtons = function(show = true) {
  this.el.querySelectorAll("button").forEach(item => {
    item.style.display = show ? "inline" : "none";
  });
};

ExpenseView.onClickEdit = function(item) {
  this.emit("@click", {
    name: "edit",
    ...item
  });
};

ExpenseView.onClickDelete = function(id) {
  this.emit("@click", {
    name: "delete",
    id
  });
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

ExpenseView.renderUpdatedItem = function(item) {
  const updatedItem = document.querySelector(`[data-id="${item.id}"]`);
  updatedItem.querySelector(".item__title").textContent = item.title;
  updatedItem.querySelector(".item__price").textContent = item.price;
  updatedItem.querySelector(".item__type").textContent = item.type;
};

ExpenseView.deleteItem = function(id) {
  const deletedItem = document.querySelector(`[data-id="${id}"]`);
  if (deletedItem) deletedItem.parentElement.removeChild(deletedItem);
};

export default ExpenseView;
