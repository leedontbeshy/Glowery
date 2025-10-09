# 🔑 Tóm tắt Luồng Hoạt Động: Đặt Lại Mật Khẩu (Reset Password Flow)

Luồng này mô tả quy trình bảo mật gồm hai bước để người dùng đặt lại mật khẩu của họ.

-----

## 1\. Yêu cầu Đặt Lại Mật Khẩu (Forget Password)

| Hoạt động | Mô tả |
| :--- | :--- |
| **User Gửi Yêu Cầu** | User nhập email và gửi yêu cầu đến **`/api/auth/forgot-password`**. |
| **Kiểm tra Email (Bảo mật)** | Hệ thống kiểm tra xem email có tồn tại trong DB (`UserRepository.findUserByEmail`) hay không. **QUAN TRỌNG: Hệ thống KHÔNG TIẾT LỘ cho User biết email có tồn tại hay không** (để tránh rò rỉ thông tin người dùng). |
| **Xử lý Token (Nếu Email Tồn Tại)** | **Nếu email TỒN TẠI:**<br>- Kiểm tra bảng `reset_tokens`. Nếu có **token cũ** liên quan đến email này, hệ thống sẽ **XÓA** chúng.<br>- Tạo **token mới** (`ResetTokenService.createNewResetToken()`).<br>- Lưu token mới cùng với thời gian hết hạn (`expires_at`) vào bảng `reset_tokens`. |
| **Gửi Email** | Gửi email cho User, trong đó chứa một liên kết đặt lại mật khẩu có định dạng:<br>`https://yourdomain.com/reset-password?token=**[token_mới]**` |
| **Hệ thống Trả Lời** | Trả lời User một thông báo chung (ví dụ: "Nếu tài khoản của bạn tồn tại, chúng tôi đã gửi email đặt lại mật khẩu"), **bất kể email có tồn tại hay không**. |

-----

## 2\. Xác nhận Đặt Lại Mật Khẩu

| Hoạt động | Mô tả |
| :--- | :--- |
| **User Xác nhận** | User nhấn vào liên kết trong email và gửi yêu cầu xác nhận kèm theo **token** và **mật khẩu mới** (`newPassword`) đến **`/api/auth/reset-password/confirm`**. |
| **Payload Yêu Cầu** | Gửi **`POST`** với Body JSON:<br>`json<br/>{<br/>  "token": "abcdef1234",<br/>  "newPassword": "MyNewPassword123!"<br/>}<br/>` |
| **Xác thực Token** | Hệ thống gọi `TokenRepository.findValidToken(token)` để truy vấn bảng `reset_tokens` và lấy `email` cùng `expires_at`. |
| **Kiểm tra Hạn** | Nếu token **hết hạn** (`expires_at` đã qua):<br>- **XÓA** token khỏi DB.<br>- Trả về lỗi: `"Reset token has expired"`. |
| **Đổi Mật Khẩu** | **Nếu token hợp lệ:**<br>- **Hash** mật khẩu mới (sử dụng thuật toán mạnh như **argon2** hoặc **bcrypt**).<br>- Cập nhật mật khẩu User bằng email lấy từ token: `UserRepository.updatePasswordByEmail(email, hashedPassword)`. |
| **Sử dụng Token Một Lần** | **XÓA** token khỏi DB ngay lập tức (đảm bảo token **chỉ được sử dụng 1 lần**). |
| **Phản hồi Thành công** | Trả về phản hồi thành công:<br>`json<br/>{<br/>  "success": true,<br/>  "message": "Password has been reset successfully."<br/>}<br/>` |