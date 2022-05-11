# React-native-web AKA. Making games? with react

<leader>r

## What

Made this website:
!open https://card-quest.netlify.app

Source is here:
!open https://github.com/eralpkaraduman/card-quest

- React-native-web experiment with a game in it.
- Card game called "Donsol".

This is a tech demo.
Purpose was to try a way to add website target to a react-native project in addition to iOS and android.
Game is added in order to make it not so empty

## The Game

Donsol is a dungeon crawler card game played with a standard 54 card deck.
Donsol, short for Dungeon Solitaire was designed by John Eternal, during train jam in 2015.

I didn't design the game, just implemented it.

Go play it yourself;
CARD-QUEST.NETLIFY.APP

##################################################################
##################################################################
##################################################################
##################################################################
########              ########  ######  ####              ########
########  ##########  ##        ####    ####  ##########  ########
########  ##      ##  ##  ##      ####    ##  ##      ##  ########
########  ##      ##  ####  ##    ####    ##  ##      ##  ########
########  ##      ##  ##    ##  ####      ##  ##      ##  ########
########  ##########  ##  ##  ##  ####    ##  ##########  ########
########              ##  ##  ##  ##  ##  ##              ########
########################  ##    ######  ##########################
########    ##  ####    ######        ##  ##      ##    ##########
##################  ##      ####  ######      ##########  ########
########  ##  ##      ##########  ######  ##  ########    ########
##########      ##  ##  ##                  ##    ################
########  ####          ####        ######    ####  ##    ########
############    ##  ##    ##################    ##    ##  ########
########  ##########    ##      ####  ####        ##  ##  ########
##########          ##    ####  ##      ##    ##  ####  ##########
########    ########      ####  ########              ############
########################  ##        ####  ######    ####  ########
########              ##  ######  ####    ##  ##    ##    ########
########  ##########  ##########  ######  ######          ########
########  ##      ##  ########        ##            ##############
########  ##      ##  ##  ######  ############        ############
########  ##      ##  ####    ####  ##    ####    ##  ##  ########
########  ##########  ##    ######          ######  ##############
########              ##  ##        ####  ##    ######    ########
##################################################################
##################################################################
##################################################################
##################################################################

## Implementation of the cross-platform app
we will look at implementation of the game later

### React
Everyone knows react, the declarative component based javascript library. 

### React Native
Pretty neat cross platform app development technology created by Facebook. Based on react. Targets iOS and android.
There are also desktop app target projects made by third parties.

### Rect Native Web
React Native for Web is a compatibility layer between React DOM and React Native.
It can be used in new and existing apps, web-only and multi-platform apps.
React Native for Web uses React DOM to accurately render React Native compatible JavaScript code in a web browser.

### Why do this with react-native
There are other platforms like Flutter that has web target already.
Which is canvas/webgl based.
Kind of overkill for most cases.
Doesn't feel like a website with regular dom elements etc.
Not so accessible and seo friendly.
React-native-web ends up being a normal web app.
Server rendering is possible with rnw

### How to add web target to react-native
when you create a react-native app it comes with ios and android support by default

There are several ways to add web target to a react-native project;

1. Use Expo: it has a web target already
  Expo is a framework and a platform for universal React applications. 
  It is a set of tools and services built around React Native and native platforms.
  https://docs.expo.dev/workflow/web/

#### Pros:
  - Easy
  - Too easy in fact that you should be concerned?

#### Cons:
  - Not extensible.
  - Web app looks like a mobile app not a website.
  - Routing is difficult

2. Monorepo and shared components module
  Put web app and react-native app project into a monorepo. 
  Develop shared react-native code in a module in monorepo. 
  Render shared code in web project through react-native-web.
 
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
#### Pros:
  - Based on an actual web app project, looks like real a website.
  - this is the most common way.
  - Seems smart.

#### Cons:
  - Too much stuff to configure.
  - Do you really need a monorepo? (maybe if you had backend project in there that'd be cool)
  - Slow to develop modules, re-install module existence
  - Need to symlink modules to develop faster
  - Metro doesn't like symlinks :(

3. Install react-dom into react-native project and setup webpack like a crazy person (what?)
  This is what I experimented with in this project.
  Don't know if this is a good way yet.
  You prefix platform specific code by postfixing filenames like -> .native.ts , .web.ts
  Then setup webpack or metro configs to exclude one another.
  Shared code won't be postfixed -> something.ts

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

#### Pros:
  - Very easy and fast to develop and test
  - You have a single project
  - No need to configure monorepo
  - No symlinks
  - Share code by simply importing it
  - react-native-web docs actually suggest this: https://necolas.github.io/react-native-web/docs/multi-platform/

#### Cons:
  - There's still stuff to configure
  - Webpack is maybe outdated
  - Easy to import unused code in either project and end up with large bundles
  - Does three-shaking actually work? idk

package.json npm commands for web and react-native
:e +8 ./package.json

how to exclude code in metro.config.js
:e +12 ./metro.config.js

how to alias rn to rnw in webpack.config.js
:e +19 ./webpack.config.js

web app starts from index.web.tsx
:e +16 ./index.web.tsx

native app starts from index.native.js
:e +1 ./index.android.js
:e +5 ./index.native.ts

## Routing / Navigation

Couple ways to do this
- Use react-router on both targets
  - react-router-native for native                      *page transitions are not good*
  - react-router-dom for web                            *excellent*
- User react-navigation on both targets
  - @react-navigation/web for web                       *buggy, experimental*
  - @react-navigation/native for native                 *excellent*
- Use react-navigation for native, react-router for web
  - best of choices in each target!                     *nice*

page/screen components are platform specific, contents are shared
:e +29 ./src/components/HomeContent.tsx

Platform specific container pages
:e +19 ./src/screens/HomeScreen.web.tsx
:e +18 ./src/screens/HomeScreen.native.tsx

Routing is done differently in each target
web does browser url path history stack based navigation
:e +15 ./src/screens/HomeScreen.native.tsx

native does native navigation stack based navigation
:e +19 ./src/screens/HomeScreen.web.tsx

## Layout

### Web app layout

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

### React native app layout

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

Web has a responsive sidebar, native has a bottom tab bar

PageLayout component based on react-router-dom
:e +23 ./src/components/PageLayout.web.tsx

App.native.tsx navigator containment
:e +101 ./src/App.native.tsx

## Styling

styled components / native
:e +14 ./index.web.tsx
:e +99 ./src/App.native.tsx

Styled components, native version, event web project is using the native version of sc
:e +2 ./src/components/PageLayout.styles.web.ts

Styled as Views not divs
:e +12 ./src/components/PageLayout.styles.web.ts

single theme file
:e +51 ./src/theme.ts

single theme type definition
:e +44 ./src/global.d.ts

tsconfig add dom so it knows dom types also
:e +5 ./tsconfig.json

override different jsx version for web
:e +5 ./tsconfig.web.json

## Modals
Web modals are made with reach-ui the responsive component lib

Modal containers are platform specific, this is the web one
:e +24 ./src/components/CardDetailModal.web.tsx

And they contain a shared modal view
:e +8 ./src/components/CardDetailView.tsx

Seo friendly, path based, this couldn't be done with @react-nativation/web
when clicked;
:e +31 ./src/app.web.tsx

when navigated from url;
:e +22 ./src/app.web.tsx

Native modals are WIP but likely will be done with @react-router/native's own modals

## Animations
css animations on web, react-native's Animated on rn?
cross platform animations: react-spring ?

## Storybooks
Would be cool since we can render pretty much all the shared essential stuff in web

## Hyperlinks & links
Are done with HyperLink module
Parses urls in strings generates link buttons
:e +63 ./src/components/HomeContent.tsx

the wrapping component
:e +14 ./src/components/BodyTextWithHyperLinks.tsx

Sidebar navigation
:e +16 ./src/components/Sidebar.web.tsx

Navigation links in sidebar are Link components from react-router-dom
:e +60 ./src/components/Sidebar.styles.web.ts

Changes state auto when navigation path matches
:e +58 ./src/components/Sidebar.styles.web.ts

## Implementation of the game
Best way to make games with react is to not use react at all :)
(ok actually just as a renderer)

GameController -> GameControllerProvider (context api)

useGameController (hook) -> addEventListener -> update component state

Entire game logic is in a class, that has nothing to do with react
:e +35 ./src/controllers/GameController.ts

Game state is based on custom made observables
:e +36 ./src/controllers/GameController.ts

The observable implementation, 
:e +41 ./src/controllers/Observable.ts

notifies the observer when they are changed
:e +66 ./src/controllers/GameController.ts

then we can dispatch events, using the custom event dispatcher
:e +68 ./src/controllers/GameController.ts

The event dispatcher 
:e +16 ./src/controllers/EventDispatcher.ts

Then eventually handled by the react component from the context api hook
useGameController
:e +39 ./src/components/GameView.tsx

then the event handler in useEffect
:e +51 ./src/components/GameView.tsx

then the component state gets updated by the useState hook
:e +42 ./src/components/GameView.tsx

THIS IS IT!

Thank you!
I'm Eralp Karaduman -> eralp.dev, eralpkaraduman.com
Check out qvik.com, we are hiring!

Link to source code etc are at card-quest.netlify app
These notes are also in the source code /article/presentation.md

## Additional gotchas, notes

### Notes
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

