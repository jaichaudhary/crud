import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import {setItems, removeItem} from '../redux/itemSlice';
import {getItems, deleteItem} from '../database/db';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.items.items);

  useEffect(() => {
    getItems().then(data => dispatch(setItems(data)));
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert('Confirm Delete', 'Are you sure?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () => {
          deleteItem(id).then(() => dispatch(removeItem(id)));
        },
      },
    ]);
  };

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>
              {item.name} - {item.description}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Edit', {item})}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Add')}>
        <Text>Add New Item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
