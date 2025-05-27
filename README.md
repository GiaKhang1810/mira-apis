# Mira APIs

## Giới thiệu

**Mira APIs** là bộ API mạnh mẽ, hỗ trợ quản lý và mở rộng ứng dụng một cách linh hoạt, dễ dàng tích hợp và tối ưu hiệu suất cho các dự án Node.js.

## Tính năng nổi bật

- **Tích hợp linh hoạt:** Cấu trúc rõ ràng, dễ mở rộng cho nhiều mục đích sử dụng.
- **Hiệu suất tối ưu:** Xử lý nhanh, đáp ứng tốt cho các ứng dụng quy mô lớn.
- **Bảo mật:** Áp dụng các cơ chế bảo vệ dữ liệu và thông tin nhạy cảm.
- **Tự động cập nhật `fb_dtsg`:** Lấy và cập nhật mã `fb_dtsg` định kỳ mà không làm mất các cấu hình khác trong file `.env`.

## Hướng dẫn cài đặt

### 1. Sao chép mã nguồn

```bash
git clone https://github.com/GiaKhang1810/mira-apis.git
```

### 2. Di chuyển vào thư mục dự án

```bash
cd mira-apis
```

### 3. Cài đặt các phụ thuộc

```bash
npm install
```

## Cấu hình môi trường

Dự án sử dụng file `.env` để lưu trữ các thông tin cấu hình. Bạn cần tạo file `.env` trong thư mục gốc dự án với nội dung mẫu sau:

```env
# System
PORT=8000
SSL=false

# Google
GMAIL=
CLIENT_ID=
CLIENT_SECRET=
REDIRECT_URI=
REFRESH_TOKEN=

# Security
SALT="tell the hackers this is our SALT string"
SECRET_KEY="Don't tell them this password."

# Database
DB_LOG=true
STORAGE=database
CACHE_DIRECTORY=cache
AUTO_CLEAN_CACHE=true
CACHE_EXPIRE_MS=300000

# Cookie
FACEBOOK_COOKIE=
ZING_COOKIE=

# KEYS
YOUTUBE_KEY=
SEARCH_KEY=
SEARCH_CX=
```

> **Lưu ý:** Không chia sẻ file `.env` công khai để đảm bảo an toàn thông tin.

## Sử dụng

### Khởi động ứng dụng

```bash
npm start
```

Ứng dụng mặc định chạy tại `http://localhost:3000` (hoặc cổng bạn cấu hình trong `.env`).

## Cơ chế tự động cập nhật `fb_dtsg`

Ứng dụng tự động lấy mã `fb_dtsg` mới từ Facebook và cập nhật vào file `.env` mà không ghi đè các cấu hình khác. Quy trình gồm:

1. **Gửi request đến Facebook** để lấy mã `fb_dtsg` mới.
2. **Cập nhật cookie** để đảm bảo phiên làm việc hợp lệ.
3. **Chỉ cập nhật dòng `fb_dtsg` trong `.env`**, giữ nguyên các dòng khác.
4. **Tự động chạy lại mỗi 24 giờ** để đảm bảo mã luôn hợp lệ.

## Đóng góp

Chào mừng mọi đóng góp từ cộng đồng! Để đóng góp:

1. **Fork** dự án về tài khoản của bạn.
2. **Tạo nhánh mới** cho các thay đổi.
3. **Gửi pull request** để được xem xét và hợp nhất.

## Giấy phép

Dự án được phát hành theo giấy phép **MIT License**. Xem chi tiết trong file `LICENSE`.

## Liên hệ

- **Tác giả:** Gia Khang
- **Email:** ngkhang9a5lqc11@gmail.com
- **Facebook:** [Gia Khang](https://www.facebook.com/GiaKhang.1810)

Nếu có câu hỏi hoặc góp ý, vui lòng liên hệ với chúng tôi!