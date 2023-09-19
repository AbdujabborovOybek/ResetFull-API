-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Сен 19 2023 г., 08:06
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `resetfull-api`
--

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` char(10) NOT NULL,
  `fullname` char(36) DEFAULT NULL,
  `role` char(15) NOT NULL DEFAULT 'user',
  `img` char(120) DEFAULT 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
  `email` char(30) DEFAULT NULL,
  `phone` char(15) DEFAULT NULL,
  `username` char(15) NOT NULL,
  `password` char(42) NOT NULL,
  `joined_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `fullname`, `role`, `img`, `email`, `phone`, `username`, `password`, `joined_at`, `updated_at`) VALUES
('d455f679', 'Kurganov Shoxjaxon', 'user', 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png', 'kurganov@gmail.com', '931076036', 'kshoxjaxon', '42f360f1-95b4-5dee-821b-f0d2f6a5d856', '2023-09-16 06:10:58', '2023-09-19 06:01:52'),
('e58c8f08', 'Oybek Abdujabborov', 'owner', 'http://localhost:8080/img/user_f98c85a8.jpg', 'abdujabborovoybek@gmail.com', '998950270496', 'admin', 'f0de0e66-e6b6-5bed-9a9f-73459b6adbe7', '2023-09-14 06:02:26', '2023-09-19 05:54:39');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD UNIQUE KEY `UNIQUE_ID` (`id`),
  ADD UNIQUE KEY `UNIQUE_USERNAME` (`username`),
  ADD UNIQUE KEY `UNIQUE_PHONE` (`phone`),
  ADD UNIQUE KEY `UNIQUE_EMAIL` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
