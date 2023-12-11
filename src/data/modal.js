class Expense {
  constructor(id, definition, price) {
    (this.id = id), (this.definition = definition), (this.price = price);
  }
}

// be carefull there is no data type in  js contructors
export default Expense;
