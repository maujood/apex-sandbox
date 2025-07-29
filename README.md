# apex-sandbox

## How to run locally

`npm install` to install all npm packages

`heroku local web` to run heroku server

`cd client` followed by `npm install` and then `npm start` to run React front-end

If running locally with a newer Node version and you get an error stating "digital envelope routines", you may need to set the NODE_OPTIONS environment variable by running the following in powershell before starting up the application: `$env:NODE_OPTIONS="--openssl-legacy-provider"`

NOTE: The project will not run without setting up a postgres database which is not included in this repo. If you wish to run this locally, please reach out to me and I can provide you with credentials to my dev database.

`git push heroku main` to deploy the whole thing to Heroku