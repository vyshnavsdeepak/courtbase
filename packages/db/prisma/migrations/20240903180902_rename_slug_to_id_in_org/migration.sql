/*
  Warnings:

  - You are about to drop the column `slug` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `id` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Organization_slug_key";

-- AlterTable
ALTER TABLE "Organization" RENAME COLUMN "slug" TO "id";
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("id");
