# React Native CRUD Assignment

## 📌 Overview
This is a **React Native CRUD** (Create, Read, Update, Delete) application built with:
- **React Native** (For cross-platform development)
- **Redux Toolkit** (For state management)
- **SQLite** (For local database storage using `react-native-quick-sqlite`)
- **TypeScript** (For better type safety and maintainability)
- **React Navigation** (For screen navigation)

The app allows users to **add, edit, delete, and view items** stored in an SQLite database, ensuring offline functionality.

---

## 🚀 Features
- 📋 **List Items** – Displays a list of stored items
- ➕ **Add Item** – Allows users to add new items
- ✏️ **Edit Item** – Allows modification of existing items
- 🗑 **Delete Item** – Removes an item from the database
- 🔄 **Offline Support** – Works without an internet connection

---

## 📂 Project Structure
```plaintext
/StantechAssignment
├── /src
│   ├── /screens
│   │   ├── HomeScreen.tsx
│   │   ├── AddEditScreen.tsx
│   ├── /redux
│   │   ├── store.ts
│   │   ├── itemSlice.ts
│   ├── /database
│   │   ├── db.ts
├── android/
├── ios/
├── App.tsx
├── README.md
├── package.json
├── tsconfig.json
```

## 📦 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/jaichaudhary/crud.git
cd crud
```

### **2️⃣ Install Dependencies**
```sh
npm install

```

### **3️⃣ Install Required Native Modules**
```sh
npm install react-native-sqlite-storage @reduxjs/toolkit react-redux react-navigation react-navigation-stack
```

### **4️⃣ Link Native Dependencies (For iOS)**
```sh
cd ios
pod install
cd ..
```

### **5️⃣ Start Metro Bundler**
```sh
npx react-native start --reset-cache
```

### **6️⃣ Run the Application**
- Android
```sh
npx react-native run-android
```
- iOS
```sh
npx react-native run-ios
```

## CRUD Operations
- Insert Item: `insertItem(name: string, description: string): Promise<number>`
- Get All Items: `getItems(): Promise<Item[]>`
- Update Item: `updateItem(id: number, name: string, description: string): Promise<void>`
- Delete Item: `deleteItem(id: number): Promise<void>`

