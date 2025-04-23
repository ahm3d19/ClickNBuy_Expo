
# 🏦 Click N Buy (Expo)

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Platforms](https://img.shields.io/badge/Platforms-iOS%20%7C%20Android-lightgrey?style=for-the-badge)

A high-performance Ecommerce mobile app built with **React Native / Expo **, **AWS**, and **Redux**, optimized for all devices with a lean size (<100MB).

## 📲 Demo Video  
[![ClickNBuy App Demo] 



Uploading copy_E170C051-ACB9-490F-816A-8426FF45BFA5-2.mov…






*(Click the image above to watch the full demo)*  

---

## 🚀 Key Features  
| Feature          | Technology Used |  
|------------------|----------------|  
| **Biometric Login** | AWS Cognito + React Native Keychain |  
| **Real-Time Transactions** | AWS AppSync + DynamoDB |  
| **Offline Mode** | Redux Persist + SQLite |  
| **Adaptive UI** | `useWindowDimensions()` + Responsive Grids |  

---

## 🛠️ Quick Setup  

```bash
# 1. Clone repo
git clone https://github.com/yourusername/CLickNBuy_Expo.git

# 2. Install dependencies
npm install

# 3. Start (choose one)
npx expo start
Enter a   # For Android
Enter i       # For iOS
```

> 💡 **AWS Configuration Required**: Run `amplify init` and configure your backend services.

---

## 🧩 Project Structure  
```
src/
├── auth/           # AWS Cognito integration
├── components/     # Shared UI (responsive)
├── features/       # Redux slices (RTK Query)
├── hooks/          # Custom hooks (e.g. useResponsive)
└── screens/        # Device-optimized screens
```

---

## 📱 Multi-Screen Support  
**How we handle different devices:**  
```jsx
// Example: Responsive Hook
import { useWindowDimensions } from 'react-native';

export const useDeviceType = () => {
  const { width } = useWindowDimensions();
  return width >= 768 ? 'TABLET' : 'PHONE';
};

// Usage in components
const { headerSize, padding } = deviceType === 'TABLET' 
  ? { headerSize: 32, padding: 24 } 
  : { headerSize: 24, padding: 16 };
```

---

## 🏗️ Built With  
- **Frontend**: React Native 0.72 + TypeScript  
- **State**: Redux Toolkit (RTK Query)  
- **Backend**: AWS Amplify (Cognito, DynamoDB, Lambda)  
- **Navigation**: React Navigation 6.x  
- **CI/CD**: GitHub Actions + AWS CodePipeline  

---

## 📜 License  
MIT © [ahm3d19]  

[![Star on GitHub](https://img.shields.io/github/stars/ahm3d19/stanbik-banking.svg?style=social)](https://github.com/ahm3d19/stanbik-banking/stargazers)  
**Pro Tip:** Watch the [demo video](#-demo-video) to see the app in action!  
```
