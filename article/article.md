# React Native Web

- Common way is to make separate react-dom, react-native projects in a monorepo
- This approach explores the idea adding react-dom into a react-native project in a single project
  - No need to symlink files/folders (Metro doesn't like symlinks)
  - No need to separate code into modules
  - Easily have same versions of react, typescript etc

  we use styled-components/native for web as well not 'styled-components'

  https://necolas.github.io/react-native-web/docs/accessibility/#links


  https://necolas.github.io/react-native-web/docs/accessibility/#accessibility-patterns

https://necolas.github.io/react-native-web/docs/lists/
  Warning! The React Native list components are not optimized for the web. You may prefer to use external modules that are designed for multi-platform lists and provide better performance, e.g.,


  "The styling system in React Native is a way of defining the styles your application requires; it does not concern itself with where or when those styles are applied to elements. As a result, there is no dedicted Media Query or pseudo-class API built into the styling system. Instead, the state of the application should be derived from the equivalent JavaScript APIs that have the benefit of not being limited to modifying only styles."
