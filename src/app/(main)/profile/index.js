import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://randomuser.me/api/portraits/women/44.jpg"
  );
  const [formData, setFormData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    gender: "Female",
    birthDate: "1990-05-15",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Validate form data here if needed
    Alert.alert("Success", "Profile updated successfully");
    setEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
          {editing ? (
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setEditing(true)}>
              <MaterialIcons name="edit" size={24} color="#F83758" />
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Picture */}
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          {editing && (
            <TouchableOpacity style={styles.cameraIcon}>
              <MaterialIcons name="camera-alt" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
            ) : (
              <Text style={styles.inputText}>{formData.name}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => handleInputChange("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <Text style={styles.inputText}>{formData.email}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => handleInputChange("phone", text)}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.inputText}>{formData.phone}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Gender</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={formData.gender}
                onChangeText={(text) => handleInputChange("gender", text)}
              />
            ) : (
              <Text style={styles.inputText}>{formData.gender}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={formData.birthDate}
                onChangeText={(text) => handleInputChange("birthDate", text)}
                placeholder="YYYY-MM-DD"
              />
            ) : (
              <Text style={styles.inputText}>{formData.birthDate}</Text>
            )}
          </View>
        </View>

        {/* Additional Options */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.optionButtonText}>Change Password</Text>
          <MaterialIcons name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate("PrivacySettings")}
        >
          <Text style={styles.optionButtonText}>Privacy Settings</Text>
          <MaterialIcons name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  saveButton: {
    color: "#F83758",
    fontSize: 16,
    fontWeight: "500",
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#F83758",
  },
  cameraIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#F83758",
    borderRadius: 20,
    padding: 8,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputText: {
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  optionButtonText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
