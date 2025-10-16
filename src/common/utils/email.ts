import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (email: string, resetToken: string): Promise<void> => {
    try {
            const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
            const { data, error } = await resend.emails.send({
              from: "UniMerch <noreply@unimerch.space>",
              to: [email],
              subject: "Reset mật khẩu - UniMerch",
              html: `
            <div style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif; max-width: 480px; margin: 0 auto; background: #fff; border-radius: 18px; border: 1px solid #e3e4e8; box-shadow: 0 2px 24px 0 #e3e4e8; padding: 32px 24px; color: #111827;">
                <div style="text-align: center; margin-bottom: 32px;">
                    <img src="https://postimg.cc/Yjs9F94y" alt="logo" style="width: 44px; margin-bottom: 10px; opacity: 0.16;" />
                    <h1 style="font-size: 2rem; font-weight: 600; margin: 0 0 8px 0; letter-spacing: -1px; color: #111827;">UniMerch</h1>
                    <div style="font-size: 1.15rem; font-weight: 500; color: #4b5563;">Yêu cầu đặt lại mật khẩu</div>
                </div>
                
                <div style="margin-bottom: 24px; line-height: 1.65;">
                    <p style="margin: 0 0 8px 0;">Xin chào,</p>
                    <p style="margin: 0 0 8px 0;">Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
                    <p style="margin: 0;">Nhấn vào nút dưới đây để tạo mật khẩu mới:</p>
                </div>
                
                <div style="text-align: center; margin: 32px 0;">
                    <a href="${resetUrl}" style="
                        background: linear-gradient(90deg, #0071e3 70%, #2997ff 100%);
                        color: #fff;
                        padding: 14px 40px;
                        text-decoration: none;
                        border-radius: 26px;
                        font-weight: 600;
                        font-size: 1.07rem;
                        box-shadow: 0 2px 8px 0 #dde6ef;
                        display: inline-block;
                        transition: filter .16s;
                        letter-spacing: .3px;
                    ">Đặt lại mật khẩu</a>
                </div>
                
                <div style="background: #f5f7fa; padding: 18px 16px; border-radius: 12px; border: 1px solid #e5e7eb; margin-bottom: 28px; font-size: 1rem;">
                    <strong style="color:#0071e3;">Lưu ý:</strong>
                    <ul style="padding-left: 18px; margin: 10px 0 0 0; color:#374151;">
                        <li>Liên kết chỉ có hiệu lực trong <strong>15 phút</strong></li>
                        <li>Chỉ sử dụng được <strong>1 lần</strong></li>
                        <li>Không chia sẻ liên kết này</li>
                    </ul>
                </div>
                
                <div style="font-size: 15px; color: #6b7280; margin-bottom: 16px;">
                    <p style="margin: 0 0 6px 0;">Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.</p>
                    <p style="margin: 0 0 4px 0;">Nếu nút không hoạt động, hãy sao chép liên kết sau và dán vào trình duyệt của bạn:</p>
                    <div style="word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 8px; font-size: 13px; border: 1px solid #e5e7eb;">${resetUrl}</div>
                </div>
                
                <div style="text-align: center; color: #b0b6bd; font-size: 13px; margin-top: 32px; border-top: 1px solid #ececec; padding-top: 18px;">
                    <p style="margin: 0;">© 2025 UniMerch. All rights reserved.</p>
                </div>
            </div>
            `,
            });
            if(error){
                throw error;
            }

    } catch (error) {
        throw error;
    }

    
}