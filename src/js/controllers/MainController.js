import { elements } from "../views/base";
import FormView from "../views/FormView";
import TabView from "../views/TabView";
import ExpenseModel from "../models/ExpenseModel";
import ExpenseView from "../views/ExpenseView";

export default {
  init() {
    FormView.setup(elements.formExpense).on("@submit", e =>
      this.onSubmit(e.detail)
    );

    TabView.setup(document.defaultView).on("@hashchange", e =>
      this.getResult(e.detail.tabName)
    );

    ExpenseView.setup(document.querySelector(".expense__list"));
    this.state = {};
    this.getResult(TabView.tabName);
  },

  onSubmit(obj) {
    this.addExpense(obj);
  },

  async addExpense(item) {
    console.log(this.state[this.state.currentTab]);
    //this.state.currentTab.createData();
    ExpenseView.renderItem(item);
  },

  async getResult(tab) {
    if (tab) {
      ExpenseView.clearResults();
      if (!this.state[tab]) {
        this.state.currentTab = tab;
        this.state[tab] = new ExpenseModel(tab);
        try {
          await this.state[tab].retrieveData();
          ExpenseView.renderResults(this.state[tab].results);
        } catch (err) {
          console.log(err);
        }
      } else {
        ExpenseView.renderResults(this.state[tab].results);
      }
    }
  }
};
