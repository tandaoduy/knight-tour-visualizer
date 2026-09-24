# Knight Tour Visualizer

Ứng dụng trực quan hóa bài toán Knight's Tour, gồm giao diện **Next.js** và API **Spring Boot**.

## Yêu cầu

- Node.js 22 (hoặc phiên bản LTS tương thích)
- Java 21
- Docker (chỉ cần khi chạy container hoặc triển khai)

## Chạy cục bộ

Mở hai terminal từ thư mục gốc của repository:

```bash
# Terminal 1: backend tại http://localhost:8080
cd backend
./mvnw spring-boot:run

# Terminal 2: frontend tại http://localhost:3000
cd frontend
npm ci
npm run dev
```

Kiểm tra API:

```bash
curl http://localhost:8080/api/health
```

## Kiểm tra trước khi mở PR

```bash
cd frontend && npm ci && npm run lint && npm run build
cd backend && ./mvnw verify
```

## CI/CD

GitHub Actions được cấu hình trong `.github/workflows`:

| Workflow | Kích hoạt | Công việc |
| --- | --- | --- |
| `Continuous Integration` | Pull request và push vào `main` | Lint/build frontend; test/package backend. |
| `Publish Container Images` | CI của `main` thành công, hoặc chạy thủ công | Build và publish image frontend/backend lên GitHub Container Registry (GHCR). |

Mỗi image được gắn cả `latest` và `sha-<commit>` để có thể ghim phiên bản triển khai. Khi chạy thủ công, chọn nhánh `main` để không thay đổi `latest` bằng một nhánh khác. Lần chạy đầu, vào **GitHub → Packages** và đặt package ở trạng thái public nếu hạ tầng triển khai cần pull image mà không đăng nhập. Workflow sử dụng sẵn `GITHUB_TOKEN`, nên không cần tạo registry secret.

Image được publish theo dạng:

```text
ghcr.io/<github-owner>/knight-tour-frontend:sha-<commit>
ghcr.io/<github-owner>/knight-tour-backend:sha-<commit>
```

Ví dụ chạy phiên bản mới nhất bằng Docker:

```bash
docker run --rm -p 3000:3000 ghcr.io/<github-owner>/knight-tour-frontend:latest
docker run --rm -p 8080:8080 ghcr.io/<github-owner>/knight-tour-backend:latest
```

Nếu dùng một registry/host triển khai khác, thay job `publish` trong `release.yml` bằng thông tin đăng nhập và bước deploy của nền tảng đó; CI vẫn được giữ độc lập.

## Cấu trúc

```text
frontend/          Next.js UI
backend/           Spring Boot API
.github/workflows/ CI và phát hành container image
```
