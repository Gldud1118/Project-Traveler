import View from "./view";
import { elementsClass } from "./base";

const SearchView = Object.create(View);

SearchView.setup = function(el) {
  this.init(el);
  this.inputEl = el.querySelector(elementsClass.inputSearchQuery);
  this.resetEl = el.querySelector(elementsClass.btnSearchReset);
  this.showResetBtn(false);
  this.bindEvents();
  return this;
};

SearchView.showResetBtn = function(show = true) {
  this.resetEl.style.display = show ? "block" : "none";
};

SearchView.bindEvents = function() {
  this.on("submit", e => e.preventDefault());
  this.inputEl.addEventListener("keyup", e => this.onKeyup(e));
  this.resetEl.addEventListener("click", e => this.onClickReset());
};

SearchView.onKeyup = function() {
  //const enter = 13;
  this.showResetBtn(this.inputEl.value.length);

  if (!this.inputEl.value.length) this.emit("@reset");
  //if (e.keyCode !== enter) return;
  this.emit("@keyup", { input: this.inputEl.value });
};

SearchView.onClickReset = function() {
  this.emit("@reset");
  this.showResetBtn(false);
};

export default SearchView;
