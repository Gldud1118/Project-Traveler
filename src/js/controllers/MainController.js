import { elements } from "../views/base";
import FormView from "../views/FormView";
import TabView from "../views/TabView";
import ExpenseModel from "../models/ExpenseModel";
import ExpenseView from "../views/ExpenseView";

export default {
  init() {
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
    this.state = { allCategories: {} };
    this.getResult(TabView.tabName);
  },

  onSubmit(obj) {
    this.addExpense(obj);
  },

  onUpdate(obj) {
    this.updateExpense(obj);
    this.clearUpdate();
  },

  onUpdateCancel() {
    this.clearUpdate();
  },

  clearUpdate() {
    FormView.hideButtons();
    FormView.clearForm();
    ExpenseView.displayButtons();
  },

  getEvent(event) {
    if (event.name === "delete") {
      this.deleteExpense(event.id);
    } else if (event.name === "edit") {
      this.editExpense(event);
    }
  },

  async editExpense(item) {
    if (item) {
      const { id, title, price, type } = item;
      this.state.editItemId = id;
      FormView.displayCurrentItem(title, price, type);
      FormView.displayButtons();
      ExpenseView.hideButtons();
    }
  },

  async updateExpense(item) {
    const currentTab = this.state.allCategories[this.state.currentTab];
    item.id = this.state.editItemId;
    try {
      await currentTab.updateData(item);
      ExpenseView.renderUpdatedItem(item);
    } catch (err) {
      console.log(err);
    }
  },

  async deleteExpense(id) {
    const currentTab = this.state.allCategories[this.state.currentTab];
    try {
      await currentTab.deleteData(id);
      ExpenseView.deleteItem(id);
    } catch (err) {
      console.log(err);
    }
  },

  async addExpense(item) {
    const currentTab = this.state.allCategories[this.state.currentTab];
    try {
      const newItem = await currentTab.createData(item);
      ExpenseView.renderItem(newItem);
    } catch (err) {
      console.log(err);
    }
  },

  async getResult(tab) {
    if (tab) {
      ExpenseView.clearResults();
      this.state.currentTab = tab;
      if (!this.state.allCategories[tab]) {
        this.state.allCategories[tab] = new ExpenseModel(tab);
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
  }
};
