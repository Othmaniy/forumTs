CREATE TABLE `answers` (
	`answerId` int AUTO_INCREMENT NOT NULL,
	`answer` varchar(256),
	`anUserid` int,
	`questionid` int,
	CONSTRAINT `answers_answerId` PRIMARY KEY(`answerId`)
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`questionId` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`question` varchar(256) NOT NULL,
	CONSTRAINT `questions_questionId` PRIMARY KEY(`questionId`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`lastname` varchar(256),
	`password` varchar(256) NOT NULL,
	`role` enum('admin','user','employee') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `answers` ADD CONSTRAINT `answers_anUserid_users_id_fk` FOREIGN KEY (`anUserid`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `answers` ADD CONSTRAINT `answers_questionid_questions_questionId_fk` FOREIGN KEY (`questionid`) REFERENCES `questions`(`questionId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `questions` ADD CONSTRAINT `questions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;