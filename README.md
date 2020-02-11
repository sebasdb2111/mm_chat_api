# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

Steps to create o modify entities;

1. Create or modify the entity.
2. Make sure the docker is started
3. Run `npm run migration:generate <name of your entity file>`
4. IMPORTANT: If you are in production, make sure that the user insert in init_database file are commented
5. And run `npm run migration:run`
6. If for some reason you want to revert the changes, you can run: `typeorm migration:revert`