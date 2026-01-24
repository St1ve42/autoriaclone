/*
  Warnings:

  - You are about to drop the column `code` on the `regions` table. All the data in the column will be lost.
  - You are about to drop the `premium_purchases` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `regions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `premium_purchases` DROP FOREIGN KEY `premium_purchases_user_id_fkey`;

-- DropIndex
DROP INDEX `announcement_views_day_announcement_id_key` ON `announcement_views_day`;

-- AlterTable
ALTER TABLE `regions` DROP COLUMN `code`;

-- DropTable
DROP TABLE `premium_purchases`;

-- CreateTable
CREATE TABLE `subscribe_purchases` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(100) NOT NULL,
    `price_paid` DECIMAL(10, 2) NOT NULL,
    `currency` ENUM('UAH', 'USD', 'EUR') NOT NULL,
    `purchased_at` DATETIME(3) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `subscribe_purchases_user_id_key`(`user_id`),
    INDEX `subscribe_purchases_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribe_plans` (
    `id` VARCHAR(191) NOT NULL,
    `code` ENUM('premium') NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `currency` VARCHAR(191) NULL DEFAULT 'UAH',
    `duration_days` INTEGER NULL DEFAULT 30,
    `is_active` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `subscribe_plans_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `regions_name_key` ON `regions`(`name`);

-- AddForeignKey
ALTER TABLE `subscribe_purchases` ADD CONSTRAINT `subscribe_purchases_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
