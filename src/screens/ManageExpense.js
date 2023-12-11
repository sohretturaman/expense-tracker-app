/** @format */

import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { Colors } from "../components/Colors";
import { Button, IconButton } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ExpenseContext, ExpensesContext } from "../store/ExpensesContext";
import ExpenseForm from "../components/manageExpns/ExpenseForm";
import { deleteExpense, postExpense, updateExpense } from "../utils/Http.";

const ManageExpense = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { itemData } = route?.params;
  //console.log('item data ', itemData); // have update itemdata value while add a new item

  const ExpenseCntxt = useContext(ExpenseContext);

  const selectedExpenseData = ExpenseCntxt.expenses.find(
    (expense) => expense.id === itemData
  ); //!!After found the object with id , will send that object to component

  useLayoutEffect(() => {
    // change title based on button
    navigation.setOptions({
      title: itemData == "new" ? "Create a new expense" : "Manage Expense",
    });
  }, [navigation]);

  async function handleUpdateAddFunctions(expenseObject) {
    if (itemData == "new") {
      const id = await postExpense(expenseObject); // !!returns promise value
      console.log("the postExpense func id", id);

      ExpenseCntxt.addExpense({ ...expenseObject, id: id }); //take id from firebase api !!
      navigation.navigate("AllExpenses");
    } else {
      ExpenseCntxt.updateExpense(itemData, expenseObject);
      await updateExpense(itemData, expenseObject);
      navigation.navigate("AllExpenses");
    }
  }

  function DeleteExpense() {
    console.log("delete Expenses is worked");
    ExpenseCntxt.deleteExpense(itemData);
    deleteExpense(itemData);
    navigation.navigate("AllExpenses");
  }

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={onCancel}
        onSubmit={handleUpdateAddFunctions}
        ButtonNameControler={itemData == "new" ? "Add Expense" : "Update"}
        selectedExpenseData={selectedExpenseData ? selectedExpenseData : null}
      />

      <IconButton
        icon={"delete"}
        iconColor="red"
        size={30}
        style={styles.IconPosition}
        onPress={DeleteExpense}
      />
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.backgroundColor,
    // justifyContent: 'center',
    //alignContent: 'center',
  },
  IconPosition: {
    alignSelf: "center",
    width: "100%",
  },
});
