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
  - Not extensible
  - Web app looks like a mobile app not a website

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

how to exclude code in metro.config.js

how to alias rn to rnw in webpack.config.js

web app starts from index.web.js

native app starts from index.app.js

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

Show PageLayout component

Show App.native.tsx navigator containment

## Styling

Styled components, native version, event web project is using the native version
single theme file
single theme types
tsconfig override on web project so it knows dom types also

## Modals

## Animations
css animations on web, react-native's Animated on rn?
cross platform animations: react-spring ?

## Storybooks
Would be cool

## Implementation of the game
e +31 ./src/App.web.tsx
