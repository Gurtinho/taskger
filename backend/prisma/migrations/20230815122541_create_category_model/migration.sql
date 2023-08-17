/*
  Warnings:

  - You are about to drop the column `concluded` on the `options` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `options` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `options` table. All the data in the column will be lost.
  - You are about to drop the column `progress` on the `options` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `options` table. All the data in the column will be lost.
  - Added the required column `name` to the `options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "options" DROP COLUMN "concluded",
DROP COLUMN "content",
DROP COLUMN "message",
DROP COLUMN "progress",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "category_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
