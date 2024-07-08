## Prisma
1. Prismaのインストール （backendプロジェクトで新しいターミナルで実行）

npm i prisma @prisma/client

2. Prismaの初期化

npx prisma init

3. schema.prisma の修正

```json
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Todo {
  id Int @id @default(autoincrement())
  title String
  completed Boolean @default(false)
  order Int @default(0)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
  @@map("todos")
}
```

4. .env の修正

```.env
HOST=localhost
PORT=3001

DATABASE_URL="mysql://root:@localhost:3306/todo-app"
```

5. MySQLサーバの起動（XAMPP）

6. DBマイグレートの実行

```bash
npx prisma migrate dev --name init
```
