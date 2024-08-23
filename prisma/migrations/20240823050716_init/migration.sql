-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eth_address` VARCHAR(191) NOT NULL,
    `signed_message` VARCHAR(191) NOT NULL,
    `signature` VARCHAR(191) NOT NULL,
    `nonce` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `message_data` VARCHAR(191) NOT NULL,
    `is_verified` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
