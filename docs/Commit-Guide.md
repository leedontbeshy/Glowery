# 🧩 Quy tắc Commit (Conventional Commits)

Tài liệu này quy định chuẩn commit message cho toàn dự án.
Tuân theo [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

---

## 🧱 Cấu trúc chung

```
<type>(<scope>): <short summary>

[optional body]

[optional footer]
```

### 🔍 Giải thích

| Thành phần | Mô tả |
| :--- | :--- |
| **type** | Loại thay đổi (ví dụ: `feat`, `fix`, `refactor`, ...). **Bắt buộc**. |
| **scope** | Phạm vi ảnh hưởng (ví dụ: `auth`, `user`, `db`, `ui`). **Tùy chọn**. |
| **short summary** | Mô tả ngắn gọn, ≤ 72 ký tự, viết ở thì hiện tại, không viết hoa chữ đầu. |
| **body** | Mô tả chi tiết hơn về lý do và bối cảnh của thay đổi. **Tùy chọn**. |
| **footer** | Ghi chú các thay đổi đột phá (`BREAKING CHANGE`) hoặc liên kết tới issue. **Tùy chọn**. |

---

## 🧠 Các loại commit (`type`) được chấp nhận

| Type | Khi nào sử dụng | Ví dụ |
| :--- | :--- | :--- |
| **feat** | Thêm **tính năng mới** | `feat(auth): add JWT authentication` |
| **fix** | **Sửa lỗi** | `fix(user): correct password hashing` |
| **refactor** | **Tái cấu trúc code** mà không thêm tính năng hoặc sửa lỗi | `refactor(core): simplify middleware logic` |
| **chore** | Thay đổi **vặt** (config, scripts, deps) không ảnh hưởng logic | `chore: update dependencies and npm scripts` |
| **style** | Thay đổi **format**, **indent**, **naming**, **semicolon**, … | `style: fix code formatting and lint errors` |
| **docs** | Chỉnh sửa **tài liệu** hoặc **comment** trong code | `docs: update API usage in README` |
| **test** | Thêm/cập nhật **test cases** | `test(order): add integration tests for checkout flow` |
| **perf** | **Tối ưu hiệu năng** | `perf(db): optimize query performance for orders` |
| **build** | Thay đổi liên quan **build system** / **compiler** / **tsconfig** | `build: configure TypeScript and output directory` |
| **ci** | Thay đổi **CI/CD pipeline** | `ci: fix GitHub Actions deploy workflow` |
| **revert** | **Hoàn tác** commit trước đó | `revert: rollback previous login flow change` |

---

## 📌 Quy tắc viết Summary

*   Viết **ở thì hiện tại** → `add`, `fix`, `update` chứ **không** phải `added`, `fixed`, `updated`.
*   Không viết hoa chữ cái đầu tiên.
*   Không kết thúc bằng dấu chấm.
*   Giữ ngắn gọn, lý tưởng là dưới 72 ký tự.

✅ **Đúng:**

```
feat(user): add user registration with hashed password
```

❌ **Sai:**

```
Added user registration feature.
```

---

## Ví dụ thực tế

#### 1️.Thêm tính năng

```
feat(auth): implement user registration and login API
```

#### 2️.Sửa lỗi

```
fix(order): handle null payment_id in order details
```

#### 3.Tái cấu trúc

```
refactor(core): move database connection logic to config file
```

#### 4.Cập nhật config

```
build: setup TypeScript compiler and strict mode
```

#### 5.Cập nhật tài liệu

```
docs: add commit convention guideline for team
```

---

## ⚠️ Commit lớn (nhiều thay đổi)

Nếu commit bao gồm nhiều thay đổi, hãy mô tả rõ trong `body` để làm rõ bối cảnh:

```
feat(core): setup TypeScript and database structure

- Configure TypeScript with strict mode for better type safety.
- Create initial PostgreSQL schema for users and products.
- Add User model and relevant enums (role, status).
```

---

## 💣 Breaking Change

Nếu thay đổi làm **phá vỡ tương thích ngược**, hãy thêm `BREAKING CHANGE:` vào phần `footer`:

```
feat(api)!: update auth response format

BREAKING CHANGE: The login API now returns an object with `accessToken` and `refreshToken` instead of just a single token string. Client-side implementations must be updated to handle the new structure.
```

*(Lưu ý: Dấu `!` sau `type(scope)` cũng là một cách để nhấn mạnh đây là một BREAKING CHANGE).*

---

## 🧭 Gợi ý cho team

*   **Một commit, một nhiệm vụ:** Mỗi commit nên tập trung giải quyết một vấn đề duy nhất.
*   **Commit thường xuyên:** Đừng để dồn quá nhiều thay đổi vào một commit.