CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `admin` TINYINT,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `body` text NOT NULL,
  `likes` int(10) NOT NULL,
  `wholiked` json,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `reason` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`username`, `email`, `password`, `admin`) VALUES ('test', 'test@gmail.com', 'testpass', 0);
INSERT INTO `users` (`username`, `email`, `password`, `admin`) VALUES ('test2', 'test2@gmail.com', 'testpass2', 0);
INSERT INTO `topics` (`name`, `created_by`) VALUES ('test topic', 1);
INSERT INTO `topics` (`name`, `created_by`) VALUES ('test topic2', 2);
INSERT INTO `posts` (`topic_id`, `created_by`, `body`, `likes`, `wholiked`) VALUES (1, 1, 'This is a test post created via direct inster sql command', 0, '{}');
INSERT INTO `posts` (`topic_id`, `created_by`, `body`, `likes`, `wholiked`) VALUES (1, 2, 'This is a test post', 0, '{}');
