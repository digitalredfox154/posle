CREATE TABLE `email_otps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`code` varchar(6) NOT NULL,
	`attempts` int NOT NULL DEFAULT 0,
	`blocked` boolean NOT NULL DEFAULT false,
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `email_otps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `clients` DROP INDEX `clients_phone_unique`;--> statement-breakpoint
ALTER TABLE `clients` MODIFY COLUMN `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `clients` ADD `email` varchar(320);--> statement-breakpoint
ALTER TABLE `clients` ADD `passwordHash` text;--> statement-breakpoint
ALTER TABLE `clients` ADD CONSTRAINT `clients_email_unique` UNIQUE(`email`);