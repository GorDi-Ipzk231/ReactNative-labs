import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';

// Дані для списку новин
const newsData = [
  { id: '1', title: 'Заголовок новини', description: 'Короткий текст новини' },
  { id: '2', title: 'Заголовок новини', description: 'Короткий текст новини' },
  { id: '3', title: 'Заголовок новини', description: 'Короткий текст новини' },
  { id: '4', title: 'Заголовок новини', description: 'Короткий текст новини' },
  { id: '5', title: 'Заголовок новини', description: 'Короткий текст новини' },
  { id: '6', title: 'Заголовок новини', description: 'Короткий текст новини' },
];

// Компонент для стилізованої кнопки
const CustomButton = ({ title, onPress, color }) => (
  <Pressable onPress={onPress} style={[styles.customButton, { backgroundColor: color }]}>
    <Text style={styles.customButtonText}>{title}</Text>
  </Pressable>
);

// Екран головної сторінки
const HomeScreen = () => {
  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.newsImage} />
      <View style={styles.newsText}>
        <View style={styles.newsTitleContainer}>
          <Ionicons name="image" size={20} color="black" style={styles.newsIcon} />
          <Text style={styles.newsTitle}>{item.title}</Text>
        </View>
        <Text>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.header}>Головна</Text>
        <FlatList
          data={newsData}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>Горбачевська Діана Андріївна, ІПЗк-23-1</Text>
      </View>
    </SafeAreaView>
  );
};

// Екран фотогалереї
const BotomagerScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.header}>Фотогалерея</Text>
        <View style={styles.grid}>
          {[...Array(12)].map((_, index) => (
            <View key={index} style={styles.gridItem}>
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.galleryImage}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>Горбачевська Діана Андріївна, ІПЗк-23-1</Text>
      </View>
    </SafeAreaView>
  );
};

// Екран входу
const LoginScreen = ({ navigation, route }) => {
  const setIsLoggedIn = route.params?.setIsLoggedIn;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (!storedUser) {
        Alert.alert('Помилка', 'Акаунт не знайдено. Спочатку зареєструйтеся.');
        return;
      }

      const user = JSON.parse(storedUser);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Помилка', 'Введіть коректну електронну пошту.');
        return;
      }
      if (email !== user.email || password !== user.password) {
        Alert.alert('Помилка', 'Невірна електронна пошта або пароль.');
        return;
      }

      await AsyncStorage.setItem('isLoggedIn', 'true');
      if (typeof setIsLoggedIn === 'function') {
        setIsLoggedIn(true);
      }
      navigation.reset({
        index: 0,
        routes: [{ name: 'Profile' }],
      });
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Помилка', 'Сталася помилка під час входу. Спробуйте ще раз.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.header}>Увійти в акаунт</Text>
        <TextInput
          style={styles.input}
          placeholder="Електронна пошта"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton title="Увійти" onPress={handleLogin} color="#007AFF" />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Немає акаунта? Зареєструватися</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>Горбачевська Діана Андріївна, ІПЗк-23-1</Text>
      </View>
    </SafeAreaView>
  );
};

// Екран реєстрації
const RegisterScreen = ({ navigation, route }) => {
  const setIsLoggedIn = route.params?.setIsLoggedIn;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Помилка', 'Введіть коректну електронну пошту.');
        return;
      }
      if (password.length < 6) {
        Alert.alert('Помилка', 'Пароль повинен містити щонайменше 6 символів.');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Помилка', 'Паролі не співпадають.');
        return;
      }
      if (!surname || !name) {
        Alert.alert('Помилка', 'Заповніть усі поля.');
        return;
      }

      const user = { email, password, surname, name };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('isLoggedIn', 'true');
      if (typeof setIsLoggedIn === 'function') {
        setIsLoggedIn(true);
      }
      Alert.alert('Успіх', 'Акаунт успішно створено!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Profile' }],
      });
    } catch (error) {
      console.error('Error during registration:', error.message);
      Alert.alert('Помилка', 'Сталася помилка під час реєстрації: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.header}>Реєстрація</Text>
        <TextInput
          style={styles.input}
          placeholder="Електронна пошта"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль (ще раз)"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Прізвище"
          value={surname}
          onChangeText={setSurname}
        />
        <TextInput
          style={styles.input}
          placeholder="Ім'я"
          value={name}
          onChangeText={setName}
        />
        <CustomButton title="Зареєструватися" onPress={handleRegister} color="#007AFF" />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Вже є акаунт? Увійти</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>Горбачевська Діана Андріївна, ІПЗк-23-1</Text>
      </View>
    </SafeAreaView>
  );
};

// Екран профілю
const ProfileScreen = ({ navigation, route }) => {
  const setIsLoggedIn = route.params?.setIsLoggedIn;
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user in Profile:', error);
      }
    };
    loadUser();
  }, []);

  const handleChangePassword = async () => {
    try {
      if (newPassword.length < 6) {
        Alert.alert('Помилка', 'Новий пароль повинен містити щонайменше 6 символів.');
        return;
      }
      if (newPassword !== confirmNewPassword) {
        Alert.alert('Помилка', 'Паролі не співпадають.');
        return;
      }

      const updatedUser = { ...user, password: newPassword };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setNewPassword('');
      setConfirmNewPassword('');
      Alert.alert('Успіх', 'Пароль успішно змінено!');
    } catch (error) {
      console.error('Error during password change:', error);
      Alert.alert('Помилка', 'Сталася помилка під час зміни пароля.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      if (typeof setIsLoggedIn === 'function') {
        setIsLoggedIn(false);
      }
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Помилка', 'Сталася помилка під час виходу: ' + error.message);
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screen}>
          <Text>Завантаження...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <Text style={styles.header}>Профіль</Text>
        <View style={styles.profileInfo}>
          <Text style={styles.profileLabel}>Електронна пошта:</Text>
          <Text>{user.email}</Text>
          <Text style={styles.profileLabel}>Прізвище:</Text>
          <Text>{user.surname}</Text>
          <Text style={styles.profileLabel}>Ім'я:</Text>
          <Text>{user.name}</Text>
        </View>
        <Text style={styles.subHeader}>Змінити пароль</Text>
        <TextInput
          style={styles.input}
          placeholder="Новий пароль"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Підтвердити новий пароль"
          secureTextEntry
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
        />
        <CustomButton title="Змінити пароль" onPress={handleChangePassword} color="#007AFF" />
        <View style={styles.buttonSpacer} />
        <CustomButton title="Вийти" onPress={handleLogout} color="#FF3B30" />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>Горбачевська Діана Андріївна, ІПЗк-23-1</Text>
      </View>
    </SafeAreaView>
  );
};

// Компонент для верхнього меню
const TopMenu = ({ navigation, route }) => {
  return (
    <View style={styles.topMenu}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={[styles.menuButton, route.name === 'Home' && styles.activeMenuButton]}
      >
        <Ionicons name="home" size={24} color={route.name === 'Home' ? '#007AFF' : 'gray'} />
        <Text style={[styles.menuText, route.name === 'Home' && styles.activeMenuText]}>Головна</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Botomager')}
        style={[styles.menuButton, route.name === 'Botomager' && styles.activeMenuButton]}
      >
        <Ionicons name="apps" size={24} color={route.name === 'Botomager' ? '#007AFF' : 'gray'} />
        <Text style={[styles.menuText, route.name === 'Botomager' && styles.activeMenuText]}>Фотогалерея</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={[styles.menuButton, route.name === 'Profile' && styles.activeMenuButton]}
      >
        <Ionicons name="person" size={24} color={route.name === 'Profile' ? '#007AFF' : 'gray'} />
        <Text style={[styles.menuText, route.name === 'Profile' && styles.activeMenuText]}>Профіль</Text>
      </TouchableOpacity>
    </View>
  );
};

// Налаштування стек-навігації
const Stack = createStackNavigator();

const HomeStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation, route }) => ({
        headerTitle: () => (
          <View style={styles.headerContainer}>
            <Image
              source={{ uri: 'https://ztu.edu.ua/templates/ztu/images/logo.png' }}
              style={styles.logo}
            />
            <Text style={styles.headerTitle}>FirstMobileApp</Text>
          </View>
        ),
        headerStyle: {
          height: 120,
        },
        header: ({ navigation, route }) => (
          <View>
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: 'https://ztu.edu.ua/templates/ztu/images/logo.png' }}
                style={styles.logo}
              />
              <Text style={styles.headerTitle}>FirstMobileApp</Text>
            </View>
            <TopMenu navigation={navigation} route={route} />
          </View>
        ),
      })}
    />
  </Stack.Navigator>
);

const BotomagerStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Botomager"
      component={BotomagerScreen}
      options={({ navigation, route }) => ({
        headerTitle: () => (
          <View style={styles.headerContainer}>
            <Image
              source={{ uri: 'https://ztu.edu.ua/templates/ztu/images/logo.png' }}
              style={styles.logo}
            />
            <Text style={styles.headerTitle}>FirstMobileApp</Text>
          </View>
        ),
        headerStyle: {
          height: 120,
        },
        header: ({ navigation, route }) => (
          <View>
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: 'https://ztu.edu.ua/templates/ztu/images/logo.png' }}
                style={styles.logo}
              />
              <Text style={styles.headerTitle}>FirstMobileApp</Text>
            </View>
            <TopMenu navigation={navigation} route={route} />
          </View>
        ),
      })}
    />
  </Stack.Navigator>
);

const ProfileStackScreen = ({ navigation, route }) => {
  const { isLoggedIn, setIsLoggedIn } = route.params || {};

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (loggedIn === 'true' && !isLoggedIn) {
          if (typeof setIsLoggedIn === 'function') {
            setIsLoggedIn(true);
          }
        } else if (loggedIn !== 'true' && isLoggedIn) {
          if (typeof setIsLoggedIn === 'function') {
            setIsLoggedIn(false);
            navigation.navigate('Login');
          }
        }
      } catch (error) {
        console.error('Error checking login status in ProfileStackScreen:', error);
      }
    };
    checkLoginStatus();

    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (loggedIn === 'true' && !isLoggedIn) {
          if (typeof setIsLoggedIn === 'function') {
            setIsLoggedIn(true);
          }
        } else if (loggedIn !== 'true' && isLoggedIn) {
          if (typeof setIsLoggedIn === 'function') {
            setIsLoggedIn(false);
            navigation.navigate('Login');
          }
        }
      } catch (error) {
        console.error('Error checking login status on focus:', error);
      }
    });

    return unsubscribe;
  }, [navigation, isLoggedIn, setIsLoggedIn]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={isLoggedIn ? ProfileScreen : LoginScreen}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: 'https://ztu.edu.ua/templates/ztu/images/logo.png' }}
                style={styles.logo}
              />
              <Text style={styles.headerTitle}>FirstMobileApp</Text>
            </View>
          ),
          headerStyle: {
            height: 120,
          },
          header: ({ navigation, route }) => (
            <View>
              <View style={styles.headerContainer}>
                <Image
                  source={{ uri: 'https://ztu.edu.ua/templates/ztu/images/logo.png' }}
                  style={styles.logo}
                />
                <Text style={styles.headerTitle}>FirstMobileApp</Text>
              </View>
              <TopMenu navigation={navigation} route={route} />
            </View>
          ),
        })}
        initialParams={{ setIsLoggedIn }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: 'https://ztu.edu.ua/templates/ztu/images/logo.png' }}
                style={styles.logo}
              />
              <Text style={styles.headerTitle}>FirstMobileApp</Text>
            </View>
          ),
          headerStyle: {
            height: 120,
          },
          header: ({ navigation, route }) => (
            <View>
              <View style={styles.headerContainer}>
                <Image
                  source={{ uri: 'https://ztu.edu.ua/templates/ztu/images/logo.png' }}
                  style={styles.logo}
                />
                <Text style={styles.headerTitle}>FirstMobileApp</Text>
              </View>
              <TopMenu navigation={navigation} route={route} />
            </View>
          ),
        })}
        initialParams={{ setIsLoggedIn }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: 'https://ztu.edu.ua/templates/ztu/images/logo.png' }}
                style={styles.logo}
              />
              <Text style={styles.headerTitle}>FirstMobileApp</Text>
            </View>
          ),
          headerStyle: {
            height: 120,
          },
          header: ({ navigation, route }) => (
            <View>
              <View style={styles.headerContainer}>
                <Image
                  source={{ uri: 'https://ztu.edu.ua/templates/ztu/images/logo.png' }}
                  style={styles.logo}
                />
                <Text style={styles.headerTitle}>FirstMobileApp</Text>
              </View>
              <TopMenu navigation={navigation} route={route} />
            </View>
          ),
        })}
        initialParams={{ setIsLoggedIn }}
      />
    </Stack.Navigator>
  );
};

// Головний навігатор
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn === 'true');
      } catch (error) {
        console.error('Error checking initial login status:', error);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Botomager" component={BotomagerStackScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{ headerShown: false }}
          initialParams={{ isLoggedIn, setIsLoggedIn }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screen: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
  },
  contentContainer: {
    paddingBottom: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  newsItem: {
    flexDirection: 'row',
    padding: 10,
  },
  newsImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  newsText: {
    flex: 1,
  },
  newsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsIcon: {
    marginRight: 5,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    height: 100,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  galleryImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  profileInfo: {
    marginBottom: 20,
  },
  profileLabel: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  linkText: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 10,
  },
  customButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  customButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSpacer: {
    height: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuButton: {
    alignItems: 'center',
  },
  menuText: {
    color: 'gray',
    fontSize: 12,
  },
  activeMenuButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  activeMenuText: {
    color: '#007AFF',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footer: {
    textAlign: 'center',
    color: 'gray',
  },
});