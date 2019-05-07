import { elements } from "../views/base";
import FormView from "../views/FormView";
import TabView from "../views/TabView";
import ExpenseView from "../views/ExpenseView";
import CategoryModel from "../models/CategoryModel";
import ExpenseModel from "../models/ExpenseModel";
import SearchView from "../views/SearchView";
import ResultView from "../views/ResultView";
import FilterSortView from "../views/FilterSortView";

export default {
  async init() {
    this.getLocation();
    FormView.setup(elements.formExpense)
      .on("@submit", e => this.onSubmit(e.detail))
      .on("@update", e => this.onUpdate(e.detail))
      .on("@updateCancel", () => this.onUpdateCancel());

    TabView.setup(document.defaultView).on("@hashchange", e =>
      this.getResult(e.detail.tabName)
    );

    ExpenseView.setup(elements.containerExpense).on("@click", e => {
      this.getEvent(e.detail);
    });

    SearchView.setup(elements.formSearchExpense).on("@keyup", e => {
      this.getSearchInput(e.detail.input);
    });

    FilterSortView.setup(elements.formFilterSortExpense)
      .on("@filter", e => this.onFilter(e.detail.type))
      .on("@sort", e => this.onSort(e.detail.type));

    this.state = { allCategories: {} };
    await this.getExpense();
    ResultView.setup(document.querySelector(".result"));

    this.getResult(TabView.tabName);
  },

  onSubmit(obj) {
    this.addExpense(obj);
  },

  getLocation() {
    if (window.location.href === window.location.origin + "/") {
      window.location.href = window.location.origin + "/#eat";
    }
  },

  async getExpense() {
    this.state.total = new ExpenseModel();
    await this.state.total.retrieveData();
    console.log(this.state);
    ResultView.renderAllCategory(this.state.total);
  },

  onUpdate(obj) {
    this.updateExpense(obj);
    this.clearUpdate();
  },

  onUpdateCancel() {
    this.clearUpdate();
  },

  onFilter(type) {
    this.filterExpense(type);
  },

  onSort(type) {
    this.sortExpense(type);
  },

  clearUpdate() {
    FormView.showUpdateButtons(false);
    FormView.clearForm();
    ExpenseView.showButtons(true);
  },

  getSearchInput(input) {
    this.searchExpense(input);
  },

  getEvent(event) {
    if (event.name === "delete") {
      this.deleteExpense(event.id);
    } else if (event.name === "edit") {
      this.editExpense(event);
    }
  },

  searchExpense(query) {
    const currentTab = this.state.allCategories[this.state.currentTab];
    if (currentTab) {
      ExpenseView.clearResults();
      const searchWord = query.toLowerCase();
      const searchResults = currentTab.results.filter(item => {
        const dataTitle = item.title.toLowerCase();
        return dataTitle.indexOf(searchWord) !== -1;
      });

      ExpenseView.renderResults(searchResults);
    }
  },

  async editExpense(item) {
    if (item) {
      const { id, title, price, type } = item;
      this.state.editItemId = id;
      FormView.displayCurrentItem(title, price, type);
      FormView.showUpdateButtons(true);
      ExpenseView.showButtons(false);
    }
  },

  async updateExpense(item) {
    const currentTab = this.state.allCategories[this.state.currentTab];
    item.id = this.state.editItemId;
    try {
      await currentTab.updateData(item);
      ExpenseView.renderUpdatedItem(item);
      const expense = currentTab.getTotalExpense();
      await this.state.total.updateData(this.state.currentTab, expense);
      ResultView.renderCurrentCategory(this.state.currentTab, expense);
    } catch (err) {
      console.log(err);
    }
  },

  async deleteExpense(id) {
    const currentTab = this.state.allCategories[this.state.currentTab];
    try {
      await currentTab.deleteData(id);
      ExpenseView.deleteItem(id);
      const expense = currentTab.getTotalExpense();
      await this.state.total.updateData(this.state.currentTab, expense);
      ResultView.renderCurrentCategory(this.state.currentTab, expense);
    } catch (err) {
      console.log(err);
    }
  },

  async addExpense(item) {
    const currentTab = this.state.allCategories[this.state.currentTab];
    try {
      const newItem = await currentTab.createData(item);
      const expense = currentTab.getTotalExpense();
      await this.state.total.updateData(this.state.currentTab, expense);
      ExpenseView.renderItem(newItem);
      ResultView.renderCurrentCategory(this.state.currentTab, expense);
    } catch (err) {
      console.log(err);
    }
  },

  async getResult(tab) {
    if (tab) {
      this.state.currentTab = tab;
      ExpenseView.clearResults();
      FilterSortView.changeType();

      if (!this.state.allCategories[tab]) {
        this.state.allCategories[tab] = new CategoryModel(tab);
        try {
          await this.state.allCategories[tab].retrieveData();
          ExpenseView.renderResults(this.state.allCategories[tab].results);
        } catch (err) {
          console.log(err);
        }
      } else {
        ExpenseView.renderResults(this.state.allCategories[tab].results);
      }
    }
  },

  filterExpense(type) {
    const currentTab = this.state.allCategories[this.state.currentTab];
    currentTab.filterResults = [];
    ExpenseView.clearResults();

    if (type === "all") {
      currentTab.filterResults = JSON.parse(JSON.stringify(currentTab.results));
    } else {
      currentTab.results.forEach(item => {
        if (item.type === type) {
          currentTab.filterResults.push(item);
        }
      });
    }
    ExpenseView.renderResults(currentTab.filterResults);
  },

  sortExpense(sort) {
    const currentTab = this.state.allCategories[this.state.currentTab];
    ExpenseView.clearResults();
    if (!currentTab.filterResults.length) {
      currentTab.filterResults = JSON.parse(JSON.stringify(currentTab.results));
    }
    if (sort === "high") {
      currentTab.filterResults.sort((a, b) => a.price - b.price);
    } else if (sort === "low") {
      currentTab.filterResults.sort((a, b) => b.price - a.price);
    }

    ExpenseView.renderResults(currentTab.filterResults);
  }
};
