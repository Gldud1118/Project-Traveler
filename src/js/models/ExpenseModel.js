import db from "../config";

export default class Expense {
  constructor() {
    this.expense = [];
  }

  async updateData(category, expense) {
    const { total, card, cash } = expense;
    this.expense.forEach((item, index) => {
      if (item.category === category) {
        this.expense[index].total = total;
        this.expense[index].card = card;
        this.expense[index].cash = cash;
      }
    });
    const docRef = db.collection("expenses").doc(category);
    await docRef.set({ category, total, card, cash });
  }

  async retrieveData() {
    await db
      .collection("expenses")
      .get()
      .then(snapshot => {
        snapshot.forEach(async doc => {
          if (!doc.data()) {
            await db
              .collection("expenses")
              .doc(doc.id)
              .set({ category: doc.id, total: 0, cash: 0, card: 0 });
          }
          this.expense.push(doc.data());
        });
      });
  }
}
