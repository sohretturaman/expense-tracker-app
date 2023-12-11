/** @format */

import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import { Card, Avatar, IconButton, Button } from "react-native-paper";
import { Colors } from "./Colors";
import { useNavigation } from "@react-navigation/native";
import FormatDate from "../utils/FormatDate";

const ExpenseItem = ({ data }) => {
  const navigation = useNavigation();
  const handeltemPress = () => {
    navigation.navigate("ManageExpense", { itemData: data.id });
  };
  //console.log("item date data!!", data?.date);

  return (
    <View style={styles.itemWrapper}>
      <Pressable onPress={handeltemPress}>
        <Card.Title
          title={data.definition}
          titleStyle={styles.title}
          subtitle={FormatDate(data?.date)}
          subtitleStyle={styles.subtitle}
          //left={props =>  <IconButton {...props} icon="dots-vertical" iconColor={'white'} onPress={() => {}}/>}
          right={(props) => (
            <View style={styles.buttonWrapper}>
              <Text style={styles.textStyle}> {data.price} </Text>
            </View>
          )}
        />
      </Pressable>
    </View>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  itemWrapper: {
    backgroundColor: Colors.primary,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  buttonWrapper: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 5,
    padding: 4,
    marginRight: 10,
    minWidth: 65,
    alignItems: "center",
    maxWidth: 70,
  },
  textStyle: {
    fontSize: 15,
    color: Colors.backgroundColor,
    fontWeight: "bold",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    color: "white",
  },
});

/**
 * usefull widget
 *   <Card.Title
        title="Buy a book"
        titleStyle={{fontSize: 18, fontWeight: '700'}}
        // subtitle="Card Subtitle"
        //left={props =>  <IconButton {...props} icon="dots-vertical" iconColor={'white'} onPress={() => {}}/>}
        right={props => (
          <Avatar.Icon
            {...props}
            icon="folder"
            size={30}
            style={{marginRight: 10, margin: 2, padding: 5}}
          />
        )}
      />
 */
