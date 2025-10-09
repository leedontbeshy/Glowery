Tóm tắt luồng hoạt động

User gửi email → /forgot-password.

Hệ thống không tiết lộ user có hay không.

Nếu có user → check bảng reset_tokens.

Nếu có token cũ → xóa.

Tạo token mới + lưu vào DB.

Gửi token qua email (link dạng /reset-password/:token).

Khi user click → xác thực token hợp lệ → đổi mật khẩu mới.