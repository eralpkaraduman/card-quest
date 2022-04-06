# React-native-web AKA. Making games? with react

<leader>r

## What

Made this website:
!open https://card-quest.netlify.app

Source is here:
!open https://github.com/eralpkaraduman/card-quest

- React-native-web experiment with a game in it.
- Card game called "Donsol".

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

### React
Everyone knows react, the cool declarative component based javascript library. 

### React Native
Pretty neat cross platform app development technology created by Facebook. Based on react. Targets iOS and android.
There are also desktop app target projects made by third parties.

### Rect Native Web
React Native for Web is a compatibility layer between React DOM and React Native.
It can be used in new and existing apps, web-only and multi-platform apps.
React Native for Web uses React DOM to accurately render React Native compatible JavaScript code in a web browser.

### How to add web target to react-native
when you create a react-native app it comes with ios and android support by default

There are several ways to add web target to a react-native project;

1. Use Expo: it has a web target already
  Expo is a framework and a platform for universal React applications. 
  It is a set of tools and services built around React Native and native platforms.
  https://docs.expo.dev/workflow/web/

  Pros:
  - Easy
  - Too easy in fact that you should be concerned?

  Cons:
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
  Pros:
  - Based on an actual web app project, looks like real a website.
  - this is the most common way.
  - Seems smart.

  Cons:
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
  ├─ package.json         
  ├─ metro.config.js
  ├─ webpack.config.js
  ├─ src/
  │  ├─ components/           
  │  │  ├─ someSharedComponent.tsx
  │  │  ├─ someWebComponent.web.tsx
  │  │  ├─ someRNComponent.native.tsx
  │  ├─ App.native.tsx
  │  ├─ App.web.tsx
  │  │  ├─ src/           -> normal rn project, nothing suspicious
  │  │  ├─ package.json
  │  ├─ components/
  │  │  ├─ src/           -> shared react native code here
  │  │  ├─ package.json
  ``` 

  Pros:
  - You have a single project
  - No need to configure monorepo
  - Share code by simply importing it
  - react-native-web docs actually suggest this: https://necolas.github.io/react-native-web/docs/multi-platform/

## Implementation of the game

e +31 ./src/App.web.tsx
