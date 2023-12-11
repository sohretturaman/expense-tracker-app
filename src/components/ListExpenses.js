import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import ExpenseItem from './ExpenseItem';

const ListExpenses = ({data}) => {
  const renderItem = ({item}) => {
    return (
      <View>
        <ExpenseItem data={item} />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ListExpenses;

const styles = StyleSheet.create({});
