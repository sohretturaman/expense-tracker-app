/** @format */

import axios from "axios";

const BASE_URL = "https://expoexpensetricker-default-rtdb.firebaseio.com";

export async function postExpense(expenses) {
  const response = await axios.post(BASE_URL + "/expenses.json", expenses);
  //the most importanat point is that to reach key from response we use response.data.name
  const id = response.data.name;
  return id; //returns the generated id
}

export async function getAllExpenses() {
  const response = await axios.get(BASE_URL + "/expenses.json");
  const expenses = [];

  for (let key in response.data) {
    let expenseObj = {
      id: key,
      price: response.data[key].price,
      definition: response.data[key].definition,
      date: new Date(response.data[key].date),
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export async function deleteExpense(id) {
  await axios.delete(BASE_URL + `/expenses/${id}.json`);
}

export async function updateExpense(id, expenseData) {
  await axios.put(BASE_URL + `/expenses/${id}.json`, expenseData);
}

//sending http request are asynchronous tasks ,they don't complete immediately ,that's why get and post functions return promises
//to work with those promises we can add functions or alternatively use async and await
//the response value from async value will be an object from firebase api
//axios gives acces to data object from response , then take data properly by reaching out the key
