import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {addItem, updateItem} from '../redux/itemSlice';
import {insertItem, updateItem as updateDBItem} from '../database/db';

const AddEditScreen = ({route, navigation}: any) => {
  const dispatch = useDispatch();
  const item = route.params?.item || {};
  const [name, setName] = useState<string>(item.name || '');
  const [description, setDescription] = useState<string>(
    item.description || '',
  );

  const handleSave = async () => {
    if (!name || !description)
      return Alert.alert('Error', 'All fields are required');

    if (item.id) {
      await updateDBItem(item.id, name, description);
      dispatch(updateItem({id: item.id, name, description}));
    } else {
      const id = await insertItem(name, description);
      if(id !== undefined){
        dispatch(addItem({id , name, description}));
      }
    }
    navigation.goBack();
  };

  return (
    <View>
      <TextInput value={name} onChangeText={setName} placeholder="Name" />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default AddEditScreen;
