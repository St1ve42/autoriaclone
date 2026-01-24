/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[access_token]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refresh_token]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `tokens` DROP FOREIGN KEY `tokens_user_id_fkey`;

-- DropIndex
DROP INDEX `tokens_user_id_fkey` ON `tokens`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `ban_reason` VARCHAR(100) NULL,
    ADD COLUMN `is_banned` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_banned_until` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `permissions_name_key` ON `permissions`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `roles_name_key` ON `roles`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `tokens_access_token_key` ON `tokens`(`access_token`);

-- CreateIndex
CREATE UNIQUE INDEX `tokens_refresh_token_key` ON `tokens`(`refresh_token`);

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
