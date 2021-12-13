# React Native Web

- Common way is to make separate react-dom, react-native projects in a monorepo
- This approach explores the idea adding react-dom into a react-native project in a single project
  - No need to symlink files/folders (Metro doesn't like symlinks)
  - No need to separate code into modules
  - Easily have same versions of react, typescript etc
