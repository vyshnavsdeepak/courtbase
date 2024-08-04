/*
  Warnings:

  - You are about to drop the `_OrganizationToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrganizationToUser" DROP CONSTRAINT "_OrganizationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToUser" DROP CONSTRAINT "_OrganizationToUser_B_fkey";

-- DropTable
DROP TABLE "_OrganizationToUser";

-- CreateTable
CREATE TABLE "OrganizationMembers" (
    "organizationId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" VARCHAR(255) NOT NULL,

    CONSTRAINT "organizationMembers_organizationId_userId_pk" PRIMARY KEY ("organizationId","userId")
);
