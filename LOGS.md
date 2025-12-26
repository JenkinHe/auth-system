 - 10/12/2025 - Check Node v22.20.0 is up to date, write check list and init project on github
 - 13/12/2025 - Basic node_modeule , git ignore
 - 13/12/2025 - Basic folder structure and server running , not eslint and prettier config
 - 14/12/2025 - run postgres in docker any postgres for now not latest
 - 14/12/2025 - got prettier and eslint to work properly
 - 15/12/2025 - generate and run database migrations for user and refresh token for auth (could make more later depends)
 - 16/12/2025 - connect database to server, connect app to routes with UseExpressServer
 - 16/12/2025 - make login and register controllers, dtos, and authservice, encrypt with bcrypt(route with routing controllers cleaner than regular routes)
 - 21/12/2025 - dealt with the database auth issue by, dockerising my api-backend(auth backend) so it has to do less jumps to connect with db(controlled environment)
 - 21/12/2025 - created refresh and access token and return them on login
 - 21/12/2025 - hot reload with nodemon for docker, hot reloads my backend in dev
 - 21/12/2025 - breaking and regenerating migrations(by adding more description column to user)(also must exec into docker to do migration)
 - 21/12/2025 - create a simple getter with propper rest api path strucutre to get a user by id's email and description
 - 21/12/2025 - create middleware to verify access token
 - 26/12/2025 - create new, revoke refresh token and generate new access token with refresh token endpoint (make it atomic all in or all out)

Main Hurdles 
- Eslint + Prettier Config
- Dockeriseing backend + db