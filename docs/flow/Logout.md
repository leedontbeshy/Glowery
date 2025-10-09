Tóm tắt luồng hoạt động

User gửi email → /forgot-password.

Hệ thống không tiết lộ user có hay không.

Nếu có user → check bảng reset_tokens.

Nếu có token cũ → xóa.

Tạo token mới + lưu vào DB.

Gửi token qua email (link dạng /reset-password/:token).

Khi user click → xác thực token hợp lệ → đổi mật khẩu mới.


Flow hoạt động: Reset Password
1️⃣ User yêu cầu reset (Forget Password)

Gửi email đến /api/auth/forgot-password

Hệ thống:

Kiểm tra email có tồn tại trong DB (UserRepository.findUserByEmail)

Nếu có, tạo resetToken mới qua ResetTokenService.createNewResetToken()

Lưu token + thời gian hết hạn vào bảng reset_tokens

(Sau này) gửi email chứa link:
https://yourdomain.com/reset-password?token=abcdef1234

2️⃣ User nhấn link hoặc gửi yêu cầu đặt lại mật khẩu

Gửi token và newPassword đến /api/auth/reset-password/confirm

{
  "token": "abcdef1234",
  "newPassword": "MyNewPassword123!"
}


Hệ thống:

TokenRepository.findValidToken(token)

Truy vấn reset_tokens để lấy email và expires_at

Nếu token hết hạn → xóa token, trả lỗi "Reset token has expired"

Hash password mới (argon2 hoặc bcrypt)

UserRepository.updatePasswordByEmail(email, hashedPassword)

Xóa token khỏi DB (đảm bảo chỉ dùng 1 lần)

Trả về:

{
  "success": true,
  "message": "Password has been reset successfully."
}