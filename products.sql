-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 12, 2024 at 06:49 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `datn_snakerhub_wd128`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `category_id` bigint UNSIGNED NOT NULL,
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` int NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sales_count` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`category_id`, `id`, `name`, `description`, `price`, `thumbnail`, `sales_count`, `created_at`, `updated_at`, `deleted_at`, `short_description`) VALUES
(1, 1, 'soluta', 'Eveniet quisquam consequatur adipisci et repellendus.', 666706, 'https://i.pinimg.com/474x/3c/b5/c9/3cb5c9bc8ce7b91df92277ea84db100a.jpg', 0, '2024-11-10 04:07:21', '2024-11-10 04:07:21', NULL, NULL),
(1, 2, 'neque', 'Veritatis id sint asperiores quo.', 554116, 'https://i.pinimg.com/736x/4a/14/43/4a1443616f7f9b026011ea7725fcf795.jpg', 0, '2024-11-10 04:07:21', '2024-11-10 04:07:21', NULL, NULL),
(1, 3, 'ducimus', 'Cum a tenetur incidunt ut eaque tempore eos.', 674785, 'https://i.pinimg.com/474x/ea/5b/d8/ea5bd8787ce4e35cf92c7cdb53c5668f.jpg', 0, '2024-11-10 04:07:21', '2024-11-10 04:07:21', NULL, NULL),
(1, 4, 'qui', 'Minima eos quo qui unde asperiores incidunt temporibus est.', 635511, 'https://i.pinimg.com/474x/17/60/f2/1760f29669417e6b77c2b98a831d1e81.jpg', 0, '2024-11-10 04:07:21', '2024-11-10 04:07:21', NULL, NULL),
(1, 5, 'necessitatibus', 'Cupiditate at qui et nisi placeat quaerat.', 610961, 'https://i.pinimg.com/474x/bb/b3/d8/bbb3d8265eb29861b9ea25e6ad499928.jpg', 0, '2024-11-10 04:07:21', '2024-11-10 04:07:21', NULL, NULL),
(1, 6, 'aperiam', 'Velit est ipsum qui tempora.', 621206, 'https://i.pinimg.com/474x/d3/1f/3a/d31f3ad3bab78dff5514f4a208eeb78b.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(1, 7, 'illo', 'Commodi qui repellat animi quis dolor.', 594171, 'https://i.pinimg.com/474x/86/e1/a3/86e1a39c277b95d33142578a9dbecebc.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(1, 8, 'ut', 'Eos voluptas fuga quibusdam perferendis corrupti expedita incidunt.', 646106, 'https://i.pinimg.com/474x/38/a1/b7/38a1b7e44feb4a0b8859eb14d168ce73.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(1, 9, 'minima', 'Quis sapiente laboriosam minima.', 749854, 'https://i.pinimg.com/474x/d0/c2/9f/d0c29fa27be008a36f7b83cca9456273.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(1, 10, 'est', 'Quidem repellat amet ab ullam aut sit.', 527563, 'https://i.pinimg.com/474x/cf/80/24/cf8024994c11ff3c3ea520ae66b5279b.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(2, 11, 'quas', 'Autem deleniti perspiciatis in mollitia officia alias sint.', 743377, 'https://i.pinimg.com/474x/9a/72/d9/9a72d9c3b11a6a0d6013e0daa60036de.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(2, 12, 'eveniet', 'Aut aut sed dolorum.', 598964, 'https://i.pinimg.com/474x/c5/1e/b5/c51eb513e97badfc2f64a93440adf999.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(2, 13, 'dolor', 'Cumque tenetur dolorum odit aut.', 647600, 'https://i.pinimg.com/474x/5a/d9/f8/5ad9f8eff8db2b06f50779c9d7fc3ab1.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(2, 14, 'facere', 'Tempore itaque consectetur ab et commodi esse et.', 553021, 'https://i.pinimg.com/474x/2a/c6/66/2ac6669abef2df8906ae97f552bf2707.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(2, 15, 'aut', 'Nisi repudiandae similique quasi et.', 627805, 'https://i.pinimg.com/474x/0d/aa/96/0daa96b7fd0135f07ec72e1859acd2fc.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(2, 16, 'iste', 'Officia quia earum id totam placeat molestiae earum.', 542421, 'https://i.pinimg.com/474x/82/65/a5/8265a5f4903a8e8e00a74eec2ec36613.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(2, 17, 'alias', 'Ducimus voluptatum quam eligendi unde alias velit.', 556275, 'https://i.pinimg.com/474x/a1/ef/34/a1ef34a3c471d87bb68ce29d2ed85532.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(2, 18, 'voluptatibus', 'Nesciunt neque a accusamus.', 795478, 'https://i.pinimg.com/474x/b6/d4/44/b6d4442b617270e82f005c84640814d0.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(2, 19, 'dolores', 'Perspiciatis voluptatibus et aut quibusdam amet placeat eos.', 515388, 'https://i.pinimg.com/474x/af/06/f1/af06f1066ff7026aa01730d9eb3d013a.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(2, 20, 'repellendus', 'Fugit ut soluta nesciunt nihil sit sequi.', 522593, 'https://i.pinimg.com/474x/ed/2c/4b/ed2c4b9a350631b70270f9c14b38ed3a.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(3, 21, 'quod', 'Commodi enim qui culpa dignissimos.', 691293, 'https://i.pinimg.com/474x/61/fc/96/61fc96371590aaba5ec5fe2155cada63.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(3, 22, 'placeat', 'Eos id accusantium eos quaerat dolor in in.', 742505, 'https://i.pinimg.com/474x/81/dc/c5/81dcc5f456b0cdd1fcc53da197e94017.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(3, 23, 'dolore', 'Est rerum deleniti in eum.', 590831, 'https://i.pinimg.com/474x/79/6e/66/796e66e353b851bbc9295bfd3d75db1e.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(3, 24, 'tempora', 'Sed numquam ut consequatur iure.', 677465, 'https://i.pinimg.com/474x/8c/b7/15/8cb715361c524ae1a796df770acbece9.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(3, 25, 'nihil', 'Dignissimos natus ad quia ut nihil.', 525829, 'https://i.pinimg.com/474x/b4/8b/3a/b48b3a14843d9535ee233da4f45efe08.jpg', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(3, 26, 'id', 'Ullam quam in rem qui velit.', 604676, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(3, 27, 'et', 'Neque nostrum qui tempora amet officiis.', 740819, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(3, 28, 'dolorem', 'Soluta et autem blanditiis autem.', 764785, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(3, 29, 'consequatur', 'Est et voluptatum atque consequatur fugiat pariatur fuga tenetur.', 684881, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(3, 30, 'non', 'Delectus aut quia laboriosam totam recusandae qui perferendis.', 513311, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(4, 31, 'vel', 'Et quos qui ut perspiciatis.', 525013, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(4, 32, 'praesentium', 'Odit nisi nulla voluptatem necessitatibus natus ratione.', 697730, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(4, 33, 'rem', 'Omnis quasi asperiores consequatur dolorum enim aut aliquid omnis.', 767034, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(4, 34, 'officia', 'Quasi aut qui maiores.', 505439, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(4, 35, 'eum', 'Possimus harum perspiciatis inventore voluptatem esse fuga.', 688995, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(4, 36, 'earum', 'Architecto omnis ea sed maiores nemo.', 597330, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(4, 37, 'perspiciatis', 'Voluptas dolorum dolorum voluptatem.', 609746, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(4, 38, 'pariatur', 'Consectetur sed aut expedita et iste atque quae.', 757843, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(4, 39, 'odio', 'Debitis aliquam quia excepturi alias eum quasi.', 665453, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(4, 40, 'autem', 'Adipisci sit accusantium et fugiat consequatur consequuntur natus.', 612439, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(5, 41, 'harum', 'Sint eveniet nihil rerum neque et maxime.', 728715, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(5, 42, 'sed', 'Voluptatem nihil nihil ullam eum sit.', 716756, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(5, 43, 'eius', 'Ipsam aliquid et unde nihil et aut.', 660306, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-12 09:13:19', NULL, NULL),
(5, 44, 'at', 'Nesciunt nobis natus magnam omnis.', 604310, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(5, 45, 'molestiae', 'Rerum excepturi aperiam ea vel vitae suscipit.', 779243, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(5, 46, 'quasi', 'Distinctio deserunt fugiat blanditiis aliquam delectus quaerat quo.', 599197, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(5, 47, 'ipsa', 'Nisi aut quasi consectetur doloribus.', 601519, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(5, 48, 'deleniti', 'Aut aliquid tempora autem quisquam praesentium.', 537451, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(5, 49, 'corrupti', 'Aut harum sint est excepturi molestias beatae est.', 568161, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(5, 50, 'quisquam', 'Et ut dolorum voluptas iste.', 713218, 'https://via.placeholder.com/150', 0, '2024-11-10 04:07:22', '2024-11-10 04:07:22', NULL, NULL),
(5, 51, 'long chín ngón', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 1111111, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/prqV8BjBl8m5IxQgT133uolYdyKp1Yin1LKdRGOe.jpg', 1, '2024-11-11 09:54:46', '2024-11-12 11:18:31', NULL, 'dddddddddddddđ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_name_unique` (`name`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
