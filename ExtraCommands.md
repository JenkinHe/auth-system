npx typeorm-ts-node-commonjs migration:generate src/migrations/InitUserAndRefreshToken -d src/data-source.ts (generate from entities)
npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts (run from migrations with data source configs)


npm run dev