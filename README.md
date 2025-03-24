# 📌 Mira APIs - Tài Liệu API

## 🚀 Giới thiệu
Mira APIs cung cấp các endpoint cho các tính năng như đăng ký, đăng nhập, xác thực token, và xử lý dữ liệu. Tất cả các API yêu cầu sử dụng token để truy cập.

## 📌 Cấu hình môi trường
Trước khi chạy, bạn cần thiết lập các biến môi trường trong tệp `.env`:

```env
PORT=3000
INTERNAL_TOKEN_SECRET=your_secret_key
```

## 🔑 Xác thực
Mira APIs sử dụng **JWT Token** để xác thực người dùng. Token được gửi dưới dạng cookie `token`.

---

## 📜 Danh sách API

### 1️⃣ Đăng ký tài khoản
**Endpoint:**
```
POST /user/signup
```

**Request Body:**
```json
{
  "username": "example",
  "password": "mypassword"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJI..."
}
```

📌 *Token sẽ được lưu trong cookie `token`.*

---

### 2️⃣ Đăng nhập
**Endpoint:**
```
POST /user/login
```

**Request Body:**
```json
{
  "username": "example",
  "password": "mypassword"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJI..."
}
```

📌 *Token sẽ được gửi dưới dạng cookie `token`.*

---

### 3️⃣ Kiểm tra xác thực
**Endpoint:**
```
GET /user/auth
```

**Headers:**
```
Cookie: token=your_token
```

**Response (Nếu hợp lệ):**
```json
{
  "message": "Authenticated"
}
```

**Response (Nếu không hợp lệ):**
```json
{
  "error": "Invalid token"
}
```

---

### 4️⃣ Cập nhật thông tin người dùng
**Endpoint:**
```
PUT /user/update
```

**Headers:**
```
Cookie: token=your_token
```

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "phone": "0123456789"
}
```

**Response:**
```json
{
  "message": "User updated successfully"
}
```

---

### 5️⃣ Đăng xuất
**Endpoint:**
```
POST /user/logout
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

📌 *Token trong cookie sẽ bị xóa.*

---

## 🛠️ Lỗi phổ biến
| Mã lỗi | Mô tả |
|--------|---------------------------------|
| 400    | Thiếu trường bắt buộc |
| 401    | Token không hợp lệ hoặc hết hạn |
| 403    | Không có quyền truy cập |
| 500    | Lỗi server |

---

## 🎯 Ghi chú
- Mọi yêu cầu API **phải** gửi kèm token.
- Token chỉ có hiệu lực **1 phút**, nên cần refresh token.

📌 *Liên hệ: [Github Mira APIs](https://github.com/GiaKhang1810/mira-apis)*