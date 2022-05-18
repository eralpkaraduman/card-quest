# React Native Web Article series

# Part 1: Cross-platform mobile & web code sharing setup.

I have been working on [a demo project called Card Quest][card-quest-source] to explore and learn about sharing code between react-native mobile apps and react websites.

The project consists of a website and a mobile app with a simple card game. Having a game in it demonstrates some "business logic" code that can be reused across platforms. Since I could not come up with a better idea, I decided to implement [a card game called Donsol](https://boardgamegeek.com/boardgame/197004/donsol). 

What the product does and what kind of game it has in it are not essential as the main focus of this experiment is its implementation. So I won't go into much detail about the game and its rules. However, the special thing about Donsol was that it is a single-player solitaire style turn-based card game, so there was no need to implement multi-player logic since that would be out of the scope of the experiment. You can go to [the project's site][card-quest-site] to learn more about the game and try it. The source code is available at [github.com/eralpkaraduman/card-quest][card-quest-source].

The experiment mainly uses all of the code ideally for the game and most of the UI code in the rest of the app on the web and mobile platforms.

There is a technology called [react-native-web](https://necolas.github.io/react-native-web/), which is an excellent tool for the job, quoting from their website;

> "A compatibility layer between React DOM and React Native. It can be used in new and existing web-only and multi-platform apps.
> React Native for Web uses React DOM to accurately render React Native compatible JavaScript code in a web browser."

React-native-web is a good choice for moving already existing react-native mobile app code to run on web projects. Also, it is suitable for starting a project with it with the goal of code-sharing in mind, which is what I did.

There are several ways to share react-native code to the web, some of which would be;

## Option 1: Use Expo
It has a web target already. [Expo](https://docs.expo.dev/workflow/web/) is a framework and a platform for universal React applications. It is a set of tools and services built around React Native and native platforms. So if you want to get started quickly, wouldn't need fine control, and ok with the web app behaving like a mobile app, this is the way to go.
  
## Option 2: Mono repo with shared components module
This is the most popular approach. You put web app and react-native app projects into a mono repo. Then, develop shared react-native code in a module in the mono repo. Finally, render shared code in web project through react-native-web. Quite a solid approach. However, the downside is that you need be aware that shared code is in an npm module. Working without too much context switching would require setting up symlinks, etc.

There are many ways to set up a mono repo. Look at [mono repo.tools](https://monorepo.tools/) for tools and ideas. Here's how I did it;

  ```plaintext
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

## Option 3: Install react-dom into the react-native project

This is the way I experimented with this project. Don't know if this is a good way yet. The aim of this is to see how far it goes. So far, I'm pleased with the result.

How it goes is that you install a bundler into the project with a different entry point than the react-native's.
Then you render shared react-native code in the project inside web components.

I choose [webpack](https://webpack.js.org/) bundler for simplicity as it is out of the scope of this experiment. Furthermore, Webpack is not necessarily the fastest bundler but is reliable.

Separated platform-specific code by postfixing filenames like -> `.native.ts` & `.web.ts`.
Then the setup webpack or metro configs to exclude one another's files.
Shared code won't be postfixed at all `something.ts`

  ```plaintext
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
  │  ├─ index.HTML
  │  ├─ styles.css
  │  ├─ index.web.ts                  -> webpack input (web app)
  │  ├─ index.native.ts               -> metro input (react-native app)
  │  ├─ theme.ts                      -> same styled-components theme (nice!)
  ``` 
This approach is [also suggested by the react-native-web project on this page](https://necolas.github.io/react-native-web/docs/multi-platform/). I suggest looking at it first to consider which direction you would take. My experiment slightly deviates from theirs.

## Project structure

I have designed the structure so that the web app feels like a regular website and the app feels like an ordinary mobile app. Which look and feel, UX, and accessibility have to be built by platform-specific parts. This would be difficult to achieve with writing once and targeting multiple platforms kind of approaches like [Expo](https://expo.dev/) and [Flutter](https://flutter.dev/). The downside is that some configurations and code are not shared and specific to either web or mobile. But they are very minimal and only responsible for presentation containment, so much more of the content and UI code of the app are shared.

I plan to go into more detail with each of these points below as separate articles. But briefly, here's a summary of parts of shared and platform-specific code.

![screenshot](./react-native-web-code-share.jpg)

## Shared code

### Game logic

Game logic is implemented so that it is unaware of react or react-native so that it can be reused in multiple ways even beyond react. Game logic consists of several plain typescript classes decoupled from visualization. It is only responsible for keeping track of the game state and checking rules.

Game implementation details are beyond this article's focus, so the only point that matters is that its code is detached from the view layer, which is how it can work between platforms. But if you are interested in the implementation, see these parts in the [source code][card-quest-source];

- `GameController`: the game rules & state implementation.
- `EventDispatcher`: custom event dispatcher implementation to notify the listeners (not related to react, anything can listen)
- `Observable`: custom observable implementation to track state changes
- `GameEventHistory`: Keeps a log of events in the game.
- `resolveGameCardPlay`: Predicts results ahead of playing a particular card.
`DonsolCardDescriptor`: Describes a particular game card in plain text.
- `DonsolEventDescriptor`: Describes a game event in plain, human-readable text.

### Game presentation

The presentation layer of the game is implemented as react-native components and very well aware of react compared to how game logic is decoupled from react. However, this part doesn't know how the game rules or the state manipulation works. An excellent way to implement games with react is to keep game logic away from react as much as possible and use react only as a renderer.

- `GameControllerProvider`: binds the game controller to react's context API.
- `useGameController`: the react hook allows components to register event listeners.
- `GameView`: The main component renders the current game state and responds to user input. See this component to get the gist of the implementation.
- `GameRoom`: Renders the cards in the current dungeon room.
- `PlayerStatus`: Renders the health value, the shield, and the health bars.
- `BattleLogView`: Renders the list of events in the game.


### Page contents

The container of the pages or screens has as little code as possible so that platform-specific code is minimal. For example, they only set up scrolling containers, avoid device-specific margins, etc. The main contents are implemented as separate components.

For example, for the "Home" screen, there are separate container components for each platform;
- `HomeScreen.web.tsx`: Adds a title text above.
- `HomeScreen.native.tsx`: Wraps with scrolling container.

And for the actual content, we have `HomeContent.tsx`, which is included in both containers above. 

### UI theme & styling

All the styles, fonts, and dimensions are shared across targets. There's a common `theme.ts` file implemented based on [styled-components](https://styled-components.com/). See, `global.d.ts` there's the re-declaration of `DefaultTheme` from `styled-components`. This allows us to type-check the theme values. Since most of the UI code is shared and implemented in `react-native-web`. It was simpler to just use `styled-components/native` in almost every component except the few specific to the web. See how re-declaration of the theme types is implemented here at [styled-components documentation](https://styled-components.com/docs/API#create-a-declarations-file) 

### Fonts, icons, and images

I used the same assets in both targets. Images work without any extra effort. But font icons needed a little bit more setup. I used [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons), intended to be used only on react-native apps, but with the minimal configuration, you can also use them on the web. See [the webpack section of the react-native-vector-icons readme](https://github.com/oblador/react-native-vector-icons#web-with-webpack). You directly import the fonts from the module and then add them to your CSS bundling process.  

## Platform-specific code

Most platform-specific code is in separate files with their respective postfixes, as in `*.native.tsx` `*.web.tsx`. But there are some other cases where platform-specific behavior is so minimal that the logic for switching behavior for the current platform could be in the same component. The common places this was done were;

- Rendering links
- Platform-specific typo: "Click" vs "Tap"

Most of these could be implemented using react-natives `Platform.OS` API. `react-native-web` adds `web` platform to this OS object. So you can check via `Platform.OS === 'web'` or `Platform.select({web: ..., default: ...})`. See [the react-native's own documentation about how to implement platform-specific code](https://reactnative.dev/docs/platform-specific-code) for tips on how to use this API.

Rendering links can be rather complicated depending on what kind of behavior you want to achieve in each platform. What I intended to have was that similar to what we have on HTML as `<a href="/other">Other Page</a>` or `<a href="https://somewhere.else">Somewhere Else</a>`. On the web, this works out of the box with one catch. If you navigate internally using `/other` href, the page will reload, and the app state will be reset. So you should use `react-router`'s `Link` API. However, you can't replace all `a`'s with `Link`s because you can't use them when navigating to external URLs since the router doesn't recognize them as paths. 

Having these kinds of links on the native side is another whole story because the concept of a browser doesn't exist, and anchor tags also don't exist. What we have on the native side is routing using `react-navigation` and rendering regular react-native buttons, and triggering `Linking.openURL(href)`. This is such a typical case for platform-specific implementation and would be repeated all over the code base, so it made sense to create a `LinkText` component that behaves differently on each platform yet is used the same way in components. See `LinkText.tsx` the [source code][card-quest-source]. This component only handles rendering an anchor-style text button and opens URLs but can't handle the internal page routing. Page routing on the native app requires `react-navigation`'s `useNavigation()` hook, so I made a `ScreenLinkText` component based on `LinkText`, which is visually the same, yet it takes `screen` and `tab` names then figure out how to navigate based on them. Usage looks like this `<ScreenLinkText tab="GameTab" screen="GameScreen">`. See the component to check how they are implemented. Setting up type checking for tab and screen-based deep navigation is tricky. I suggest referring to [typescript documentation of react-navigation](https://reactnavigation.org/docs/typescript/).
 
### UI containment

UI containment is designed so that web app and native app have their own separate layout systems that work best for either web or mobile. For example, the web has a responsive sidebar, native has a bottom tab bar.
But the contents of the pages are built by shared code implemented as react-native components.

#### UI containment: Web layout

The layout of the web app containment is implemented in `PageLayout.web.tsx`, and the mobile layout is also at `App.native.tsx`.

```plaintext
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

#### UI containment: Mobile app layout

```plaintext
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

### Routing

I choose to use [react-navigation](https://reactnavigation.org/) for native, [react-router](https://reactrouter.com/) for web,

But there is usually a couple of other ways to do implement routing;

- Use react-router on both targets
  - react-router-native for native                      (**page transitions are not good**)
  - react-router-dom for web                            (**excellent**)

- User react-navigation on both targets
  - @react-navigation/web for web                       (**buggy, experimental**)
  - @react-navigation/native for native                 (**excellent**)

- Use react-navigation/native for native, react-router-dom for web
  - best of choices on each platform!                   (**nice!**)

The last option was the way I implemented it. Separating page contents from the page containers and the navigation/routing implementation allowed this option to be taken. Using [react-navigation/native](https://reactnavigation.org/docs/getting-started/) and [react-router-dom](https://v5.reactrouter.com/web/guides/quick-start) separately on web and native resulted in the best UX in each target. Check `App.native.ts` and `App.web.ts` in the [project's source][card-quest-source] to see how they were put together.

### Bundling

The project started as a regular react-native app generated by the template;

`npx react-native init card-quest --template react-native-template-typescript` 

React native project comes with its own bundler called [Metro](https://facebook.github.io/metro/). 
Then to bring `react-native-web` to the project, I installed [webpack](https://webpack.js.org/) on top of it. 
This means that both bundlers have their own entry points, where they start bundling their bundles.
`index.web.ts` is where webpack looks first for bundling the web app. And `index.native.ts` is where the react-native app starts to build the mobile app bundle. The project structure in the above segment _"Option 3: Install react-dom into the react-native project"_. In summary, both bundlers exclude the other platform's specific files. Webpack config excludes `*.native.ts` files, and Metro config excludes `*.web.ts`. Webpack config also has an alias from react-native modules to react-native-web modules;

```js
{
  entry: './index.web.tsx',
}
```

```js
{ 
  alias: {
    'react-native$': 'react-native-web', 
  }
}
```
```js
{
  exclude: [
    // exclude components made exclusively for react-native
    /\.native.tsx$/,
    /\.native.ts$/,
  ],
}
```

Respectively in metro configuration, we exclude web-specific files. Metro intrinsically knows to look at `index.android.js` and `index.ios.js` first, so the entry point `index.native.ts` is configured there;

```js
{
  resolver: {
    // Blocking web specific files prevents us from using them accidentally
    blockList: [/\.web.tsx$/, /\.web.ts$/],
  },
}
```

See `webpack.config.js` and `metro.config.js` to check how they are configured in [the source code](card-quest-source).

## Conclusion

This part covers how the project was put together and what kind of choices I made, among other options. Other topics are more like implementation details. So I'm planning to cover these topics in separate articles. Some of these are already implemented. You can check how they are also built-in [the source code](card-quest-source);

### Linking:

How to handle platform-specific page routes, tab bars, and navigation stacks are managed. This is briefly covered in the _"Platform-specific code"_ section.

### Dialogs:

When the app shows dialogs, the web app displays the same content in a ["Reach UI" dialog](https://reach.tech/dialog/), but the native app displays it in [react-native-bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/). I will be going into detail about their usage.


### Animations

This is missing for now, but I'm planning to experiment with cross-platform animations or platform-specific ones coming from some form of configuration base. Don't know which tools I will use for this yet, but once I implement the animations will write about them.

This project has been just an experiment and hasn't been tested on a real-life consumer-facing application, so beware that most of what I have been talking about are not best practices. However, all these choices worked very nicely, so I'm hopeful that they can work well on a production app. If you choose to take a similar path for implementing cross-platform apps, please let me know! You can reach me from [eralp.dev](https://eralp.dev).


[card-quest-source]: https://github.com/eralpkaraduman/card-quest
[card-quest-site]: https://card-quest.netlify.app
