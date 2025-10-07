# **BRANCHING RULES**

## 🌿 Quy tắc đặt tên và quản lý nhánh Git

---

### 🧭 1. Mục tiêu

Quy định cách **tạo – đặt tên – sử dụng nhánh (branch)** trong dự án để đảm bảo:

* Dễ hiểu, nhất quán giữa các thành viên.
* Quản lý code, review và merge thuận tiện.
* Giảm xung đột và sai sót khi phát triển tính năng mới.

---

### 🏗️ 2. Cấu trúc nhánh chính

| Nhánh     | Vai trò                                        | Ghi chú                                       |
| --------- | ---------------------------------------------- | --------------------------------------------- |
| `main`    | Bản **ổn định**, dùng để **deploy**            | Chỉ merge khi code đã được review và test     |
| `develop` | Nhánh **phát triển chung**, chứa code mới nhất | Tất cả nhánh tính năng sẽ merge vào đây trước |

---

### 🧩 3. Cấu trúc đặt tên nhánh

```
<loại-nhánh>/<mô-tả-ngắn-gọn>
```

#### 📌 Các loại nhánh chính:

| Loại        | Mục đích                                    | Ví dụ                   |
| ----------- | ------------------------------------------- | ----------------------- |
| `feat/`     | Thêm **tính năng mới**                      | `feat/auth-login`       |
| `fix/`      | Sửa **lỗi (bug)**                           | `fix/cart-total-bug`    |
| `refactor/` | **Tái cấu trúc** code, không thêm tính năng | `refactor/user-service` |
| `style/`    | Chỉnh **UI, format code**                   | `style/navbar-ui`       |
| `docs/`     | Cập nhật **tài liệu, README**               | `docs/api-guide`        |
| `test/`     | Viết hoặc chỉnh **test case**               | `test/auth-service`     |
| `chore/`    | Việc lặt vặt (config, deps, CI/CD...)       | `chore/update-tsconfig` |
| `hotfix/`   | Sửa lỗi **khẩn cấp** trên `main`            | `hotfix/payment-error`  |
| `release/`  | Chuẩn bị bản **phát hành**                  | `release/v1.0.0`        |

---

### ⚙️ 4. Quy tắc đặt tên chi tiết

* Dùng **chữ thường**, ngăn cách bằng **dấu gạch ngang (-)**.
  ✅ `feat/add-user-api`
  ❌ `feat/AddUserAPI`

* Không có dấu cách hoặc ký tự đặc biệt.
  ✅ `fix/email-validation`
  ❌ `fix/validate email!`

* Mô tả ngắn gọn, không dài quá 5 từ.
  ✅ `refactor/db-schema`
  ❌ `refactor/improve-database-schema-for-user-table`

---

### 🔄 5. Quy trình làm việc với nhánh

```bash
# B1. Cập nhật nhánh chính
git checkout main
git pull origin main

# B2. Tạo nhánh mới từ develop hoặc main
git checkout develop
git checkout -b feat/add-auth

# B3. Code, commit
git add .
git commit -m "feat: add login and register API"

# B4. Push nhánh
git push origin feat/add-auth

# B5. Tạo Pull Request (PR)
# → Review → Merge vào develop → Cuối cùng merge develop vào main
```

---

### 🧱 6. Ví dụ cho dự án Node.js + TypeScript

| Công việc            | Tên nhánh gợi ý             |
| -------------------- | --------------------------- |
| Cấu hình TypeScript  | `chore/setup-typescript`    |
| Tạo database schema  | `feat/init-database`        |
| Thêm User model      | `feat/user-model`           |
| Tạo enum chung       | `feat/enums-setup`          |
| Tái cấu trúc thư mục | `refactor/folder-structure` |
| Viết tài liệu README | `docs/readme-update`        |
| Cấu hình dotenv      | `chore/setup-env`           |
| Sửa bug token        | `fix/jwt-token-bug`         |

---

### 🧩 7. Merge Strategy

| Tình huống       | Merge vào | Ghi chú                                     |
| ---------------- | --------- | ------------------------------------------- |
| Tính năng mới    | `develop` | Sau khi code hoàn thiện và test             |
| Bản release      | `main`    | Từ `develop` → `main`                       |
| Bug khẩn cấp     | `main`    | Qua nhánh `hotfix/` rồi merge lại `develop` |
| Tái cấu trúc lớn | `develop` | Giữ nguyên nhánh riêng đến khi ổn định      |

---

### 🧯 8. Tips bổ sung

* Mỗi branch chỉ phục vụ **một mục tiêu duy nhất**.

  > Ví dụ: `feat/add-auth` chỉ thêm tính năng auth, không nên sửa cấu trúc database trong đó.
* Nếu cần làm việc dài hạn, có thể tạo nhánh tạm kiểu `feature/phase-2` rồi chia nhỏ dần.
* Không commit thẳng lên `main` hoặc `develop`.

---

### ✅ 9. Mẫu branch tree minh họa

```
main
 ┣ develop
 ┃ ┣ feat/add-auth
 ┃ ┣ feat/product-api
 ┃ ┣ fix/cart-total
 ┃ ┣ refactor/project-structure
 ┗ release/v1.0.0
```

---
