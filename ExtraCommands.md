-- exec into api-backend docker to run commands for migration
docker exec -it auth-backend sh

npx typeorm-ts-node-commonjs migration:generate src/migrations/InitSchema -d src/data-source.ts (generate from entities)
npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts (run from migrations with data source configs)

docker compose down -v
docker compose up -d

npm run dev