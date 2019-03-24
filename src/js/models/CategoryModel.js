import uniqid from "uniqid";
import db from "../config";

export default class Category {
  constructor(category) {
    this.category = category;
    this.results = [];
    this.filterResults = [];
    this.expenses = {
      total: 0,
      card: 0,
      cash: 0
    };
  }
  async createData(item) {
    const id = uniqid();

    const newItem = {
      id,
      title: item.title,
      price: item.price,
      type: item.type
    };
    try {
      await db
        .collection("category")
        .doc(this.category)
        .collection("allItems")
        .doc(id)
        .set(item);
    } catch (err) {
      console.log(err);
    }

    this.results.push(newItem);
    return newItem;
  }

  getTotalExpense() {
    const total = this.results
      .map(item => item.price)
      .reduce((a, b) => a + b, 0);
    const card = this.results
      .filter(item => item.type === "card")
      .map(item => item.price)
      .reduce((a, b) => a + b, 0);
    const cash = this.results
      .filter(item => item.type === "cash")
      .map(item => item.price)
      .reduce((a, b) => a + b, 0);

    const expense = {
      total,
      card,
      cash
    };

    return expense;
  }

  async updateData(item) {
    const { id, title, price, type } = item;
    try {
      await db
        .collection("category")
        .doc(this.category)
        .collection("allItems")
        .doc(id)
        .update({
          title,
          price,
          type
        });
    } catch (err) {
      console.log(err);
    }

    this.results.forEach((item, index) => {
      if (item.id === id) {
        this.results[index].title = title;
        this.results[index].price = price;
        this.results[index].type = type;
      }
    });
  }

  async retrieveData() {
    try {
      await db
        .collection("category")
        .doc(this.category)
        .collection("allItems")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            const res = doc.data();
            res.id = doc.id;
            this.results.push(res);
          });
        });
    } catch (err) {
      console.log(err);
    }
  }

  async deleteData(id) {
    try {
      await db
        .collection("category")
        .doc(this.category)
        .collection("allItems")
        .doc(id)
        .delete();

      this.results.forEach((item, index) => {
        if (item.id === id) {
          this.results.splice(index, 1);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}
