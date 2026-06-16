# Todo List Application

A React Native application built with Expo for organizing daily tasks and exploring remote items, featuring robust state management, modern navigation, and a pixel-perfect UI.

## Features

* Task Management: Create and view daily tasks with seamless Redux state management.
* Remote Data Integration: Browse external items fetching from remote APIs using RTK Query for automatic caching and re-fetching.
* Modern UI/UX: 
  * Dynamic Skeleton Loading animations for empty states instead of generic spinners.
  * Interactive Modal validations with inline visual feedback.
  * Consistent theming and design tokens (Spacing, Typography, Colors).
* Robust Architecture: Fully unit-tested components, reducers, and hooks using Jest and react-test-renderer with a professional testing setup.

## Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn
* Expo Go app on your physical device (iOS/Android) or an Emulator/Simulator

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Start the Expo development server:

```bash
npx expo start
```

* Press 'a' to run on Android Emulator.
* Press 'i' to run on iOS Simulator.
* Or scan the QR code with the Expo Go app on your physical device.

### Running Tests

Run the full test suite with coverage report:

```bash
npm run test:coverage
```

## Architecture

Here is a breakdown of the architectural and technical choices powering the application:

### 1. Redux Toolkit (RTK) and RTK Query
For state management, the application leverages Redux Toolkit instead of basic Context API to ensure maximum performance and scalability:
* Performance: Context API triggers re-renders on all consuming components when any part of the state changes. Redux selectively updates only the components listening to specific slices.
* RTK Query: Provides out-of-the-box caching, loading state management (isLoading, isError), and request deduplication. It simplifies API integrations and network lifecycle management.
* Predictable Testing: The state architecture enables easy mocking and robust unit testing for UI components using custom render wrappers.

### 2. FlatList Optimization
For rendering dynamic lists, FlatList is used to ensure buttery-smooth scrolling performance.
* Memory Virtualization: FlatList only renders items currently visible on the screen (plus a small buffer). This allows the application to handle lists of thousands of items without dropping frames or crashing due to memory limits.

### 3. Expo Router (File-based Navigation)
The application utilizes Expo Router to handle complex navigation flows seamlessly.
* Discoverability: The route structure directly mirrors the file system (src/app/index.tsx, src/app/items.tsx), making the codebase highly intuitive and scalable for growing teams.
* Deep Linking: Native deep linking is supported out of the box without complex configuration maps.

### 4. UX/UI Polish
* Animated Skeleton Loaders: Instead of a static ActivityIndicator, screens use custom Skeleton components with an Animated.loop that pulses opacity. This prevents the layout shifting abruptly when network requests resolve.
* Inline Validation: Forms validate input directly where the user interacts, displaying inline red errors instead of silently disabling buttons, providing clear feedback which is a core principle of good UX.
