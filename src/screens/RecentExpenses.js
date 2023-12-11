/** @format */

import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../components/Colors";
import ListExpenses from "../components/ListExpenses";
import { DATA } from "../data/dummyData";
import { Searchbar } from "react-native-paper";
import { useContext } from "react";
import { ExpenseContext } from "../store/ExpensesContext";
import { RecentExpensesFunction } from "../utils/FormatDate";

const RecentExpenses = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const ExpenseCntxt = useContext(ExpenseContext);

  const filteredExpenses = ExpenseCntxt.expenses.filter((expense) => {
    const today = new Date();
    const dateToRetrun = RecentExpensesFunction(today, 7);
    return expense.date >= dateToRetrun;
  });

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View style={styles.continer}>
      <View
        style={{
          alignItems: "center",
          alignContent: "center",
          paddingHorizontal: 20,
          paddingVertical: 5,
          marginTop: 10,
        }}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View>
        <ListExpenses data={filteredExpenses} />
      </View>
    </View>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
