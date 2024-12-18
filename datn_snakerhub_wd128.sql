-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 08, 2024 at 04:22 AM
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
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `user_id` bigint UNSIGNED NOT NULL,
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`user_id`, `id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, '2024-12-07 20:38:29', '2024-12-07 20:38:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cart__items`
--

CREATE TABLE `cart__items` (
  `cart_id` bigint UNSIGNED NOT NULL,
  `product__variant_id` bigint UNSIGNED NOT NULL,
  `id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart__items`
--

INSERT INTO `cart__items` (`cart_id`, `product__variant_id`, `id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 23, 1, 7, '2024-12-07 21:14:02', '2024-12-07 21:14:17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Nike', '2024-12-07 20:42:49', '2024-12-07 20:42:49', NULL),
(2, 'Adidas', '2024-12-07 20:42:56', '2024-12-07 20:42:56', NULL),
(3, 'Puma', '2024-12-07 20:43:03', '2024-12-07 20:43:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Đỏ', '2024-12-07 20:41:31', '2024-12-07 20:41:31', NULL),
(2, 'Xanh', '2024-12-07 20:41:36', '2024-12-07 20:41:36', NULL),
(3, 'Vàng', '2024-12-07 20:41:40', '2024-12-07 20:41:40', NULL),
(4, 'Trắng', '2024-12-07 20:42:07', '2024-12-07 20:42:07', NULL),
(5, 'Đen', '2024-12-07 20:42:11', '2024-12-07 20:42:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `user_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `order__item_id` bigint UNSIGNED NOT NULL,
  `id` bigint UNSIGNED NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `star` tinyint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `user_id` bigint UNSIGNED NOT NULL,
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `galleries`
--

CREATE TABLE `galleries` (
  `product_id` bigint UNSIGNED NOT NULL,
  `id` bigint UNSIGNED NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `galleries`
--

INSERT INTO `galleries` (`product_id`, `id`, `image_path`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/nLgLYvNmqFJvmarapo7aMatzr1d2zM2uRthMcHSR.jpg', '2024-12-07 20:48:44', '2024-12-07 20:48:44', NULL),
(1, 2, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/sTq2xdrnCFnGLCrtsbIVnFCNAlFmUe7Ba1246h4e.jpg', '2024-12-07 20:48:44', '2024-12-07 20:48:44', NULL),
(2, 3, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/lKdVsRgKYEuD7GGLPj3K36oLxEOzgED9YY4Eevla.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(3, 4, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(4, 5, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(5, 6, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(6, 7, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(7, 8, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(8, 9, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(9, 10, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(10, 11, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(11, 12, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(12, 13, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(13, 14, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(14, 15, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(15, 16, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(16, 17, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(17, 18, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(18, 19, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(19, 20, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(20, 21, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(21, 22, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(22, 23, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL),
(23, 24, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-07-10 08:51:37', '2024-07-10 08:51:37', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2014_10_12_100000_create_password_resets_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2024_10_01_034642_create_customers_table', 1),
(7, '2024_10_02_030847_create_categories_table', 1),
(8, '2024_10_02_030922_create_colors_table', 1),
(9, '2024_10_02_030929_create_sizes_table', 1),
(10, '2024_10_02_030939_create_products_table', 1),
(11, '2024_10_02_030940_create_product__variants_table', 1),
(12, '2024_10_02_031222_create_carts_table', 1),
(13, '2024_10_02_031234_create_cart__items_table', 1),
(14, '2024_10_02_031254_create_orders_table', 1),
(15, '2024_10_02_031301_create_order__items_table', 1),
(16, '2024_10_02_031314_create_comments_table', 1),
(17, '2024_10_04_014544_add_is_active_to_all_tables', 1),
(18, '2024_10_16_092149_create_galleries_table', 1),
(19, '2024_11_07_034027_update_short_des_product_table', 1),
(20, '2024_11_07_154000_create_vouchers_table', 1),
(21, '2024_11_11_021534_update_order_code_orders_table', 1),
(22, '2024_11_11_021535_update_status_payment_orders_table', 1),
(23, '2024_11_11_021536_update_discount_shippingFee_orders_table copy', 1),
(24, '2024_11_11_021536_update_paymentMethod_orders_table', 1),
(25, '2024_11_12_040013_update_note_orders_table', 1),
(26, '2024_11_12_044406_create_slides_table', 1),
(27, '2024_11_21_125626_create_jobs_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `customer_id` bigint UNSIGNED NOT NULL,
  `id` bigint UNSIGNED NOT NULL,
  `total_price` int NOT NULL,
  `status` enum('Chờ xử lý','Đã xác nhận','Đang vận chuyển','Đã giao hàng','Yêu cầu trả hàng','Xử lý yêu cầu trả hàng','Trả hàng','Từ chối trả hàng','Hoàn thành','Đã hủy') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Chờ xử lý',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `order_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_payment` enum('Chưa thanh toán','Đã thanh toán') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Chưa thanh toán',
  `codeDiscount` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shippingFee` int NOT NULL,
  `totalAfterDiscount` int NOT NULL,
  `paymentMethod` enum('COD','VNPAY') COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` enum('Giao hàng không đúng yêu cầu','Sản phẩm có lỗi từ nhà cung cấp','Lý do khác','Không') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Không'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order__items`
--

CREATE TABLE `order__items` (
  `order_id` bigint UNSIGNED NOT NULL,
  `product__variant_id` bigint UNSIGNED NOT NULL,
  `id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `sell_count` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`category_id`, `id`, `name`, `description`, `price`, `thumbnail`, `sell_count`, `created_at`, `updated_at`, `deleted_at`, `short_description`) VALUES
(1, 1, 'Sản phẩm 1', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 0, '2024-12-07 20:48:44', '2024-12-07 20:48:44', NULL, 'Mô tả ngắn'),
(2, 2, 'Sản phẩm 2', 'mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/HGjmgHt1Cb6Eb2PLTZntxh8Jgd8IR2gV9tBhgBEq.jpg', 0, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'mô tả ngắn'),
(3, 3, 'Sản phẩm 3', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(1, 4, 'Sản phẩm 4', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(1, 5, 'Sản phẩm 5', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(1, 6, 'Sản phẩm 6', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(1, 7, 'Sản phẩm 7', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(1, 8, 'Sản phẩm 8', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(2, 9, 'Sản phẩm 9', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(2, 10, 'Sản phẩm 10', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(2, 11, 'Sản phẩm 11', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(2, 12, 'Sản phẩm 12', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(2, 13, 'Sản phẩm 13', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(3, 14, 'Sản phẩm 14', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(3, 15, 'Sản phẩm 15', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(3, 16, 'Sản phẩm 16', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(3, 17, 'Sản phẩm 17', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(3, 18, 'Sản phẩm 18', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(3, 19, 'Sản phẩm 19', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(3, 20, 'Sản phẩm 20', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(3, 21, 'Sản phẩm 21', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(3, 22, 'Sản phẩm 22', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn'),
(3, 23, 'Sản phẩm 23', 'Mô tả dài', 500000, 'http://datn-snakerhub-wd128.test/BE/public/storage/images/EwFD36jSw8Rsw98MpTnvsUfH0rPrpzAplLqmYuHa.jpg', 3, '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL, 'Mô tả ngắn');

-- --------------------------------------------------------

--
-- Table structure for table `product__variants`
--

CREATE TABLE `product__variants` (
  `product_id` bigint UNSIGNED NOT NULL,
  `color_id` bigint UNSIGNED NOT NULL,
  `size_id` bigint UNSIGNED NOT NULL,
  `id` bigint UNSIGNED NOT NULL,
  `price` int DEFAULT NULL,
  `stock` int NOT NULL,
  `sku` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product__variants`
--

INSERT INTO `product__variants` (`product_id`, `color_id`, `size_id`, `id`, `price`, `stock`, `sku`, `image`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 1, 500000, 20, 'SKU-1-1-1', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/4I0rYV7MFRJbo0N9bDucvjZpbZJizC3N0DhFIZe9.jpg', '2024-12-07 20:48:44', '2024-12-07 20:48:44', NULL),
(1, 1, 2, 2, 500000, 20, 'SKU-1-1-2', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/0H5uAdS36pMHdRb0PbtvF5wO7rf9dGAzVNXkxLXf.jpg', '2024-12-07 20:48:44', '2024-12-07 20:48:44', NULL),
(1, 2, 3, 3, 500000, 20, 'SKU-1-2-3', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/yc9J7BBCyF1joC1WII4wg1zvjUagu5LudbXOC2zz.jpg', '2024-12-07 20:48:44', '2024-12-07 20:48:44', NULL),
(2, 4, 4, 4, 500000, 20, 'SKU-2-4-4', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(3, 5, 4, 5, 500000, 20, 'SKU-3-5-4', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(4, 1, 1, 6, 500000, 20, 'SKU-4-1-1', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(5, 1, 2, 7, 500000, 20, 'SKU-5-1-2', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(6, 2, 1, 8, 500000, 20, 'SKU-6-2-1', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(7, 2, 2, 9, 500000, 20, 'SKU-7-2-2', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(8, 3, 1, 10, 500000, 20, 'SKU-8-3-1', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(9, 3, 2, 11, 500000, 20, 'SKU-9-3-2', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(10, 4, 1, 12, 500000, 20, 'SKU-10-4-1', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(11, 4, 2, 13, 500000, 20, 'SKU-11-4-2', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(12, 5, 1, 14, 500000, 20, 'SKU-12-5-1', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(13, 5, 2, 15, 500000, 20, 'SKU-13-5-2', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(14, 1, 1, 16, 500000, 20, 'SKU-14-1-1', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(15, 1, 2, 17, 500000, 20, 'SKU-15-1-2', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(16, 2, 1, 18, 500000, 20, 'SKU-16-2-1', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(17, 2, 2, 19, 500000, 20, 'SKU-17-2-2', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(18, 3, 1, 20, 500000, 20, 'SKU-18-3-1', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(19, 3, 2, 21, 500000, 20, 'SKU-19-3-2', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(20, 4, 1, 22, 500000, 20, 'SKU-20-4-1', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(21, 4, 2, 23, 500000, 20, 'SKU-21-4-2', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(22, 5, 1, 24, 500000, 20, 'SKU-22-5-1', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL),
(23, 5, 2, 25, 500000, 20, 'SKU-23-5-2', 'http://datn-snakerhub-wd128.test/BE/public/storage/images/8YLrgsNTDrQApaKKVY5nHKGqVgs1yrU9pNXfIKgq.jpg', '2024-12-07 20:50:24', '2024-12-07 20:50:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '36', '2024-12-07 20:40:32', '2024-12-07 20:40:32', NULL),
(2, '37', '2024-12-07 20:40:37', '2024-12-07 20:40:37', NULL),
(3, '38', '2024-12-07 20:40:45', '2024-12-07 20:40:45', NULL),
(4, '39', '2024-12-07 20:40:50', '2024-12-07 20:40:50', NULL),
(5, '40', '2024-12-07 20:41:17', '2024-12-07 20:41:17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `slides`
--

CREATE TABLE `slides` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('admin','user') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `gender` enum('male','female','other') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone_number`, `email`, `email_verified_at`, `password`, `remember_token`, `address`, `type`, `gender`, `birthday`, `avatar`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Nguyễn Đăng Vũ', '0974290440', 'nguyendangvuvinhtuong@gmail.com', NULL, '$2y$12$tAB.U1ZtUKyfV7U/yGMPSuV1hVdwarQHRK1v35UPLCcw3MMWKFdKu', NULL, 'Thổ Tang', 'admin', NULL, NULL, NULL, '2024-12-07 20:38:29', '2024-12-07 20:38:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` bigint UNSIGNED NOT NULL,
  `codeDiscount` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` decimal(8,2) NOT NULL,
  `type` enum('fixed','percent') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'percent',
  `expiration_date` date DEFAULT NULL,
  `usage_limit` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `codeDiscount`, `discount`, `type`, `expiration_date`, `usage_limit`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'GIAMGIA10', '10.00', 'percent', '2024-12-11', 20, '2024-12-07 20:44:20', '2024-12-07 20:44:20', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_foreign` (`user_id`);

--
-- Indexes for table `cart__items`
--
ALTER TABLE `cart__items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart__items_cart_id_foreign` (`cart_id`),
  ADD KEY `cart__items_product__variant_id_foreign` (`product__variant_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_name_unique` (`name`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `colors_name_unique` (`name`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_user_id_foreign` (`user_id`),
  ADD KEY `comments_product_id_foreign` (`product_id`),
  ADD KEY `comments_order__item_id_foreign` (`order__item_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customers_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `galleries_product_id_foreign` (`product_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_order_code_unique` (`order_code`),
  ADD KEY `orders_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `order__items`
--
ALTER TABLE `order__items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order__items_order_id_foreign` (`order_id`),
  ADD KEY `order__items_product__variant_id_foreign` (`product__variant_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_name_unique` (`name`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indexes for table `product__variants`
--
ALTER TABLE `product__variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product__variants_product_id_foreign` (`product_id`),
  ADD KEY `product__variants_color_id_foreign` (`color_id`),
  ADD KEY `product__variants_size_id_foreign` (`size_id`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sizes_name_unique` (`name`);

--
-- Indexes for table `slides`
--
ALTER TABLE `slides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_phone_number_unique` (`phone_number`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vouchers_codediscount_unique` (`codeDiscount`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart__items`
--
ALTER TABLE `cart__items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order__items`
--
ALTER TABLE `order__items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `product__variants`
--
ALTER TABLE `product__variants`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `slides`
--
ALTER TABLE `slides`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `cart__items`
--
ALTER TABLE `cart__items`
  ADD CONSTRAINT `cart__items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `cart__items_product__variant_id_foreign` FOREIGN KEY (`product__variant_id`) REFERENCES `product__variants` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_order__item_id_foreign` FOREIGN KEY (`order__item_id`) REFERENCES `order__items` (`id`),
  ADD CONSTRAINT `comments_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `galleries`
--
ALTER TABLE `galleries`
  ADD CONSTRAINT `galleries_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Constraints for table `order__items`
--
ALTER TABLE `order__items`
  ADD CONSTRAINT `order__items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order__items_product__variant_id_foreign` FOREIGN KEY (`product__variant_id`) REFERENCES `product__variants` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `product__variants`
--
ALTER TABLE `product__variants`
  ADD CONSTRAINT `product__variants_color_id_foreign` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`),
  ADD CONSTRAINT `product__variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product__variants_size_id_foreign` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
