# News aggregator

This API is built in NestJS framework with Typescript. It allows to search for articles in the New York Time's and The Guardian APIs. You can search in one of the two providers or in both, but for any search that uses New York Time's you must login and use an access token.

## First steps

1. run `npm install`
2. watch .envexample for get a guide of how provide your own NYT and The Guardian API keys, provide a dummy user and a dummy password for authentication and also provide a secret pass for JsonWebToken.
3. run `npm run up`

## Usage

- endpoint for login is /login
- payload for login is {username:string,password:string}
- endpoint for news is /news?q=[search]&source=[provider]
- q query param is the term or setence searched
- source is the provider for search, accepts values: nyt|guardian|both

## Documentation

More examples of use cases of this API can be founded [here](https://documenter.getpostman.com/view/9673662/SWEDza5V?version=latest)
