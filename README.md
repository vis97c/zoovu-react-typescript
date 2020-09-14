# Zoovu game React.js

Mini game built in react for zoovo.

[Github repo](https://github.com/vis97c/zoovu-react-typescript) - [Live preview](https://zoovu-react.surge.sh/)

This project was originally built in [Vue.js](https://github.com/vis97c/zoovu-vue), visit the original repo to learn more about it.

## development

Install the node dependencies.

```bash
    yarn
    #Or
    npm install
```

Then build the project, thats all.

```bash
    yarn dev
    #Or
    npm run dev
```

While "**watch**" mode is available, i recommend to run the dev command at leat once to copy the static assets to the "**public**" directory 

Also while developing you can optionally provide the enviroment variable "WATCH_BROWSER" to open a different browser than the system default

The source files will be available at "**src**" directory

## deployment

This project is hosted on surge

```bash
    yarn deploy
    #Or
    npm run deploy
```

Optionally you can run the "**build**" command to generate the required assets to deploy in other enviroment