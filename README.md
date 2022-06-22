## Getting Started

### 1. Copy this template

```sh
npx degit ceramicstudio/self.id/templates/webpack-basic-typescript my-selfid-app
```

Replace `my-selfid-app` by the folder name you want and access it once installed.

### 2. Install dependencies

In your application folder:

```sh
npm install
# or
yarn install
```

### 3. Run scripts

Use `npm run` or `yarn run` with one of the following scripts:

- `dev`: compile and run a development server
- `build`: compile for production
- `serve`: run a local server for production build


</br>

Aide a l'installation:[INSTALL.MD](documents/INSTALL.MD)|

### Paramétrage
les variables d'environnement sont à mettre dans un fichier **.env** à la racine du projet

contenu du webpack.env :
```
**PORT**=8000
**InfuraProjectId**=
**Matic_MedalVerse_Dev_01_ProjectId**=
***InfuraProjectSecret***=[facultatif]
***Account00PK***=[facultatif] clé privée pour signer des transactions en batch
```
contenu du .env :
```
**Test**=value
```
## Lancement :
- dans le répertoire racine :
`npm start`
`npm run dev` | `npx webpack serve  --mode development --open`
`npm run devOpen` | `npx webpack serve --mode development --open`
`npx webpack serve --open-app-name 'brave'`


</br>
</br>
## Documents Annexes
|DOCUMENT|FICHIER|
|---:|:---|
|README.md|[README.md](README.md)|


</br>
</br>

## Lancement des tests
- à la racine du projet :

```truffle test --network developement```

 - Block Explorer :
 ```https://mumbai.polygonscan.com/```

 - Faucet :
```https://faucet.polygon.technology/```


------------
[Editor.md Open source online Markdown editor.](https://pandao.github.io/editor.md "editor.md")
