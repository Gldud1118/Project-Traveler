import { elements } from "../views/base";
import FormView from "../views/FormView";

export default {
  init() {
    FormView.setup(elements.formExpense).on("@submit", e =>
      this.onSubmit(e.detail)
    );
  },

  onSubmit(obj) {
    console.log(obj);
  }
};
