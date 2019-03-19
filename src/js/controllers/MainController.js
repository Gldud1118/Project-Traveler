import { elements } from "../views/base";
import FormView from "../views/FormView";
import TabView from "../views/TabView";
import ExpenseView from "../views/ExpenseView";
import ExpenseModel from "../models/ExpenseModel";

export default {
  init() {
    FormView.setup(elements.formExpense).on("@submit", e =>
      this.onSubmit(e.detail)
    );

    TabView.setup(document.defaultView).on("@hashchange", e =>
      this.getResult(e.detail.tabName)
    );

    ExpenseView.setup(elements.containerExpense);
    this.state = { allCategories: {} };
    this.getResult(TabView.tabName);
  },

  onSubmit(obj) {
    this.addExpense(obj);
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
