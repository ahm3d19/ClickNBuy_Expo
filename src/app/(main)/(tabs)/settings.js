import React, {useState} from 'react';
import {View, ScrollView, SafeAreaView, StyleSheet, Switch} from 'react-native';


// Components
import SettingsHeader from '../../../components/Settings/SettingsHeader';
import UserProfile from '../../../components/Settings/UserProfile';
import SettingsSection from '../../../components/Settings/SettingsSection';
import LogoutButton from '../../../components/Settings/LogoutButton';
import AppVersion from '../../../components/Settings/AppVersion';
import { useRouter } from 'expo-router';

const SettingsScreen = () => {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [biometricAuthEnabled, setBiometricAuthEnabled] = useState(true);

  const settingsOptions = [
    {
      title: 'Account',
      icon: 'person',
      options: [
        {
          title: 'Profile',
          icon: 'account-circle',
          action: () => router.navigate('profile'),
        },
        {
          title: 'Addresses',
          icon: 'location-on',
          action: () => router.navigate('Addresses'),
        },
        {
          title: 'Payment Methods',
          icon: 'credit-card',
          action: () => router.navigate('PaymentMethods'),
        },
      ],
    },
    {
      title: 'Preferences',
      icon: 'settings',
      options: [
        {
          title: 'Dark Mode',
          icon: 'brightness-4',
          component: (
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{false: '#767577', true: '#F83758'}}
              thumbColor={darkModeEnabled ? '#fff' : '#f4f3f4'}
            />
          ),
        },
        {
          title: 'Notifications',
          icon: 'notifications',
          component: (
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{false: '#767577', true: '#F83758'}}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
            />
          ),
        },
        {
          title: 'Biometric Authentication',
          icon: 'fingerprint',
          component: (
            <Switch
              value={biometricAuthEnabled}
              onValueChange={setBiometricAuthEnabled}
              trackColor={{false: '#767577', true: '#F83758'}}
              thumbColor={biometricAuthEnabled ? '#fff' : '#f4f3f4'}
            />
          ),
        },
      ],
    },
    {
      title: 'Support',
      icon: 'help',
      options: [
        {
          title: 'Help Center',
          icon: 'help-outline',
          action: () => router.navigate('HelpCenter'),
        },
        {
          title: 'Contact Us',
          icon: 'email',
          action: () => router.navigate('ContactUs'),
        },
        {
          title: 'About Us',
          icon: 'info',
          action: () => router.navigate('AboutUs'),
        },
      ],
    },
    {
      title: 'Legal',
      icon: 'gavel',
      options: [
        {
          title: 'Terms of Service',
          icon: 'description',
          action: () => router.navigate('Terms'),
        },
        {
          title: 'Privacy Policy',
          icon: 'policy',
          action: () => router.navigate('Privacy'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SettingsHeader onBack={() => router.back()} />

        <UserProfile
          name="Sarah Johnson"
          email="sarah.johnson@example.com"
          imageUrl="https://randomuser.me/api/portraits/women/44.jpg"
          onEdit={() => router.navigate('profile')}
        />

        {settingsOptions.map((section, index) => (
          <SettingsSection
            key={`section-${index}`}
            title={section.title}
            icon={section.icon}
            options={section.options}
          />
        ))}

        <LogoutButton />
        <AppVersion version="1.2.3" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:10,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
});

export default SettingsScreen;
