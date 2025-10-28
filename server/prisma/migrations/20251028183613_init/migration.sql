-- CreateTable
CREATE TABLE `Media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `type` ENUM('MOVIE', 'TV_SHOW') NOT NULL,
    `director` VARCHAR(100) NOT NULL,
    `budget` DOUBLE NULL,
    `budgetLabel` VARCHAR(50) NULL,
    `location` VARCHAR(100) NULL,
    `durationMin` INTEGER NULL,
    `year` VARCHAR(20) NULL,
    `notes` TEXT NULL,
    `posterUrl` VARCHAR(500) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
