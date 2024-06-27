# 使用 Node.js 官方映像檔作為基礎映像檔
FROM node:22

# 安裝必要工具
RUN apt-get update && \
    apt-get install -y openssh-client

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json 到工作目錄
COPY package*.json ./

# 安裝應用程式的依賴項
RUN npm install

# 複製應用程式的其餘源代碼到工作目錄
COPY . .

# 複製脚本到工作目錄
COPY run-workflow.js .

# 暴露應用程式運行的端口，假設你的應用程式運行在 3000 端口
EXPOSE 3000

# 設置啟動命令
CMD ["node", "run-workflow.js"]

# 之後打包 全部 
# # 使用 Node.js 官方映像檔作為基礎映像檔
# FROM node:22

# # 設置工作目錄
# WORKDIR /app

# # 複製 package.json 和 package-lock.json 到工作目錄
# COPY package*.json ./

# # 安裝應用程式的依賴項
# RUN npm install

# # Rebuild bcrypt for the container's environment
# RUN npm rebuild bcrypt --build-from-source

# # 複製應用程式的其餘源代碼到工作目錄
# COPY . .

# # 暴露應用程式運行的端口，假設你的應用程式運行在 3000 端口
# EXPOSE 3000

# # 設置啟動命令
# CMD ["npm", "start"]
