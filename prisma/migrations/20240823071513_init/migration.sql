/*
  Warnings:

  - You are about to drop the column `name` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `eth_address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_verified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `message_data` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nonce` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `signature` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `signed_message` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Todo` DROP COLUMN `name`,
    DROP COLUMN `status`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `eth_address`,
    DROP COLUMN `is_verified`,
    DROP COLUMN `message_data`,
    DROP COLUMN `nonce`,
    DROP COLUMN `signature`,
    DROP COLUMN `signed_message`,
    DROP COLUMN `timestamp`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_address_key` ON `User`(`address`);

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
