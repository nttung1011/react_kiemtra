import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,FlatList,ToolTip
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Tooltip } from 'react-native-elements';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  return (
    <View style={styles.container}>
      
      <Image
        style={styles.image}
        source={{
          uri: 'https://img.uhdpaper.com/wallpaper/honkai-star-rail-acheron-katana-420@3@a',
        }}/>
      <Text style={styles.title}>MANAGE YOUR {'\n'}        TASK</Text>
      <View style={styles.inputContainer}>
        <Image
          source={require('./assets/snack-icon.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Screen_02', { userName: name })}>
        <Text style={styles.buttonText}>Get Started -></Text>
      </TouchableOpacity>
    </View>
  );
};

const Screen02 = ({ route, navigation }) => {
  const { userName } = route.params;
  const [tasks, setTasks] = useState([
    { id: '1', task: 'To check email' },
    { id: '2', task: 'UI task web page' },
    { id: '3', task: 'Learn javascript basic' },
    { id: '4', task: 'Learn HTML Advance' },
    { id: '5', task: 'Medical App UI' },
    { id: '6', task: 'Learn Java' },
  ]);
  const [searchText, setSearchText] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.task.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (taskToEdit) => {
    navigation.navigate('Screen_03', { 
      taskToEdit, 
      updateTask: (id, newTask) => {
        setTasks(prevTasks =>
          prevTasks.map(task => (task.id === id ? { ...task, task: newTask } : task))
        );
      }
    });
  };

  const renderItem = ({ item }) => (
     <View style={styles.taskItem}>
      
        <TouchableOpacity>
          <Image
            style={styles.checkbox}
            source={require('./assets/snack-icon.png')}
          />
        </TouchableOpacity>

      <Tooltip 
  popover={<Text style={styles.tooltipText}>Đây là danh sách làm việc</Text>} 
  containerStyle={styles.tooltipContainer}
>
      
        <Text style={styles.taskText}>{item.task}</Text>
      </Tooltip>

      <View style={styles.editIconcontainer}>
      <TouchableOpacity onPress={() => handleEdit(item)}>
        <Image style={styles.editIcon} source={require('./assets/download.png')} />
      </TouchableOpacity>
    </View>
    </View>
  );

  return (
    <View style={styles.container2}>
      <View style={styles.accconatiner}>
        <Image
          style={styles.imagesc2}
          source={{
            uri: 'https://www.siliconera.com/wp-content/uploads/2024/03/star-rail-acheron-myriad-celestia-trailer-03222024.png',
          }}
        />
        <View style={styles.acc2}>
          <Text style={styles.textsc2}>Hi {userName}</Text>
          <Text style={styles.textsc2acc}>Have a great day a head</Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Image
          source={require('./assets/snack-icon.png')}
          style={styles.iconseacrh}
        />
        <TextInput style={styles.search} placeholder="Search" value={searchText}
          onChangeText={setSearchText} />
      </View>
      <View style={styles.Listcontainer}>
      <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.noResults}>No matching tasks</Text>}
        />
    </View>
    <TouchableOpacity
      style={styles.addButton}
       onPress={() => navigation.navigate('Screen_03' , { addTask: setTasks })}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
const Screen03 = ({ route, navigation }) => {
  const { taskToEdit, updateTask } = route.params;
  const [task, setTask] = useState(taskToEdit?.task || '');

  const handleFinish = () => {
    if (taskToEdit) {
      updateTask(taskToEdit.id, task);
    } else {
      // If adding new task
      updateTask(Date.now().toString(), task);
    }
    navigation.goBack();
  };


  return (
    <View style={styles.container3}>
      <TextInput
        style={styles.input}
        placeholder="Input your job"
        value={newTask}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Screen_02" component={Screen02} />
        <Stack.Screen name="Screen_03" component={Screen03} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 70,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    height: 45,
    borderRadius: 8
  },
  input: {
width: '100%',
height: 45,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginLeft:5,
  },
  button: {
    marginTop: 70,
    backgroundColor: '#87CEEB',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  accconatiner: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10,
    position: 'absolute',
    top: 20, 
    right: 20, 
  },
  acc2: {
    marginLeft: 10,
  },
  textsc2: {
    fontSize: 24,
    marginLeft: 20,
  },
  textsc2acc: {
    fontWeight: 'bold',
    color: 'gray',
  },
  imagesc2: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  search: {
    width: '85%',
    height: 30,
  },
  iconseacrh: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: '85%',
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 10,
    position: 'absolute',
    top: 120,
    marginLeft: 25,
  },
iconseacrh: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  Listcontainer: {
    marginTop: 200,
  },
  taskItem: {
  flexDirection: 'row', 
  alignItems: 'center',
  padding: 15,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  borderColor: '#ddd',
  },
  editIconcontainer: {
  justifyContent: 'flex-end',
  alignItems: 'flex-end', 
  marginLeft: 'auto', 
},
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
 
  editIcon: {
    width: 24,
    height: 24,
   
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
   addButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
    top: 600,
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  container3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  screen3Text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tooltipContainer: {
  position: 'absolute',
  alignSelf: 'center', 
   
  
  top: 300,
  left:100,
},

tooltipText: {
  color: 'white',
  padding: 10,
  borderRadius: 5,
  textAlign: 'center',
},

});

export default App;