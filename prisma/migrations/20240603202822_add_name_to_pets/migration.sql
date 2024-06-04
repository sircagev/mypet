-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(32) NOT NULL,
    `email` VARCHAR(32) NOT NULL,
    `password` VARCHAR(64) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Races` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,
    `photo` VARCHAR(64) NOT NULL,
    `race_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `gender_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_race_id_fkey` FOREIGN KEY (`race_id`) REFERENCES `Races`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `Genders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
