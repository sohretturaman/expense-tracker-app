/** @format */

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomInput from "./CustomInput";
import { useState } from "react";
import { Button } from "react-native-paper";
import FormatDate from "../../utils/FormatDate";
import moment from "moment";

const ExpenseForm = ({
  onSubmit,
  onCancel,
  ButtonNameControler,
  selectedExpenseData,
}) => {
  const [error, setError] = useState(false);

  const [inputValues, setInputValues] = useState({
    price: selectedExpenseData ? selectedExpenseData.price.toString() : "",
    date: selectedExpenseData ? FormatDate(selectedExpenseData?.date) : "", // error is solved ,  date: selectedExpenseData ? FormatDate(inputValues?.date)
    definition: selectedExpenseData ? selectedExpenseData.definition : "",
  }); // return an object

  function InputsHandler(valueType, textInput) {
    setInputValues((values) => ({
      ...values,
      [valueType]: textInput,
    }));
  }

  const handleSubmitFunc = () => {
    const newExpenseObject = {
      price: +inputValues.price, //!!!that plus converts number to string
      date: new Date(inputValues.date),
      definition: inputValues.definition,
    };
    //console.log("handle submit is worked , new expense object values",newExpenseObject);

    const isPriceValid = !isNaN(inputValues.price) && inputValues.price > 0;
    const isDateValid = inputValues.date !== null || "invalid date";
    const isDefinitionValid = inputValues.definition.trim().length > 0;

    if (!isDateValid || !isDefinitionValid || !isPriceValid) {
      console.log(
        "isvalid values, date, definition, price",
        isDateValid,
        isDefinitionValid,
        isPriceValid
      );

      setError(true);
    } else {
      setError(false);

      onSubmit(newExpenseObject);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ExpenseForm</Text>
      <View></View>
      <CustomInput
        label={"Price"}
        textInputProps={{
          placeholder: "amount",
          keyboardType: "decimal-pad",
          onChangeText: InputsHandler.bind(this, "price"), // don't use curly brackets
          value: inputValues.price,
        }}
      />
      <CustomInput
        label={"Date"}
        textInputProps={{
          placeholder: "YYYY-MM-DD",
          keyboardType: "decimal-pad",
          onChangeText: InputsHandler.bind(this, "date"),
          value: inputValues.date,
        }}
      />
      <CustomInput
        label={"Definition"}
        textInputProps={{
          placeholder: "write a definition",
          multiline: true,
          onChangeText: InputsHandler.bind(this, "definition"),
          value: inputValues.definition,
          textAlignVertical: "top",
        }}
      />
      <Text>{error ? "invalid text please check agin" : ""}</Text>

      <View style={styles.buttonsWrapper}>
        <Button mode="contained" onPress={onCancel} style={{ width: "40%" }}>
          Cancel
        </Button>

        <Button
          mode="contained-tonal"
          onPress={handleSubmitFunc}
          style={{ width: "40%" }}
        >
          {ButtonNameControler}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    marginBottom: 10,
  },
  buttonsWrapper: {
    justifyContent: "space-around",
    flexDirection: "row",
    margin: 5,
    marginTop: 20,
  },
});

// important here how to use nested components (in custom input)
