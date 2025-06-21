# AMD201-URLShortener
Project for AMD201: Build a URL shortener service with .NET Core and a simple web front-end
# [cite_start]Project: Xây dựng dịch vụ rút gọn URL (URL Shortener) 

Dự án này được thực hiện trong khuôn khổ môn học AMD201. [cite_start]Mục tiêu là thiết kế và triển khai một dịch vụ rút gọn URL sử dụng .NET Core, bao gồm backend, API và một giao diện web đơn giản để demo chức năng.

## [cite_start]Thành viên nhóm 

* Pham Minh Triet - GCD230291
* Nguyen Dinh Hoang Vu - GCD230066

## Công nghệ sử dụng

* **Backend:** .NET 8, ASP.NET Core Web API
* [cite_start]**Database:** PostgreSQL
* **ORM:** Entity Framework Core
* [cite_start]**Frontend:** ASP.NET Core MVC / Razor Pages

## Hướng dẫn cài đặt và chạy dự án (Getting Started)

### Yêu cầu tiên quyết

* Cài đặt .NET SDK (phiên bản 8.0 hoặc cao hơn).
* Cài đặt [Tên hệ quản trị CSDL, ví dụ: SQL Server 2019].
* Một IDE/Editor như Visual Studio 2022 hoặc VS Code.

### Các bước cài đặt

1.  **Clone repository về máy:**
    ```bash
    git clone <URL-repository-cua-ban>
    cd <ten-thu-muc-du-an>
    ```

2.  **Cấu hình chuỗi kết nối (Connection String):**
    * Trong project backend, tìm và mở file `appsettings.json`.
    * Tạo một file mới tên là `appsettings.Development.json` trong cùng thư mục.
    * Copy nội dung cấu trúc `ConnectionStrings` từ `appsettings.json` và dán vào `appsettings.Development.json`. Thay đổi giá trị để trỏ tới database local của bạn.
    * *Lưu ý: File `appsettings.Development.json` đã được thêm vào `.gitignore` và sẽ không bị commit.*

3.  **Áp dụng Database Migrations:**
    Mở terminal trong thư mục của project backend và chạy lệnh sau để tạo cơ sở dữ liệu và các bảng cần thiết:
    ```bash
    dotnet ef database update
    ```

4.  **Chạy dự án:**
    Sử dụng Visual Studio để mở file `.sln` và nhấn F5, hoặc chạy lệnh sau từ terminal:
    ```bash
    dotnet run
    ```
    Ứng dụng sẽ chạy tại `https://localhost:<port>` và `http://localhost:<port>`.

## [cite_start]Các chức năng chính và API Endpoints 

Hệ thống cung cấp các RESTful API để tạo và truy xuất link rút gọn.

### 1. Tạo link rút gọn

* **Endpoint:** `POST /api/shorten`
* **Request Body:**
    ```json
    {
      "longUrl": "[https://example.com/day-la-mot-url-rat-dai-can-duoc-rut-gon](https://example.com/day-la-mot-url-rat-dai-can-duoc-rut-gon)"
    }
    ```
* **Success Response (200 OK):**
    ```json
    {
      "shortUrl": "[https://your-domain.com/abcdef](https://your-domain.com/abcdef)"
    }
    ```

### 2. Chuyển hướng (Redirect)

* **Endpoint:** `GET /{shortCode}`
* [cite_start]**Mô tả:** Truy cập vào link rút gọn (ví dụ: `https://your-domain.com/abcdef`) sẽ trả về một HTTP 302 Redirect tới URL gốc.

---

Bằng cách chuẩn bị hai file này, bạn không chỉ cho thấy sự chuyên nghiệp mà còn giúp quá trình làm việc nhóm trở nên suôn sẻ hơn rất nhiều. Chúc nhóm bạn làm bài tốt!
