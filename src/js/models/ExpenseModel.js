const data = {
  eat: [
    {
      id: 0,
      title: "코코넛 아이스크림",
      price: 2000
    },
    {
      id: 1,
      title: "시카고 피자",
      price: 2000
    },
    {
      id: 2,
      title: "탕수육",
      price: 15000
    }
  ],
  take: [
    {
      id: 0,
      title: "비행기",
      price: 700000
    },
    {
      id: 1,
      title: "기차",
      price: 3500
    },
    {
      id: 2,
      title: "버스",
      price: 1000
    }
  ],
  see: [
    {
      id: 0,
      title: "박물관",
      price: 1800
    },
    {
      id: 1,
      title: "미술관",
      price: 3400
    },
    {
      id: 2,
      title: "식물원",
      price: 1000
    }
  ],
  shop: [
    {
      id: 0,
      title: "기념품",
      price: 80000
    }
  ],
  sleep: [
    {
      id: 0,
      title: "호텔",
      price: 60000
    }
  ],
  etc: [
    {
      id: 0,
      title: "기부",
      price: 9000
    }
  ]
};
export default class Expense {
  constructor(category) {
    this.category = category;
    this.results = [];
  }

  async retrieveData() {
    try {
      await data[this.category].forEach(item => {
        this.results.push(item);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async createData(category) {}
}
