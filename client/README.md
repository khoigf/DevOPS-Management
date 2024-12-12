src/
├── api/ # API calls
│ ├── userApi.js # API cho user (đăng nhập, đăng ký)
│ ├── projectApi.js # API cho dự án
│ ├── taskApi.js # API cho nhiệm vụ
│ ├── toolApi.js # API cho công cụ DevOps
│ ├── configApi.js # API cho cấu hình DevOps
│ └── issueApi.js # API cho các vấn đề phát sinh
│ └── adminApi.js # API dành riêng cho admin
|
├── assets/ # Tệp hình ảnh, icon, CSS
│ ├── images/
│ ├── icons/
│ └── styles/
│
├── components/ # Các thành phần UI dùng chung
│ ├── Layout/ # Layout chính của ứng dụng
│ │ ├── Navbar.jsx
│ │ ├── Sidebar.jsx
│ │ └── Footer.jsx
│ ├── Form/ # Thành phần biểu mẫu
│ ├── Table/
│ │ ├── UserTable.jsx # Bảng danh sách user
│ │ └── TablePagination.jsx # Thành phần phân trang
│ └── Modal/
│ | └── ConfirmDeleteModal.jsx # Xác nhận xóa user
│
├── contexts/ # Context API để quản lý trạng thái
│ ├── AuthContext.js # Context cho xác thực
│ ├── ProjectContext.js # Context cho dự án
│ ├── TaskContext.js # Context cho nhiệm vụ
│ └── AdminContext.js # Context quản lý trạng thái của admin
|
├── hooks/ # Custom hooks
│ ├── useAuth.js # Hook cho xác thực người dùng
│ ├── useProjects.js # Hook để quản lý dự án
│ └── useTasks.js # Hook để quản lý nhiệm vụ
│
├── pages/ # Các trang chính
│ ├── Auth/ # Quản lý xác thực
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── ForgotPassword.jsx
│ ├── Dashboard/ # Dashboard chính
│ │ └── Dashboard.jsx
│ ├── Project/ # Quản lý dự án
│ │ ├── ProjectList.jsx
│ │ ├── ProjectDetail.jsx
│ │ └── AddProject.jsx
│ ├── Member/ # Quản lý thành viên
│ │ ├── MemberList.jsx
│ │ └── AssignTask.jsx
│ ├── Tools/ # Quản lý công cụ DevOps
│ │ └── ToolsList.jsx
│ ├── Issues/ # Quản lý vấn đề phát sinh
│ │ └── IssuesList.jsx
│ ├── Configurations/ # Cấu hình quy trình DevOps
│ | └── Configurations.jsx
│ ├── Admin/
│ │ ├── UserManagement.jsx # Trang quản lý user
│ │ ├── AddUserForm.jsx # Biểu mẫu thêm user
│ │ ├── EditUserForm.jsx # Biểu mẫu chỉnh sửa user
│ │ ├── UserDetail.jsx # Chi tiết một user
| | └── AdminDashboard.jsx # Admin Dashboard
|
├── routes/ # Cấu hình route
│ ├── ProtectedRoute.jsx # Route bảo vệ
│ └── AppRoutes.jsx # Tất cả route của ứng dụng
│
├── services/ # Dịch vụ kết nối backend
│ ├── authService.js # Dịch vụ xác thực
│ ├── projectService.js # Dịch vụ dự án
│ ├── taskService.js # Dịch vụ nhiệm vụ
│ └── adminService.js # Dịch vụ xử lý logic liên quan đến admin
|
├── utils/ # Helpers và hàm tiện ích
│ ├── validation.js # Hàm xác thực
│ ├── constants.js # Hằng số
│ └── apiConfig.js # Cấu hình base URL API
│
├── App.js # Thành phần chính của ứng dụng
├── index.js # Điểm vào ứng dụng
├── reportWebVitals.js # Đo hiệu năng
└── setupTests.js # Cấu hình test
