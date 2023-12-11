/** @format */

import { useState } from "react";
import React, { createContext, useReducer } from "react";

const DummyExpenses = [
  {
    id: "1",
    definition: "buy a phone",
    price: 30,
    date: new Date("2023-11-29"),
  },
  {
    id: "2",
    definition: "buy a phone",
    price: 30,
    date: new Date("2023-11-27"),
  },
  {
    id: "3",
    definition: "buy a comp",
    price: 30,
    date: new Date("2023-06-15"),
  },
  {
    id: "4",
    definition: "buy a new glass",
    price: 30,
    date: new Date("2023-08-12"),
  },
  {
    id: "5",
    definition: "buy new shoes",
    price: 30,
    date: new Date("2023-10-13"),
  },
  {
    id: "6",
    definition: "buy a new computer",
    price: 30,
    date: new Date("2023-12-02"),
  },
];

export const ExpenseContext = createContext({
  expenses: [], //context is using those definition and data to render
  addExpense: ({ definition, price, date }) => {},
  removeExpense: (id) => {},
  updateExpense: (id, { definition, price, date }) => {},
});

function ReducerFunction(state, action) {
  // it takes two  paramathers as default
  switch (action.type) {
    case "ADD":
      const newId = Math.random().toString() + new Date().getTime().toString();
      const newExpense = { id: newId, ...action.payload }; //action payload is the data I too via paramather
      return [newExpense, ...state];

    case "REMOVE":
      const newArray = state.filter(
        (expenseItem) => expenseItem.id !== action.payload.id
      );
      return [...newArray];

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
  const [state, dispatch] = useReducer(ReducerFunction, DummyExpenses);
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function removeExpense(id) {
    dispatch({ type: "REMOVE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } }); //seperate items to define the action.payload data
  }

  const value = {
    expenses: state,
    addExpense: addExpense,
    removeExpense: removeExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ExpensesContextProvider;

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
