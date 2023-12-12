/** @format */

import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import ListExpenses from "../components/ListExpenses";
import { DATA } from "../data/dummyData";
import { Colors } from "../components/Colors";
import { ExpenseContext } from "../store/ExpensesContext";

const AllExpenses = () => {
  const ExpensesCtxt = useContext(ExpenseContext);
  console.log(" context data all expenses ", ExpensesCtxt.expenses);

  return (
    <SafeAreaView style={styles.continer}>
      <ListExpenses data={ExpensesCtxt.expenses} />
    </SafeAreaView>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
