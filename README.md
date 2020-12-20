# konexio-meeting

## Getting Started
NB : this has only been tested on **MAC OS Big Sur** but this should work fine on any Unix environnement
### What you need 

- Install [NPM](https://www.npmjs.com)
- Any console/terminal

### Run project

```bash 
cd back
npm install
npm run resetdb
npm start #this should start an express server on port 3333
# open another tab terminal at root's project
cd front
npm install
npm start
```

The express server is launched, so is the little database.
React app is also running, you can visit it at : http://localhost:3000


## Miscellaneous

- The database is a sqlite file located at `/back`
- The upload folder is located at `front/public`