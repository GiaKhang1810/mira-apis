# Mira APIs

## Giới thiệu

**Mira APIs** là một tập hợp các API mạnh mẽ, hỗ trợ quản lý và mở rộng ứng dụng một cách linh hoạt. Dự án được thiết kế để dễ dàng tích hợp và cung cấp hiệu suất cao.

## Tính năng

- **Dễ dàng tích hợp**: Hỗ trợ mở rộng linh hoạt với cấu trúc rõ ràng.
- **Hiệu suất cao**: Được tối ưu để xử lý nhanh chóng.
- **Bảo mật**: Sử dụng các cơ chế bảo mật để bảo vệ dữ liệu.
- **Tự động cập nhật `fb_dtsg`**: Lấy và cập nhật `fb_dtsg` định kỳ mà không ghi đè toàn bộ tệp cấu hình.

## Cài đặt

### 1. Sao chép kho lưu trữ

```bash
git clone https://github.com/GiaKhang1810/mira-apis.git
```

### 2. Di chuyển vào thư mục dự án

```bash
cd mira-apis
```

### 3. Cài đặt các thư viện cần thiết

```bash
npm install
```

## Cấu hình môi trường

Dự án sử dụng tệp `.env` để lưu trữ cấu hình. Để khởi tạo, bạn có thể tạo tệp `.env` và điền các giá trị sau:

```env
# System
PORT=
TOKEN_SECRET=
COOKIE_SECURE=true
FB_DTSG=
GMAIL=
CLIENT_ID=
CLIENT_SECRET=
REDIRECT_URI=https://developers.google.com/oauthplayground
REFRESH_TOKEN=

# Security
SIGNATURE_KEY=

# Database
STORAGE=db
ERROR_LOG=error.log

# Cookie
FACEBOOK_COOKIE=
ZING_COOKIE=

# KEYS
YOUTUBE_KEY=
SEARCH_KEY=
SEARCH_CX=
```

Ứng dụng có cơ chế tự động cập nhật `fb_dtsg` nhưng không làm mất các dòng khác hoặc comment trong `.env`.

## Sử dụng

### Khởi động ứng dụng

```bash
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:3000`, trừ khi bạn thay đổi `PORT` trong `.env`.

## Cơ chế tự động cập nhật `fb_dtsg`

Ứng dụng sẽ tự động gửi request đến Facebook để lấy `fb_dtsg`, sau đó cập nhật `.env` mà không ghi đè toàn bộ file. Cách hoạt động:

1. **Gửi request đến Facebook** để lấy mã `fb_dtsg` mới.
2. **Lấy và cập nhật cookie** để đảm bảo phiên làm việc hợp lệ.
3. **Cập nhật `.env`** mà không làm mất các dòng khác.
4. **Chạy định kỳ** mỗi 24 giờ để làm mới `fb_dtsg`.

## Đóng góp

Chúng tôi hoan nghênh mọi đóng góp từ cộng đồng. Nếu bạn muốn đóng góp, vui lòng:

1. **Fork** dự án.
2. **Tạo một nhánh mới** với các thay đổi của bạn.
3. **Gửi pull request** để được xem xét.

## Giấy phép

Dự án này được cấp phép theo **MIT License**. Vui lòng xem tệp `LICENSE` để biết thêm chi tiết.

## Liên hệ

- **Tác giả**: Gia Khang
- **Email**: ngkhang9a5lqc11@gmail.com
- **Facebook**: [Gia Khang](https://www.facebook.com/GiaKhang.1810)

Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, hãy liên hệ với chúng tôi!