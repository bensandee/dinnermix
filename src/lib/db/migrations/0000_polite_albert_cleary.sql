CREATE DATABASE `dinnermix`;
--> statement-breakpoint
CREATE TABLE `dinnermix`.`recipe_owner` (
	`recipeId` int NOT NULL,
	`userId` int NOT NULL,
	`datePrepared` datetime NOT NULL,
	CONSTRAINT `recipe_owner_recipeId_userId` PRIMARY KEY(`recipeId`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `dinnermix`.`recipe` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`slug` varchar(120) NOT NULL,
	`description` text,
	`url` varchar(400),
	`prepCount` int NOT NULL DEFAULT 0,
	`userId` int NOT NULL,
	CONSTRAINT `recipe_id` PRIMARY KEY(`id`),
	CONSTRAINT `recipe_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `dinnermix`.`user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(80) NOT NULL,
	`email` varchar(120) NOT NULL,
	`lastLogin` datetime,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `recipe_owner` ADD CONSTRAINT `recipe_owner_recipeId_recipe_id_fk` FOREIGN KEY (`recipeId`) REFERENCES `recipe`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recipe_owner` ADD CONSTRAINT `recipe_owner_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recipe` ADD CONSTRAINT `recipe_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;