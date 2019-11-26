# Frontend Boilerplate

- A starter kit for frontend project using Webpack, Pug, Sass, Babel, Bootstrap, jQuery, Yarn and more.
- The purpose if this webpack starter is to allow people to create websites without frameworks/libraries like React, Angular, Vue and only using simple but powerful technologies to build quality websites.

## Technologies used

- Templating: `Pug` (This is a template engine and is a fastest way to write HTML)
- Styling: `Sass` (This is a CSS preprocessor which is used to write styles)
- Scripting: `jQuery or plain JavaScript`
- JS Compiler: `Babel` (The compiler for next generation JavaScript)
- CSS framework: `Bootstrap` (The most popular HTML, CSS, and JS library in the world)
- Bundler: `Webpack` (A module bundler to manager all the dependencies)
- `Babel module resolver` configured to use alias and simplify the paths you need to import.
- `Editorconfig` helps maintain consistent coding styles.
- `Yarn` for fast, reliable, and secure dependency management.
- `PostCSS` a tool for transforming CSS with JavaScript (https://postcss.org)
- Webpack notifier on every compilation.
- Compatibility with `manifest`, `browserconfig` and other external files you wish to include.

## Development

### Dependencies

- Git https://git-scm.com/downloads
- NodeJS >= 6 https://nodejs.org
- Yarn: `brew install yarn` or follow the specific guide for your OS https://yarnpkg.com/lang/en/docs/install
- Webpack and webpack dev server: Install them with `yarn global add webpack webpack-dev-server`

### Process of development

1. Clone the `master` branch of the repository first `git@github.com:lennguyen/frontend-boilerplate.git`.
2. Open the folder `frontend-boilerplate` in your code editor because that one contains the source code.
3. Run `yarn install` to install all dependencies.
4. Start the `development server` of the project with `yarn run dev` (if you want to test the development server in your local network, you should run `yarn run dev-network` instead and with the IP of your host computer, you can access to the website in your other devices)
5. Perform all the modifications you need

### Compiling

6. Run `yarn run build` to build the project without minification.
7. In order to generate the production package, press `CTRL + C` to stop the development server and run the command `yarn run prod` and the production build is going to be generated in the `dist` folder.

### Testing

8. You should always test the production package in your local before push to the repository, open the `dist` folder in your explorer/finder and open the `index.html` with your browser or
9. use the recommended way installing `http-server` with `yarn global add http-server` and inside the `dist` folder run the command `http-server -p 9090` to finally open the url `http://localhost:9090` to see the production package in action.

## Project structure

- `node_modules`: Contains all the javascript dependencies, you don't need to worry about this and also you should't modify any file there.
- `dist`: Your production code will be placed here, the final package ready to install in your server. No changes are necessary here as this is automatically generated from your source files.
- `src`: All of the source code is contained here: assets, js, scss, pug files, etc. **Any changes you want to make to the website must be done here.**
  - `assets`: All the images, icons, static js files and the fonts needed to run the site. Any new assets must be placed here.
    - `fonts`: All fonts here.
    - `icons`: All favicons here.
    - `images`: All images here.
    - `scripts`: All the scripting here.
    - `styles`: All the CSS(SASS) styles separated into folders to have a modular structure.
    - `videos`: All video files here
  - `views`: You can create more pages in this folder using Pug instead of writing pure HTML.
    - `layouts`: The main template files which contain your header and your footer.
    - `components`: The shared components to avoid repeat code.
    - `mixins`: Pieces of Pug files that are used for the same purpose of the layouts, which is to avoid repeat code in each guide template and instead use a mixing to place the same menu, share bar, page title, etc. just passing an attribute for each one.
    - `pages`: All sub pages here.
    - `index.pug`: Home page
- `webpack.config.babel.js`: This is one of the most important files because it's the one that builds the production package and also the development environment, compiling the SASS and Pug files into HTML and CSS code. It also minifies all the files.
- `.editorconfig`: Used to set a configuration for your editor code, like use spaces instead tabs, the charset, of the files, etc.
- `.gitignore`: Here is where you can set which files/folders shouldn't be tracked by `git`, that means, the file/folder written in this file will not be pushed to the repository such as `node_modules` and `dist` folder.
- `.eslintrc`: ESLint configuration.
- `.babelrc`: Babel configuration.
- `.postcssrc`: PostCSS configuration.
- `package.json`: When you run the command `yarn install`, the packages installed are the ones listed in this file with the version that were installed, if you need to add more packages you can run the command `yarn add package_name --save` then a new package will be installed in the `node_modules` folder and the `package.json` will be updated with a new line of the package added.

## Check Updates: package.json

- `https://www.npmjs.com/package/npm-check-updates`: npm-check-updates upgrades your package.json dependencies to the latest versions, ignoring specified versions.

## Linters

- Use ESLint (https://eslint.org) and Airbnb (https://www.npmjs.com/package/eslint-config-airbnb-base)

## Code Formatter

- Use Prettier (https://prettier.io)

## VS Code

- EditorConfig for VS Code
- ESLint
- Prettier - Code formatter
- puglint
- scss-lint
