import React, {memo} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FilterModal = ({visible, onClose, sortOption, setSortOption}) => {
  const sortOptions = [
    {label: 'Popular', value: 'popular'},
    {label: 'Newest', value: 'newest'},
    {label: 'Price: Low to High', value: 'price-low'},
    {label: 'Price: High to Low', value: 'price-high'},
    {label: 'Rating', value: 'rating'},
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sort By</Text>
            {sortOptions.map(option => (
              <Pressable
                key={option.value}
                style={styles.option}
                onPress={() => setSortOption(option.value)}>
                <MaterialIcons
                  name={
                    sortOption === option.value
                      ? 'radio-button-checked'
                      : 'radio-button-unchecked'
                  }
                  size={20}
                  color="#F83758"
                />
                <Text style={styles.optionText}>{option.label}</Text>
              </Pressable>
            ))}
          </View>

          <TouchableOpacity style={styles.applyButton} onPress={onClose}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#F83758',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default memo(FilterModal);
