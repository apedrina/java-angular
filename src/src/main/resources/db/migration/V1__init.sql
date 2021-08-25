DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`
(
    `id`   int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(20) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users`
(
    `id`       bigint(20) NOT NULL AUTO_INCREMENT,
    `email`    varchar(50)  DEFAULT NULL,
    `password` varchar(120) DEFAULT NULL,
    `username` varchar(20)  DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
    UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1;


DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles`
(
    `user_id` bigint(20) NOT NULL,
    `role_id` int(11)    NOT NULL,
    PRIMARY KEY (`user_id`, `role_id`),
    KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
    CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
    CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1;


insert into users(email, password, username)
values ('pedrina.alisson@gmail.com', '$2a$10$jiQ.HU.Kg51l63rYM49ys.gqdt7/WiLgtcAQn2u7XjoFD8sOBbvMG', 'test');
insert into roles(name)
values ('ROLE_ADMIN');
insert into user_roles(user_id, role_id)
values (1, 1);

insert into users(email, password, username)
values ('alisson@gmail.com', '$2a$10$jiQ.HU.Kg51l63rYM49ys.gqdt7/WiLgtcAQn2u7XjoFD8sOBbvMG', 'user');
insert into roles(name)
values ('ROLE_USER');

insert into user_roles(user_id, role_id)
values (2, 2);