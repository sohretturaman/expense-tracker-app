import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import MaterialCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {Colors} from './Colors';

const Icon = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate('ManageExpense', {itemData: 'new'})}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'white' : Colors.headerColor,
            opacity: pressed ? 0.5 : 1,
          },
          styles.pressableButton,
        ]}>
        <MaterialCIcon
          name="plus"
          color={'white'}
          size={30}
          style={{margin: 5, padding: 3}}
          //onPress={() => console.log('manage expense pressed')}
        />
      </Pressable>
    </View>
  );
};

export default Icon;

const styles = StyleSheet.create({
  pressableButton: {
    backgroundColor: Colors.headerColor,
  },
});
