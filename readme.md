# News aggregator

This API is built in NestJS framework with Typescript. It allows to search for articles in the New York Time's, The Guardian APIs and NewsAPI. You can search in one of the three providers or in all at same time. For any search a token is required. This token is obtained by signin with a valid user in the database.

## First steps

1. run `npm install`
2. generate database with dump.sql
3. watch .envexample for get a guide of how provide your own NYT,The Guardian and NewsApi API keys, provide your DB credentials and also provide a secret pass for JsonWebToken.
4. run `npm run up`

## Usage

- endpoint for login is /login
- payload for login is {username:string,password:string}
- endpoint for news is /news?q=[search]&source=[provider]
- q query param is the term or setence searched
- source is the provider for search, accepts values: nyt|guardian|news|all

## Documentation

More examples of use cases of this API can be founded [here](https://documenter.getpostman.com/view/9673662/SWLZhBT6?version=latest)
