/*
  Warnings:

  - You are about to drop the column `is_banned_until` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `premium_since` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `premium_until` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `statistics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `rolepermission` DROP FOREIGN KEY `RolePermission_permission_id_fkey`;

-- DropForeignKey
ALTER TABLE `rolepermission` DROP FOREIGN KEY `RolePermission_role_id_fkey`;

-- DropIndex
DROP INDEX `RolePermission_permission_id_fkey` ON `rolepermission`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `is_banned_until`,
    DROP COLUMN `premium_since`,
    DROP COLUMN `premium_until`,
    ADD COLUMN `banned_until` DATETIME(3) NULL;

-- DropTable
DROP TABLE `statistics`;

-- CreateTable
CREATE TABLE `announcement_statistics` (
    `id` VARCHAR(191) NOT NULL,
    `announcement_id` VARCHAR(100) NOT NULL,
    `total_views` INTEGER NOT NULL DEFAULT 0,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `announcement_statistics_announcement_id_key`(`announcement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `announcement_views_day` (
    `id` VARCHAR(191) NOT NULL,
    `announcement_id` VARCHAR(100) NOT NULL,
    `view_date` DATETIME(3) NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `announcement_views_day_announcement_id_key`(`announcement_id`),
    UNIQUE INDEX `announcement_views_day_announcement_id_view_date_key`(`announcement_id`, `view_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `average_prices` (
    `id` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(100) NOT NULL,
    `model` VARCHAR(100) NOT NULL,
    `region_id` INTEGER NULL,
    `avg_price` DECIMAL(10, 2) NOT NULL,
    `cars_count` INTEGER NOT NULL,
    `calculated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `average_prices_brand_model_region_id_key`(`brand`, `model`, `region_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `premium_purchases` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(100) NOT NULL,
    `price_paid` DECIMAL(10, 2) NOT NULL,
    `currency` ENUM('UAH', 'USD', 'EUR') NOT NULL,
    `purchased_at` DATETIME(3) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `premium_purchases_user_id_key`(`user_id`),
    INDEX `premium_purchases_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `average_prices` ADD CONSTRAINT `average_prices_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `regions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `premium_purchases` ADD CONSTRAINT `premium_purchases_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
