import { elements } from "../views/base";
import FormView from "../views/FormView";
import TabView from "../views/TabView";

export default {
  init() {
    FormView.setup(elements.formExpense).on("@submit", e =>
      this.onSubmit(e.detail)
    );

    TabView.setup(document.defaultView).on("@hashchange", e =>
      this.getResult(e.detail.tabName)
    ); //주어진 문서에 대한 window는 docuent.defaultView속성을 사용하여 얻을 수 있다.

    this.getResult(TabView.tabName);
  },

  onSubmit(obj) {
    console.log(obj);
  },

  getResult(tab) {
    console.log(tab);
  }
};
