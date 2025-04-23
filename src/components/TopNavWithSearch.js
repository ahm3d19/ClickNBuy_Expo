import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const TopNavWithSearch = ({searchQuery, setSearchQuery}) => {
  const router = useRouter();
  const cart = useSelector(state => state.cart);

  const handleProfilePress = () => {
    router.navigate('profile');
  };

  const handleCartPress = () => {
    router.navigate('cart');
  };

  const handleMenuPress = () => {
    router.toggleDrawer(); // or navigation.openDrawer() if using drawer navigation
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topNavContainer}>
        <TouchableOpacity onPress={handleMenuPress}>
          <MaterialIcons name="menu" size={28} color="#000" />
        </TouchableOpacity>

        <Image
          style={styles.logo}
          source={require('../assets/Logo/logo.png')}
        />

        <View style={styles.iconsContainer}>
          <TouchableOpacity
            onPress={handleCartPress}
            style={styles.cartIconContainer}>
            <MaterialIcons name="shopping-cart" size={24} color="#000" />
            {cart.totalQuantity > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cart.totalQuantity}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleProfilePress}
            style={styles.profileButton}>
            <Image
              style={styles.profileImage}
              source={{
                uri: 'https://randomuser.me/api/portraits/women/44.jpg',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <MaterialIcons
            name="search"
            size={24}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={() => {
              // Handle search submission
              // router.navigate('SearchResults', {query: searchQuery});
              router.navigate({
                pathname: '/SearchResults',
                params: { query: searchQuery }
              });
            }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearSearchButton}>
              <MaterialIcons name="close" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  topNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  logo: {
    height: 40,
    width: 120,
    resizeMode: 'contain',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIconContainer: {
    position: 'relative',
    marginRight: 15,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#F83758',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileButton: {
    marginLeft: 10,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: '#F83758',
    borderWidth: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  clearSearchButton: {
    marginLeft: 10,
  },
});

export default TopNavWithSearch;
