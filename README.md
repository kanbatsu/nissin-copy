# Nissin Copy

This project is just an exercice, the goal is to recreate the [Nissin website](https://www.nissin.com/jp/) (Japanese Version)

## TODO :

Actually this website isn't really finish, its remains to do :
- Updating cards Y position to keep a horizontal line in front of the camera
- Finishing the footer implementation for the Mobile
- Add the smoke effect when opening a card
- Detecting the scroll direction to spin in two ways
- and more !

# Installing

If you want to make this app run, you'll need to add assets to the public/assets folder and of course you can adapt the
differents URL of youtube Videos

You need to add a black and white gradient to the public folder, and call it gradient.png (see the .gitignore), it will made the white light in the center fade out, depending on your gradient of course.

For the rest, it's kindly the same as a react app :

```bash
git clone https://github.com/kanbatsu/nissin-copy.git
```

after ...
```bash
cd nissin-copy
npm install
```

and then, what was told before (assets etc...), and you're ready !

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.