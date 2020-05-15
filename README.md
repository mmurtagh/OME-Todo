# Summary

This project is a Todo List application written in React Native.

<img src="https://i.imgur.com/EhXGukI.png" width="200"><img src="https://i.imgur.com/rnjFTLB.png" width="200"><img src="https://i.imgur.com/ytnynxh.png" width="200">

The app has the following features:

## CRUD

You can create, read (display a list of), update, and delete various "todo"s. This includes completing a todo and modifying any attributes associated with it (except the id) A todo is a datastructure with the following format:

```
id - unique identifier
name - name associated with the todo
description - description of the todo
targetDate - date that the todo should be completed by
completedDate - date the todo was completed
```

## Filter/Sort

The user's list of todo's can be filtered by whether or not is has been completed and on a substring match via a search bar

The todo's can also be sorted in the following ways:

- Name Descending
- Name Ascending
- Target Date Descending
- Target Date Ascending

# Setup

Clone the repository, navigate to the project folder, and install the npm packages

```
cd OME-Todo
npm i
```

Navigate to the ios folder and install the Pods

```
cd ios
pod install
```

Run the app on an ios simulator

```
npx react-native run-ios
```

Or an Android emulator

```
npx react-native run-android
```

#

## Important Packages Used

### @react-native-community/async-storage
Used in conjunction with `redux-persist` to persist the redux store on app close

### @react-native-community/datetimepicker
Used in the Todo Detail screen for selecting dates

## color
Used to make working with colors easier

## lodash.debounce
Used to debounce search bar entries. Makes the search feature more efficient and smoother

## prop-types
Used to declare prop types for components

## moment
Used to make working with and formatting dates easier

## react-native-paper
Main UI package.

## react-native-vector-icons
React native paper dependency. All icons in the app stem from this

## react-redux
Used for state management

## redux-persist
Used to persist the redux store on app close
