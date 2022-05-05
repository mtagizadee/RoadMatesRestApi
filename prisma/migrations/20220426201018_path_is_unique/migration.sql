/*
  Warnings:

  - A unique constraint covering the columns `[avatar]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profile_avatar_key" ON "Profile"("avatar");
