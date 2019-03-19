import uniqid from "uniqid";
import db from "../config";

export default class Expense {
  constructor(category) {
    this.category = category;
    this.results = [];
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
        .collection("expense")
        .doc(this.category)
        .collection("allItems")
        .doc(id)
        .set(item);

      this.results.push(newItem);
    } catch (err) {
      console.log(err);
    }

    return newItem;
  }

  async updateData(item) {
    const { id, title, price, type } = item;
    try {
      await db
        .collection("expense")
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
        .collection("expense")
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
}
