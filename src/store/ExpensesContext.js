/** @format */

import { useState } from "react";
import React, { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
  expenses: [], //context is using those definition and data to render
  addExpense: ({ definition, price, date }) => {},
  getExpenses: () => {},
  removeExpense: (id) => {},
  updateExpense: (id, { definition, price, date }) => {},
});

function ReducerFunction(state, action) {
  // it takes two  paramathers as default
  switch (action.type) {
    case "ADD":
      // const newId = Math.random().toString() + new Date().getTime().toString();
      // const newExpense = { id: newId, ...action.payload }; //action payload is the data I too via paramather
      return [action.payload, ...state]; // no need to generate id anymore

    case "GET":
      const expenseArray = action.payload.reverse();
      return expenseArray; // returns data from firebase rest api

    case "REMOVE":
      return state.filter((expense) => expense.id !== action.payload);

    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    default:
      return state;
  }
}
const ExpensesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReducerFunction, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function removeExpense(id) {
    dispatch({ type: "REMOVE", payload: id });
  }
  function getExpenses(expenseData) {
    dispatch({ type: "GET", payload: expenseData });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } }); //seperate items to define the action.payload data
  }

  const value = {
    expenses: state,
    getExpenses: getExpenses,
    addExpense: addExpense,
    removeExpense: removeExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ExpensesContextProvider;

//in remove function   =>  // here should be action.payload ,
//beacuse we dont need to react any item except of id , we have only id data as paramther

// a reducer function has been created  without reducer fuction at first
{
  /**

const ExpensesContextProvider = ({children}) => {
  const [exepenses, setExpenses] = useState(DummyExpenses);
  function addExpense(expenseData) {
    const id = Math.random().toString() + new Date().toString();
    const newArray = [{id, ...expenseData}, ...exepenses];
    setExpenses(newArray);
    return newArray;
  }

  function deleteExpense(id) {
    const newArray = exepenses.filter(expense => expense.id != id);
    setExpenses(newArray);
    return newArray;
  }

  function updateExpense(id, {definition, price, date}) {
    console.log('update has been clicked');

    const updatableExpenseIndex = exepenses.findIndex(
      expense => expense.id === id,
    );

    const updatedExpenses = [...exepenses];
    const updatedItem = {
      ...updatedExpenses[updatableExpenseIndex],
      definition: definition,
      price: price,
      date: date,
    };

    updatedExpenses[updatableExpenseIndex] = updatedItem;
    setExpenses(updatedExpenses);
    console.log('updated expenses', updatedExpenses);
    return updatedExpenses;
  }

  const value = {
    expenses: exepenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};
*/
}
