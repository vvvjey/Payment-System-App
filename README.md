**"📱 Ví điện tử NexPay - Giải pháp thanh toán thông minh, an toàn và tiện lợi. Hỗ trợ chuyển tiền nội bộ qua mã QR, tích hợp ZaloPay API, xác thực sinh trắc học, và mã hóa AES-256 để bảo vệ dữ liệu."**

Member List :

Hoàng Văn Tú (Leader)\
Bùi Thị Hương

**Home page - Profile - Login**
<p align="center">
  <img src="https://github.com/user-attachments/assets/1ccf709c-32e5-4b17-a690-86b5052ee6bf" width="30%" />
  <img src="https://github.com/user-attachments/assets/70db48bf-70e1-4ac3-8e88-0f8c1092d6ea" width="30%" />
  <img src="https://github.com/user-attachments/assets/989e9d6b-4cc5-4ca9-b09c-560ff225c6e8" width="30%" />
</p>

**Feature**
**Interal app interaction - Tranfer through QR code**
- Generate user QR Code:
  + Dynamic QR code - 5 min expired then automated regeneration
  + QR Code contains sensitive data (trans id, user info, amount, timestamp) will be encrypted by AES-256
- Scan QR:
  + Extract QR Code information by decrypting QR Code using NexPay's secret key
  + Generate UTR `<prefix><timestamp><uuid>`
  + OTP, Biometric (Fingerprint auth, Face ID) for transactions above 10 million

<p align="center">
  <img src="https://github.com/user-attachments/assets/53844f7c-db65-42d7-b2e4-e14480381a68" width="30%" />
  <img src="https://github.com/user-attachments/assets/bd23300b-a21e-4ea8-9a03-e11164e401ca" width="30%" />
  <img src="https://github.com/user-attachments/assets/70e6a1d5-8e16-4ae1-93ac-178a7c28fc8e" width="30%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/c0e62dbe-2dc9-41e3-8bb3-b8b9f6980668" width="30%" />
  <img src="https://github.com/user-attachments/assets/26fe64ac-60e3-4bac-9f53-a85aa25050f3" width="30%" />
</p>

**External app interaction - Tranfer through Zalopay QR code**
- Create QR Code Zalopay with infor selected
- Using socket trigger callback zalopay notification in client side

<p align="center">
  <img src="https://github.com/user-attachments/assets/200ab8f3-8a09-45e6-bc80-ec0494b6b195" width="30%" />
  <img src="https://github.com/user-attachments/assets/d1eba6b6-0eb8-48b8-83f4-76a79a38f158" width="30%" />
  <img src="https://github.com/user-attachments/assets/2efcbd30-45ad-4675-80c7-29f7360fb4e8" width="30%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/9f44748e-069e-435d-ab04-f54fa9c1f335" width="30%" />
  <img src="https://github.com/user-attachments/assets/216b8119-55de-468f-b7b9-077465773631" width="30%" />
</p>
 FB: https://www.facebook.com/VVVJeyyy/
