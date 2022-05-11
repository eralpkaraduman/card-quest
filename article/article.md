# React Native Web Article series

# Part 1: Cross platform mobile & web dialogs with react-native-web

I have been working on [a demo project called Card Quest](https://card-quest.netlify.app) to explore and learn about sharing code between react-native mobile apps and react web sites.

Project is basically an app that has a simple card game in it. You can go to [the project's site](https://card-quest.netlify.app) to learn more about the game and try it. The source code is available at [github.com/eralpkaraduman/card-quest](https://github.com/eralpkaraduman/card-quest).

Experiment is mainly about re-using ideally all of the code for the game and most of the UI code in the rest of the app on web and mobile platforms.

There is a technology called [react-native-web](https://necolas.github.io/react-native-web/), which is a great tool for the job, quoting from their website;

"A compatibility layer between React DOM and React Native. It can be used in new and existing apps, web-only and multi-platform apps.
React Native for Web uses React DOM to accurately render React Native compatible JavaScript code in a web browser."

React-native-web is a good choice for moving already existing react-native mobile app code to run on web projects. Also it is good for starting a project with it with the goal of code-sharing in mind, which is what I did.

There are several ways to share react-native code to web, some of which would be;

1. Use Expo
it has a web target already. [Expo](https://docs.expo.dev/workflow/web/) is a framework and a platform for universal React applications. It is a set of tools and services built around React Native and native platforms. If you want to get started quick, wouldn't need fine control, and ok with web app behaving like a mobile app, this is the way to go.
  
2. Monorepo with shared components module
This is the most popular approach, you put web app and react-native app projects into a monorepo. Develop shared react-native code in a module in monorepo. Render shared code in web project through react-native-web. Quite solid approach, hoWever the downside is that you need be aware that shared code are in a npm module, working on it effectively would require you to set up symlinks etc.

  ```
  my-project/
  ├─ package.json         -> workspaces: {packages: ['./packages/*']}
  ├─ packages/
  │  ├─ web-app/          -> regular create-react-app project 
  │  │  ├─ src/
  │  │  ├─ package.json   -> "babel-plugin-react-native-web"
  │  ├─ react-native-app/
  │  │  ├─ src/           -> normal rn project, nothing suspicious
  │  │  ├─ package.json
  │  ├─ components/
  │  │  ├─ src/           -> shared react native code here
  │  │  ├─ package.json
  ``` 

3. Install react-dom into react-native project
This is the way I experimented with in this project. Don't know if this is a good way yet. Aim of this is to see how far it goes, so far I'm really happy with the result.

How it goes is that, you install a bundler into the project with a separate entry point than react-native's.
Then you render shared react-native code in the project inside web components.

I choose [webpack](https://webpack.js.org/) bundler for simplicity as it is out of the scope of this experiment. Webpack is not necessarily the fastest bundler but is a reliable one.

Separated platform specific code by postfixing filenames like -> `.native.ts` & `.web.ts`
Then setup webpack or metro configs to exclude one another.
Shared code won't be postfixed at all `something.ts`

  ```
  my-rn-project/
  ├─ package.json                     -> tasks: web_start, web_build, start, android        
  ├─ metro.config.js                  -> exclude *.web.ts
  ├─ webpack.config.js                -> exclude *.native.ts, alias react-native -> react-native-web
  ├─ src/
  │  ├─ components/           
  │  │  ├─ someSharedComponent.tsx    -> shared components in react-native code, not postfixed
  │  │  ├─ someWebComponent.web.tsx   -> web specific component
  │  │  ├─ someRNComponent.native.tsx -> native specific component
  │  ├─ App.native.tsx                -> @react-navigation/native (feels like an app)
  │  ├─ App.web.tsx                   -> react-router-dom (feels like a website)
  │  ├─ index.html
  │  ├─ styles.css
  │  ├─ index.web.ts                  -> webpack input (web app)
  │  ├─ index.native.ts               -> metro input (react-native app)
  │  ├─ theme.ts                      -> same styled-components theme (nice!)
  ``` 
This approach is [also suggested by react-native-web project on this page](https://necolas.github.io/react-native-web/docs/multi-platform/). I suggest looking at it first to consider which approach you would take, my experiment slightly deviates from theirs.

## Project structure

I have designed the structure in a way so that web app feels like a regular website and the app feels like a regular mobile app. Which look and feel, ux and accessibility has to be built by platform specific parts. Which would be difficult to achieve with write once and target multiple platforms kind of approaches like what [Expo](https://expo.dev/) and [Flutter](https://flutter.dev/). Downside is that there's some configuration and code that is not shared and specific to either web and mobile. But they are very minimal and only responsible from presentation containment, so much more of the content and ui code of the app are shared.

I'm planning to go into more detail with each of these points below as separate articles. But briefly here's summary of parts of shared, and platform specific code.

## Shared code:

### Game logic
...

### Game presentation
...

### Page contents
...

### UI theme
...

### Fonts, icons and images
...


## Platform specific code:

### Bundling
...


### Routing

There is couple ways to do implement routing;
- Use react-router on both targets
  - react-router-native for native                      (**page transitions are not good**)
  - react-router-dom for web                            (**excellent**)

- User react-navigation on both targets
  - @react-navigation/web for web                       (**buggy, experimental**)
  - @react-navigation/native for native                 (**excellent**)

- Use react-navigation for native, react-router for web
  - best of choices on each platform!                   (**nice!**)

Last option was the way I implemented it. Check `App.native.ts` and `App.web.ts` in the [project source](https://github.com/eralpkaraduman/card-quest) to see how they are put together.

### UI containment

UI containment is designed in a way so that web app has its own different different layout system which work best at either web or mobile. Web has a responsive sidebar, native has a bottom tab bar.
But the contents of the pages are built by shared code.

#### Web layout

Layout of the web app containment is implemented in `PageLayout.web.tsx` and mobile layout is also at `App.native.tsx`.

```
BODY
┌─────────┬──────────────────────┐
│         │                      │
│         │         PAGE         │
│         │                      │
│         │  ┌────────────────┐  │
│         │  │                │  │
│ SIDEBAR │  │                │  │
│         │  │     SHARED     │  │
│         │  │      PAGE      │  │
│         │  │     CONTENT    │  │
│         │  │                │  │
│         │  └────────────────┘  │
│         │                      │
└─────────┴──────────────────────┘
       PAGE lAYOUT CONTAINER
```

#### Mobile app layout
```
┌───────────────────┐
│SCREEN             │
│                   │
│ ┌───────────────┐ │
│ │STACK NAVIGATOR│ │
│ │               │ │
│ │ ┌───────────┐ │ │
│ │ │           │ │ │
│ │ │  SHARED   │ │ │
│ │ │   PAGE    │ │ │
│ │ │  CONTENT  │ │ │
│ │ │           │ │ │
│ │ └───────────┘ │ │
│ │               │ │
│ └───────────────┘ │
│                   │
├───────────────────┤
│      TAB BAR      │
└───────────────────┘
    TAB NAVIGATOR
```

### Linking
...

### Dialogs
...

