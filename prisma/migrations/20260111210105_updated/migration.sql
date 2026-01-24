/*
  Warnings:

  - You are about to drop the `subscribe_plans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscribe_purchases` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `subscribe_purchases` DROP FOREIGN KEY `subscribe_purchases_user_id_fkey`;

-- DropTable
DROP TABLE `subscribe_plans`;

-- DropTable
DROP TABLE `subscribe_purchases`;

-- CreateTable
CREATE TABLE `subscription_purchases` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(100) NOT NULL,
    `price_paid` DECIMAL(10, 2) NOT NULL,
    `currency` ENUM('UAH', 'USD', 'EUR') NOT NULL,
    `purchased_at` DATETIME(3) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `subscription_purchases_user_id_key`(`user_id`),
    INDEX `subscription_purchases_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscription_plans` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `currency` VARCHAR(191) NULL DEFAULT 'UAH',
    `duration_days` INTEGER NULL DEFAULT 30,
    `is_active` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `subscription_plans_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subscription_purchases` ADD CONSTRAINT `subscription_purchases_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
