# Task Manager – Mobile Application Test Assignment

A mobile task management application built with React Native and Expo for the Mobile Developer Intern test assignment.

---

## Features

- Add new tasks with:
  - Title
  - Description
  - Date and time of execution
  - Manual address input
- View a list of all tasks
- Sort tasks by creation date or by status
- Update task status ("In Progress", "Completed", "Cancelled")
- Delete tasks
- View task details
- Persistent local storage using AsyncStorage
- Light/dark theme support based on system settings

---

## Technologies Used

- **React Native** (with Expo) – cross-platform mobile development
- **React Navigation** – stack-based navigation
- **AsyncStorage** – local persistent storage
- **UUID** – unique task identifiers
- **Expo Theming API** – for dark/light mode

---

## Folder Structure

```
.
├── App.js                   # Entry point and navigation setup
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js       # Main screen showing task list
│   │   ├── AddTaskScreen.js    # Screen for adding a new task
│   │   └── TaskDetailScreen.js # Screen for managing a task
│   └── navigation/
│       └── AppNavigator.js     # React Navigation stack configuration
├── utils/
│   └── storage.js           # AsyncStorage helpers (get, save, delete)
├── assets/                  # App icons, splash screen (if needed)
├── app.json                 # App configuration (name, slug, icon, etc.)
└── eas.json                 # EAS Build configuration
```

## How to Run the Project

### Prerequisites

- Node.js
- Expo CLI (`npm install -g expo-cli`)

### Run in Development Mode

\`\`\`bash
npm install
npx expo start
\`\`\`

Then scan the QR code with Expo Go (Android/iOS) or run it in the browser using the `w` key.

---

## APK Build Info

Built using EAS Build:

\`\`\`bash
eas build -p android --profile preview
\`\`\`

The `.apk` file is available and can be provided via Google Drive or by direct upload as per the assignment requirements.

---

## Developer

**Aleksandr Shukurov**
