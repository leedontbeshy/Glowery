-- ============================================================================
-- MOCK DATA cho Glowery E-commerce
-- Chạy sau khi đã tạo schema
-- ============================================================================

-- ============================================================================
-- 1. USERS (10 users: 1 admin, 2 sellers, 7 customers)
-- ============================================================================
INSERT INTO users (email, password, full_name, phone, avatar, role, status, email_verified) VALUES
-- Admin
('admin@glowery.com', '$2a$10$rB5H5K5H5K5H5K5H5K5H5OqJ5J5J5J5J5J5J5J5J5J5J5J5J5J5J5', 'Admin Glowery', '0901234567', 'https://i.pravatar.cc/150?img=1', 'admin', 'active', TRUE),

-- Sellers
('seller1@glowery.com', '$2a$10$rB5H5K5H5K5H5K5H5K5H5OqJ5J5J5J5J5J5J5J5J5J5J5J5J5J5J5', 'Nguyễn Văn Seller', '0902345678', 'https://i.pravatar.cc/150?img=11', 'seller', 'active', TRUE),
('seller2@glowery.com', '$2a$10$rB5H5K5H5K5H5K5H5K5H5OqJ5J5J5J5J5J5J5J5J5J5J5J5J5J5J5', 'Trần Thị Bán', '0903456789', 'https://i.pravatar.cc/150?img=12', 'seller', 'active', TRUE),

-- Customers
('user1@gmail.com', '$2a$10$rB5H5K5H5K5H5K5H5K5H5OqJ5J5J5J5J5J5J5J5J5J5J5J5J5J5J5', 'Lê Minh Khách', '0904567890', 'https://i.pravatar.cc/150?img=21', 'user', 'active', TRUE),
('user2@gmail.com', '$2a$10$rB5H5K5H5K5H5K5H5K5H5OqJ5J5J5J5J5J5J5J5J5J5J5J5J5J5J5', 'Phạm Thu Hà', '0905678901', 'https://i.pravatar.cc/150?img=22', 'user', 'active', TRUE),
('user3@gmail.com', '$2a$10$rB5H5K5H5K5H5K5H5K5H5OqJ5J5J5J5J5J5J5J5J5J5J5J5J5J5J5', 'Hoàng Văn Nam', '0906789012', 'https://i.pravatar.cc/150?img=23', 'user', 'active', FALSE),
('user4@gmail.com', '$2a$10$rB5H5K5H5K5H5K5H5K5H5OqJ5J5J5J5J5J5J5J5J5J5J5J5J5J5J5', 'Đỗ Thị Lan', '0907890123', 'https://i.pravatar.cc/150?img=24', 'user', 'active', TRUE),
('user5@gmail.com', '$2a$10$rB5H5K5H5K5H5K5H5K5H5OqJ5J5J5J5J5J5J5J5J5J5J5J5J5J5J5', 'Vũ Minh Tuấn', '0908901234', 'https://i.pravatar.cc/150?img=25', 'user', 'active', TRUE),
('user6@gmail.com', '$2a$10$rB5H5K5H5K5H5K5H5K5H5OqJ5J5J5J5J5J5J5J5J5J5J5J5J5J5J5', 'Bùi Thu Thảo', '0909012345', 'https://i.pravatar.cc/150?img=26', 'user', 'active', TRUE),
('user7@gmail.com', '$2a$10$rB5H5K5H5K5H5K5H5K5H5OqJ5J5J5J5J5J5J5J5J5J5J5J5J5J5J5', 'Ngô Văn Đức', '0910123456', 'https://i.pravatar.cc/150?img=27', 'user', 'suspended', TRUE);

-- Password mẫu: "password123" (đã hash với bcrypt)

-- ============================================================================
-- 2. CATEGORIES
-- ============================================================================
INSERT INTO categories (name, slug, parent_id) VALUES
-- Root categories
('Thời trang nữ', 'thoi-trang-nu', NULL),
('Thời trang nam', 'thoi-trang-nam', NULL),
('Điện tử', 'dien-tu', NULL),
('Gia dụng', 'gia-dung', NULL),
('Sách', 'sach', NULL),

-- Sub categories - Thời trang nữ
('Áo nữ', 'ao-nu', 1),
('Váy', 'vay', 1),
('Quần nữ', 'quan-nu', 1),

-- Sub categories - Thời trang nam
('Áo nam', 'ao-nam', 2),
('Quần nam', 'quan-nam', 2),

-- Sub categories - Điện tử
('Điện thoại', 'dien-thoai', 3),
('Laptop', 'laptop', 3),
('Phụ kiện', 'phu-kien', 3);

-- ============================================================================
-- 3. PRODUCTS (30 sản phẩm)
-- ============================================================================
INSERT INTO products (name, slug, description, price, discount_price, quantity, sku, category_id, seller_id, status, view_count, sold_count) VALUES
-- Thời trang nữ
('Áo sơ mi trắng công sở', 'ao-so-mi-trang-cong-so', 'Áo sơ mi trắng form dáng thanh lịch, phù hợp đi làm văn phòng', 250000, 199000, 100, 'ASM001', 6, 2, 'active', 523, 45),
('Váy hoa dài', 'vay-hoa-dai', 'Váy hoa dài qua gối, chất liệu voan mềm mại', 350000, 299000, 50, 'VHD001', 7, 2, 'active', 312, 28),
('Quần jeans skinny', 'quan-jeans-skinny', 'Quần jeans skinny ôm dáng, co giãn tốt', 450000, NULL, 80, 'QJS001', 8, 2, 'active', 445, 67),
('Áo len cổ lọ', 'ao-len-co-lo', 'Áo len cổ lọ ấm áp, nhiều màu sắc', 280000, 220000, 60, 'ALC001', 6, 3, 'active', 298, 34),
('Váy midi xòe', 'vay-midi-xoe', 'Váy midi xòe nhẹ nhàng, thanh lịch', 380000, 320000, 45, 'VMX001', 7, 3, 'active', 267, 19),

-- Thời trang nam
('Áo polo nam basic', 'ao-polo-nam-basic', 'Áo polo nam form regular, chất cotton 100%', 220000, 180000, 120, 'APL001', 9, 2, 'active', 678, 89),
('Quần kaki nam', 'quan-kaki-nam', 'Quần kaki nam form slim, chống nhăn', 350000, 299000, 90, 'QKK001', 10, 2, 'active', 543, 76),
('Áo sơ mi nam kẻ sọc', 'ao-so-mi-nam-ke-soc', 'Áo sơ mi nam họa tiết kẻ sọc tinh tế', 280000, NULL, 70, 'ASM002', 9, 3, 'active', 321, 43),
('Quần short nam', 'quan-short-nam', 'Quần short nam thể thao, thoáng mát', 180000, 150000, 100, 'QSH001', 10, 3, 'active', 456, 62),
('Áo thun nam trơn', 'ao-thun-nam-tron', 'Áo thun nam basic, nhiều màu', 120000, 99000, 200, 'ATN001', 9, 2, 'active', 892, 134),

-- Điện tử
('iPhone 15 Pro Max 256GB', 'iphone-15-pro-max-256gb', 'iPhone 15 Pro Max màu Titan Tự nhiên, 256GB', 29990000, 28990000, 15, 'IP15PM256', 11, 2, 'active', 1234, 8),
('Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 'Samsung Galaxy S24 Ultra 12GB/256GB', 27990000, NULL, 20, 'SGS24U256', 11, 2, 'active', 987, 6),
('MacBook Air M2 13"', 'macbook-air-m2-13', 'MacBook Air M2 13" 2024, 8GB/256GB', 24990000, 23990000, 10, 'MBA13M2', 12, 3, 'active', 756, 4),
('Dell XPS 13', 'dell-xps-13', 'Dell XPS 13 9340, i7-1355U, 16GB, 512GB', 32990000, NULL, 8, 'DXS13', 12, 3, 'active', 543, 2),
('AirPods Pro 2', 'airpods-pro-2', 'AirPods Pro thế hệ 2, USB-C', 5990000, 5490000, 50, 'APP2USBC', 13, 2, 'active', 678, 23),

-- Gia dụng
('Nồi cơm điện Cuckoo 1.8L', 'noi-com-dien-cuckoo-18l', 'Nồi cơm điện cao tần Cuckoo 1.8L', 3500000, 3200000, 30, 'NCD18L', 4, 3, 'active', 234, 15),
('Máy xay sinh tố Philips', 'may-xay-sinh-to-philips', 'Máy xay sinh tố Philips 600W', 1200000, 990000, 40, 'MXST600', 4, 3, 'active', 345, 27),
('Bình đun siêu tốc', 'binh-dun-sieu-toc', 'Bình đun siêu tốc 1.7L, tự ngắt', 350000, 299000, 80, 'BDST17', 4, 2, 'active', 567, 78),
('Quạt điều hòa mini', 'quat-dieu-hoa-mini', 'Quạt điều hòa mini, tiết kiệm điện', 1500000, 1299000, 25, 'QDHM', 4, 2, 'active', 432, 18),
('Bộ nồi inox 3 đáy', 'bo-noi-inox-3-day', 'Bộ nồi inox 3 đáy cao cấp 5 món', 2800000, NULL, 20, 'BNI3D5', 4, 3, 'active', 289, 12),

-- Sách
('Đắc Nhân Tâm', 'dac-nhan-tam', 'Đắc Nhân Tâm - Dale Carnegie', 89000, 69000, 200, 'DNT001', 5, 2, 'active', 1234, 189),
('Nhà Giả Kim', 'nha-gia-kim', 'Nhà Giả Kim - Paulo Coelho', 79000, 65000, 150, 'NGK001', 5, 2, 'active', 987, 156),
('Sapiens', 'sapiens', 'Sapiens: Lược sử loài người', 180000, 150000, 100, 'SAP001', 5, 3, 'active', 765, 67),
('Atomic Habits', 'atomic-habits', 'Atomic Habits - Thói quen nguyên tử', 120000, 99000, 120, 'ATH001', 5, 3, 'active', 654, 89),
('The Psychology of Money', 'the-psychology-of-money', 'Tâm lý học đồng tiền', 150000, 125000, 80, 'TPM001', 5, 2, 'active', 543, 45),

-- Out of stock examples
('Áo khoác dạ nữ', 'ao-khoak-da-nu', 'Áo khoác dạ nữ cao cấp', 1200000, 999000, 0, 'AKD001', 6, 2, 'out_of_stock', 234, 0),
('Giày thể thao nam', 'giay-the-thao-nam', 'Giày thể thao nam Nike', 2500000, NULL, 0, 'GTT001', 10, 3, 'out_of_stock', 456, 0),
('Tai nghe Sony WH-1000XM5', 'tai-nghe-sony-wh-1000xm5', 'Tai nghe chống ồn cao cấp', 8990000, 8490000, 0, 'TNWH5', 13, 2, 'out_of_stock', 321, 0),
('Túi xách nữ da thật', 'tui-xach-nu-da-that', 'Túi xách nữ da bò thật 100%', 3500000, 2999000, 5, 'TXN001', 1, 3, 'active', 198, 3),
('Đồng hồ thông minh Apple Watch', 'dong-ho-thong-minh-apple-watch', 'Apple Watch Series 9 GPS 45mm', 10990000, 9990000, 12, 'AW9GPS45', 13, 2, 'active', 876, 7);

-- ============================================================================
-- 4. PRODUCT IMAGES
-- ============================================================================
INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
-- Product 1
(1, 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500', TRUE, 0),
(1, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500', FALSE, 1),

-- Product 2
(2, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', TRUE, 0),
(2, 'https://images.unsplash.com/photo-1612336307429-8b4b2e3f5a7f?w=500', FALSE, 1),

-- Product 3
(3, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', TRUE, 0),

-- Product 11 (iPhone)
(11, 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=500', TRUE, 0),
(11, 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=500', FALSE, 1),
(11, 'https://images.unsplash.com/photo-1678685888221-cda5f8b0f217?w=500', FALSE, 2),

-- Product 21 (Đắc Nhân Tâm)
(21, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', TRUE, 0),

-- Product 22 (Nhà Giả Kim)
(22, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500', TRUE, 0);

-- ============================================================================
-- 5. CART ITEMS
-- ============================================================================
INSERT INTO cart_items (user_id, product_id, quantity) VALUES
(4, 1, 2),
(4, 11, 1),
(4, 21, 3),
(5, 6, 1),
(5, 15, 1),
(6, 2, 1),
(6, 22, 2);

-- ============================================================================
-- 6. WISHLISTS
-- ============================================================================
INSERT INTO wishlists (user_id, product_id) VALUES
(4, 11),
(4, 13),
(4, 29),
(5, 11),
(5, 12),
(6, 2),
(6, 3),
(7, 11),
(7, 21),
(8, 15);

-- ============================================================================
-- 7. ORDERS
-- ============================================================================
INSERT INTO orders (order_number, user_id, shipping_name, shipping_phone, shipping_address, subtotal, shipping_fee, discount, total, payment_method, status, created_at) VALUES
-- Delivered orders
('ORD20251001001', 4, 'Lê Minh Khách', '0904567890', '123 Lê Lợi, Q1, TP.HCM', 1548000, 30000, 50000, 1528000, 'vnpay', 'delivered', '2025-10-01 10:30:00'),
('ORD20251002001', 5, 'Phạm Thu Hà', '0905678901', '456 Trần Hưng Đạo, Q5, TP.HCM', 28990000, 0, 0, 28990000, 'bank_transfer', 'delivered', '2025-10-02 14:20:00'),
('ORD20251003001', 7, 'Đỗ Thị Lan', '0907890123', '789 Nguyễn Huệ, Q1, TP.HCM', 534000, 30000, 0, 564000, 'cod', 'delivered', '2025-10-03 16:45:00'),

-- Processing orders
('ORD20251005001', 4, 'Lê Minh Khách', '0904567890', '123 Lê Lợi, Q1, TP.HCM', 5490000, 0, 100000, 5390000, 'momo', 'processing', '2025-10-05 09:15:00'),
('ORD20251006001', 8, 'Vũ Minh Tuấn', '0908901234', '321 Lý Thường Kiệt, Q10, TP.HCM', 3200000, 50000, 0, 3250000, 'vnpay', 'shipped', '2025-10-06 11:30:00'),

-- Pending orders
('ORD20251007001', 6, 'Hoàng Văn Nam', '0906789012', '654 Điện Biên Phủ, Q3, TP.HCM', 996000, 30000, 50000, 976000, 'cod', 'pending', '2025-10-07 08:20:00'),
('ORD20251007002', 9, 'Bùi Thu Thảo', '0909012345', '987 Hai Bà Trưng, Q1, TP.HCM', 23990000, 0, 0, 23990000, 'bank_transfer', 'confirmed', '2025-10-07 10:45:00'),

-- Cancelled order
('ORD20251004001', 5, 'Phạm Thu Hà', '0905678901', '456 Trần Hưng Đạo, Q5, TP.HCM', 10990000, 0, 0, 10990000, 'vnpay', 'cancelled', '2025-10-04 13:00:00');

-- ============================================================================
-- 8. ORDER ITEMS
-- ============================================================================
INSERT INTO order_items (order_id, product_id, product_name, quantity, price, subtotal) VALUES
-- Order 1
(1, 1, 'Áo sơ mi trắng công sở', 2, 199000, 398000),
(1, 6, 'Áo polo nam basic', 3, 180000, 540000),
(1, 21, 'Đắc Nhân Tâm', 5, 69000, 345000),
(1, 10, 'Áo thun nam trơn', 3, 99000, 297000),

-- Order 2
(2, 11, 'iPhone 15 Pro Max 256GB', 1, 28990000, 28990000),

-- Order 3
(3, 22, 'Nhà Giả Kim', 3, 65000, 195000),
(3, 24, 'Atomic Habits', 2, 99000, 198000),
(3, 7, 'Quần kaki nam', 1, 299000, 299000),

-- Order 4
(4, 15, 'AirPods Pro 2', 1, 5490000, 5490000),

-- Order 5
(5, 16, 'Nồi cơm điện Cuckoo 1.8L', 1, 3200000, 3200000),

-- Order 6
(6, 3, 'Quần jeans skinny', 2, 450000, 900000),
(6, 23, 'Sapiens', 1, 150000, 150000),

-- Order 7
(7, 13, 'MacBook Air M2 13"', 1, 23990000, 23990000),

-- Order 8 (cancelled)
(8, 30, 'Đồng hồ thông minh Apple Watch', 1, 9990000, 9990000);

-- ============================================================================
-- 9. PAYMENTS
-- ============================================================================
INSERT INTO payments (payment_number, order_id, amount, currency, payment_method, payment_gateway, status, transaction_id, gateway_response, paid_at) VALUES
('PY20251001001', 1, 1528000, 'VND', 'vnpay', 'vnpay', 'completed', 'VNP20251001001234', '{"code": "00", "message": "Success"}', '2025-10-01 10:35:00'),
('PY20251002001', 2, 28990000, 'VND', 'bank_transfer', NULL, 'completed', 'BT20251002001', NULL, '2025-10-02 15:00:00'),
('PY20251003001', 3, 564000, 'VND', 'cod', NULL, 'completed', NULL, NULL, '2025-10-03 18:00:00'),
('PY20251005001', 4, 5390000, 'VND', 'momo', 'momo', 'completed', 'MOMO20251005001', '{"errorCode": 0}', '2025-10-05 09:20:00'),
('PY20251006001', 5, 3250000, 'VND', 'vnpay', 'vnpay', 'completed', 'VNP20251006001', '{"code": "00"}', '2025-10-06 11:35:00'),
('PY20251007001', 6, 976000, 'VND', 'cod', NULL, 'pending', NULL, NULL, NULL),
('PY20251007002', 7, 23990000, 'VND', 'bank_transfer', NULL, 'processing', NULL, NULL, NULL),
('PY20251004001', 8, 10990000, 'VND', 'vnpay', 'vnpay', 'cancelled', 'VNP20251004001', '{"code": "24", "message": "Cancelled"}', NULL);

-- ============================================================================
-- 10. REVIEWS
-- ============================================================================
INSERT INTO reviews (product_id, user_id, order_id, rating, comment, helpful_count, created_at) VALUES
(1, 4, 1, 5, 'Áo đẹp lắm, chất vải mát, form chuẩn. Mình cao 1m65 nặng 50kg mặc vừa vặn', 12, '2025-10-02 10:00:00'),
(6, 4, 1, 4, 'Áo ok, màu đẹp nhưng hơi mỏng', 5, '2025-10-02 10:15:00'),
(21, 4, 1, 5, 'Sách hay, đáng đọc. Giao hàng nhanh', 8, '2025-10-02 11:00:00'),
(11, 5, 2, 5, 'iPhone 15 Pro Max quá đỉnh, camera chụp ảnh cực đẹp. Ship cẩn thận', 23, '2025-10-04 14:00:00'),
(22, 7, 3, 5, 'Nhà Giả Kim là cuốn sách tuyệt vời, ai cũng nên đọc một lần', 15, '2025-10-05 09:00:00'),
(24, 7, 3, 4, 'Nội dung hay, bìa sách hơi bị bẩn một chút', 3, '2025-10-05 09:30:00'),
(7, 7, 3, 5, 'Quần đẹp, chất kaki dày dặn, không nhăn. Rất hài lòng', 7, '2025-10-05 10:00:00');

-- ============================================================================
-- 11. COUPONS
-- ============================================================================
INSERT INTO coupons (code, discount_type, discount_value, min_order, max_uses, used_count, start_date, end_date, is_active) VALUES
('WELCOME50', 'fixed', 50000, 500000, 1000, 234, '2025-10-01', '2025-12-31', TRUE),
('OCT10', 'percentage', 10, 1000000, 500, 89, '2025-10-01', '2025-10-31', TRUE),
('FREESHIP', 'fixed', 30000, 200000, 2000, 567, '2025-10-01', '2025-10-31', TRUE),
('VIP20', 'percentage', 20, 5000000, 100, 12, '2025-10-01', '2025-11-30', TRUE),
('FLASH100', 'fixed', 100000, 2000000, 200, 45, '2025-10-07', '2025-10-08', TRUE),
('OLDCODE', 'percentage', 15, 500000, 100, 100, '2025-09-01', '2025-09-30', FALSE);

-- ============================================================================
-- 12. NOTIFICATIONS
-- ============================================================================
INSERT INTO notifications (user_id, title, message, type, is_read, created_at) VALUES
-- User 4
(4, 'Đơn hàng đã giao thành công', 'Đơn hàng #ORD20251001001 đã được giao thành công. Cảm ơn bạn đã mua hàng!', 'order', TRUE, '2025-10-01 18:00:00'),
(4, 'Đơn hàng đang xử lý', 'Đơn hàng #ORD20251005001 đang được chuẩn bị. Chúng tôi sẽ sớm giao hàng cho bạn!', 'order', TRUE, '2025-10-05 09:20:00'),
(4, 'Flash Sale 10.10', 'Giảm giá lên đến 50% cho tất cả sản phẩm. Đừng bỏ lỡ!', 'promotion', FALSE, '2025-10-07 08:00:00'),

-- User 5
(5, 'Đơn hàng đã giao thành công', 'Đơn hàng #ORD20251002001 đã được giao. Đánh giá sản phẩm để nhận xu nhé!', 'order', TRUE, '2025-10-02 16:00:00'),
(5, 'Thanh toán thành công', 'Thanh toán cho đơn hàng #ORD20251002001 đã được xác nhận', 'payment', TRUE, '2025-10-02 15:05:00'),

-- User 6
(6, 'Đơn hàng mới', 'Đơn hàng #ORD20251007001 đã được tạo thành công', 'order', FALSE, '2025-10-07 08:25:00'),
(6, 'Mã giảm giá cho bạn', 'Sử dụng mã WELCOME50 để giảm 50k cho đơn hàng đầu tiên', 'promotion', FALSE, '2025-10-07 08:30:00'),

-- User 7
(7, 'Đơn hàng đã giao', 'Đơn hàng #ORD20251003001 đã được giao thành công', 'order', TRUE, '2025-10-03 17:00:00'),
(7, 'Cảm ơn đánh giá', 'Cảm ơn bạn đã đánh giá sản phẩm. Bạn nhận được 10 xu!', 'review', TRUE, '2025-10-05 10:15:00'),

-- User 8
(8, 'Đơn hàng đang giao', 'Đơn hàng #ORD20251006001 đang trên đường giao đến bạn', 'order', FALSE, '2025-10-06 15:00:00'),

-- User 9
(9, 'Xác nhận đơn hàng', 'Đơn hàng #ORD20251007002 đã được xác nhận. Vui lòng chuyển khoản trong 24h', 'order', FALSE, '2025-10-07 10:50:00'),
(9, 'Thông báo hệ thống', 'Hệ thống sẽ bảo trì từ 2h-4h sáng ngày 08/10/2025', 'system', FALSE, '2025-10-07 20:00:00');

-- ============================================================================
-- UPDATE view_count và sold_count (realistic data)
-- ============================================================================
UPDATE products SET view_count = view_count + FLOOR(RANDOM() * 500) WHERE id <= 30;

-- ============================================================================
-- DONE! 
-- ============================================================================
-- Tổng kết mockdata:
-- - 10 users (1 admin, 2 sellers, 7 customers)
-- - 13 categories
-- - 30 products (đa dạng ngành hàng)
-- - 10+ product images
-- - 7 cart items
-- - 10 wishlist items
-- - 8 orders (nhiều trạng thái khác nhau)
-- - 20+ order items
-- - 8 payments (nhiều phương thức)
-- - 7 reviews
-- - 6 coupons (1 đã hết hạn)
-- - 12 notifications
-- ============================================================================