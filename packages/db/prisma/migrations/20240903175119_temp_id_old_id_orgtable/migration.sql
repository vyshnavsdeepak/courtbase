/*
  Warnings:

  - You are about to drop the column `id` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `oldId` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" RENAME COLUMN "id" TO "oldId";
