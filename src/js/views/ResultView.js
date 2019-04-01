import View from "./view";

const ResultView = Object.create(View);

ResultView.setup = function(el) {
  this.init(el);

  return this;
};

ResultView.renderAllCategory = function(data) {
  data.expense.forEach(item => {
    document.querySelector(
      "." + item.category
    ).textContent = this.numberWithCommas(item.total);
  });
};

ResultView.renderCurrentCategory = function(category, expense) {
  document.querySelector("." + category).textContent = this.numberWithCommas(
    expense.total
  );
};

ResultView.numberWithCommas = function(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default ResultView;
