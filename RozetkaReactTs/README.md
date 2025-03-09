# React + TypeScript + Vite

docker build -t rozetka-client .

docker run -d --restart=always --name rozetka_container -p 6543:80 rozetka-client

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

docker hib
docker build -t borys1994/rozetka-client:latest .

docker push borys1994/rozetka-client:latest

login

docker pull borys1994/rozetka-client
docker run -d --restart=always --name rozetka_container -p 6543:80 borys1994/rozetka-client

500  docker images
501  docker ps -a
502  docker stop 386
503  docker ps -a
504  docker rm 386
505  docker ps -a
506  docker images
507  docker rmi 3d2
508  docker images
511  docker pull borys1994/rozetka-client
512  docker images
513  docker run -d --restart=always --name rozetka_container -p 6543:80 borys1994/rozetka-client
514  docker ps -a
515  history