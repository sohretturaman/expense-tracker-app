/** @format */

import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { Colors } from "../components/Colors";
import { Button, IconButton } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ExpenseContext, ExpensesContext } from "../store/ExpensesContext";
import ExpenseForm from "../components/manageExpns/ExpenseForm";
import { deleteExpense, postExpense, updateExpense } from "../utils/Http.";
import LoadingOverlay from "../uı/LoadingOverlay";
import ErrorOverlay from "../uı/ErrorOverlay";

const ManageExpense = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [expError, setExpError] = useState("");
  const { itemData } = route?.params;

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
    setLoading(true);

    try {
      if (itemData == "new") {
        const postId = await postExpense(expenseObject); // !!returns promise value

        ExpenseCntxt.addExpense({ ...expenseObject, id: postId }); //take id from firebase api !!
        navigation.navigate("AllExpenses");
      } else {
        ExpenseCntxt.updateExpense(itemData, expenseObject);
        await updateExpense(itemData, expenseObject);
      }
    } catch (error) {
      setLoading(false);
      setExpError("could not update or add expense,", error.message);
    }

    navigation.navigate("AllExpenses");
  }

  async function DeleteExpense() {
    setLoading(true); //at the end of the function, it navigates to another pahe so no need to set loading to false
    try {
      console.log("delete func is worked");

      ExpenseCntxt.removeExpense(itemData);
      await deleteExpense(itemData);
    } catch (error) {
      setExpError("could not delete the expense, please try agin later");
    }

    navigation.navigate("AllExpenses");
  }

  const onCancel = () => {
    navigation.goBack();
  };

  if (loading) {
    return <LoadingOverlay />;
  }
  if (expError && !loading) {
    return (
      <ErrorOverlay message={expError} onPressError={() => setExpError("")} />
    );
  }
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
