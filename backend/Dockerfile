# Sử dụng Node.js làm base image
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package.json /app/package.json
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . /app

# Mở cổng cho dịch vụ
EXPOSE 5000

# Chạy server
CMD ["npm", "start"]
