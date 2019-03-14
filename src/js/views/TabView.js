import View from "./View";
import { elements } from "./base";

const TabView = Object.create(View);

TabView.setup = function(el) {
  this.init(el);
  this.getHash();
  this.hashEvent();

  return this;
};

TabView.hashEvent = function() {
  this.el.addEventListener("hashchange", () => this.getHash());
};

TabView.getHash = function() {
  const category = window.location.hash.replace("#", "");
  this.tabName = category;
  this.setActiveTab(category);
  return category;
};

TabView.setActiveTab = function(tabName) {
  Array.from(elements.tabs.querySelectorAll("li")).forEach(li => {
    li.className = li.querySelector("a").innerHTML === tabName ? "active" : "";
  });
  this.tabName = tabName;
  this.emit("@hashchange", {
    tabName
  });
};

export default TabView;
