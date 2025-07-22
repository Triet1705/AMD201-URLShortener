Chibi Link (AMD201-URLShortener)
Dự án được thực hiện trong khuôn khổ môn học AMD201. Mục tiêu là thiết kế và triển khai một dịch vụ rút gọn URL hoàn chỉnh, sử dụng kiến trúc decoupled với .NET Core cho backend và React cho frontend.

Thành viên nhóm
Pham Minh Triet - GCD230291

Nguyen Dinh Hoang Vu - GCD230066

Công nghệ sử dụng
Backend: .NET 8, ASP.NET Core Web API, Clean Architecture

Database: PostgreSQL

ORM: Entity Framework Core

Xác thực: JWT (JSON Web Tokens)

Frontend: React (Vite), JavaScript, React Router

UI Library: Ant Design

Hướng dẫn cài đặt và chạy dự án (Getting Started)
Dự án được cấu trúc theo dạng monorepo với hai thư mục chính là backend và frontend.

Yêu cầu tiên quyết
Cài đặt .NET SDK phiên bản 8.0 trở lên.

Cài đặt Node.js phiên bản 18.x trở lên.

Cài đặt PostgreSQL Server.

IDE: Visual Studio 2022 (cho backend) và Visual Studio Code (cho frontend).

Các bước cài đặt
Clone repository về máy:

git clone <URL-repository-cua-ban>
cd AMD201-URLShortener

Cấu hình Backend:

Mở file solution backend/UrlShortener.sln bằng Visual Studio 2022.

Trong project UrlShortener.Api, mở file appsettings.Development.json.

Cập nhật ConnectionStrings để trỏ tới database PostgreSQL local của bạn.

"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=chibi_link_db;Username=postgres;Password=your_password"
}

Mở terminal, di chuyển vào thư mục backend và chạy lệnh sau để tạo cơ sở dữ liệu:

dotnet ef database update --startup-project UrlShortener.Api

Cấu hình Frontend:

Mở thư mục frontend bằng Visual Studio Code.

Mở terminal trong VS Code và chạy lệnh để cài đặt các gói phụ thuộc:

npm install

Chạy dự án:

Chạy Backend: Trong Visual Studio 2022, thiết lập UrlShortener.Api làm Startup Project và nhấn F5. API sẽ chạy tại https://localhost:<port> (ví dụ: 7037).

Chạy Frontend: Trong terminal của VS Code (ở thư mục frontend), chạy lệnh:

npm run dev

Ứng dụng frontend sẽ chạy tại http://localhost:5173.

Các chức năng chính và API Endpoints
Hệ thống cung cấp các RESTful API cho việc rút gọn link và xác thực người dùng.

1. Rút gọn URL
Endpoint: POST /api/urls

Mô tả: Tạo một link rút gọn mới.

Request Body:

{
  "longUrl": "https://example.com/a-very-long-url-to-be-shortened",
  "customCode": "my-custom-link" // (Optional)
}

Success Response (200 OK):

{
  "shortUrl": "https://localhost:7037/xyz123"
}

2. Chuyển hướng (Redirect)
Endpoint: GET /{shortCode}

Mô tả: Truy cập vào link rút gọn (ví dụ: https://localhost:7037/xyz123) sẽ trả về một HTTP 301/302 Redirect tới URL gốc.

3. Xác thực (Authentication)
Endpoint: POST /api/auth/register

Mô tả: Đăng ký một tài khoản người dùng mới.

Endpoint: POST /api/auth/login

Mô tả: Đăng nhập và trả về một JWT token.
