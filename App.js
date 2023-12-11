/** @format */

import { StyleSheet, Text, View } from "react-native";
import ExpensesContextProvider from "./src/store/ExpensesContext";
import Navigation from "./src/Navigation";

export default function App() {
  return (
    <ExpensesContextProvider>
      <Navigation />
    </ExpensesContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
