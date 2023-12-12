/** @format */

import { StyleSheet, Text, View } from "react-native";
import ExpensesContextProvider from "./src/store/ExpensesContext";
import Navigation from "./src/Navigation";

//create load and  error overlay item, useTrycatch fucntions for async functions !! and app is done
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
