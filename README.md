# Git-Viewer
![Git 圖形化預演 & 自動化部署](https://github.com/user-attachments/assets/9972385d-63fe-4ed9-8ba5-e64ab9507482)

# Git Viewer designed to enhance the Git experience for developers
工程師最怕用錯指令，讓寫好的程式碼消失
> **Git Viewer 讓我們先模擬 git 指令結果，再實際執行**

# Introduction Video
[![Side Project【Git Viewer】_Back End_林虹伶_2024](https://img.youtube.com/vi/1v4r5_5uo8s/0.jpg)](https://youtu.be/1v4r5_5uo8s)

# Contents
- [試用步驟](#試用步驟)
  - [1. github release 下載 Git Viewer 桌面應用程式](#1-github-release-下載-git-viewer-桌面應用程式)
  - [2. 下載測試專案 git clone repo 到您的本機](#2-下載測試專案-git-clone-repo-到您的本機)
  - [3. 用測試專案執行 workflow](#3-用測試專案執行-workflow)
    - [情境一、自動化測試 Automatic Testing](#情境一自動化測試-automatic-testing)
    - [情境二、自動化確認格式和語法 Formatter and Linter](#情境二自動化確認格式和語法-formatter-and-linter)
- [所有功能介紹](#所有功能介紹)
- [架構圖 Architecture](#架構圖-architecture)
- [Workflow 流程圖](#workflow-流程圖)

## 試用步驟
### 1. github release 下載 Git Viewer 桌面應用程式
* [Download Link - Git Viewer](https://github.com/LilyLin395135/Git-Viewer/releases/)
  
* 點擊 Latest 到 Git Viewer 最新版本的頁面
  ![Latest release](https://github.com/user-attachments/assets/d3b754ab-7a18-48d1-8517-317466335281)
  
* 下載 GitViewer.setup.exe 執行檔案
  ![Download .exe file](https://github.com/user-attachments/assets/f6f33876-12f8-4e51-b8fa-cfc7bf8605a8)
  
* 開啟下載資料夾 download folder，並雙擊應用程式執行
  ![download folder](https://github.com/user-attachments/assets/50ce4049-35fd-40d5-ac0b-48aa6cdc4a2e)
  
* 點擊"其他資訊"、點擊"仍要執行"
  ![execute](https://github.com/user-attachments/assets/8b41a511-26e0-440a-9062-5284a6b9eca9)
  
* 下載完成自動開啟應用程式
  ![Git Viewer](https://github.com/user-attachments/assets/2e7ce636-538a-4ef5-82dd-bcd72dc2c4c0)

* 點擊 Workflow 頁籤，輸入登入帳號 & 密碼
  * 帳號：user@gmail.com
  * 密碼：gitViewer
  ![log in](https://github.com/user-attachments/assets/5571f109-57c1-4c8b-a020-2c04c4ee5a9c)

* 可以看到該帳號的專案 workflow 記錄和執行的 log
  ![workflow](https://github.com/user-attachments/assets/d9138206-11bd-4256-a079-c0ffd0cbbe3f)

### 2. 下載測試專案 - git fork & git clone repo 到您的本機
【git fork】
* 前往 [Repo for testing - Simple-Server](https://github.com/LilyLin395135/Simple-Server) fork
  ![fork](https://github.com/user-attachments/assets/6aee8a15-9e6f-4eb4-b62e-e27a39c4f6a9)

* Create fork ( Please copy all the branches )
  ![fork all the branch](https://github.com/user-attachments/assets/ce8132b2-6b32-4b74-ab39-46faa2260c01)

* 在您的 GitHub 帳號 Repositories 中，找到剛剛 fork 的 repository，點擊進入 repository
  ![image](https://github.com/user-attachments/assets/90f2e1e3-db4c-4e9b-a94d-d8e11f4b6eb3)
  
* 點擊「Code」按鈕，複製 URL
  ![image](https://github.com/user-attachments/assets/e604c559-caef-4be5-b35c-6ea464eea58c)

git fork 完接著【git clone】
> 注意：
> 1. 必須先建立一個空資料夾，在該空資料夾再 git clone (詳細步驟如下)
> 2. git clone 後面接剛剛複製的 URL。(指令像下方範例)
```
git clone https://github.com/{your-github-name}/Simple-Server.git
```
* git clone 流程，我們可以使用 Git Viewer
* Open Folder 時，新增資料夾
  ![empty folder](https://github.com/user-attachments/assets/6e263781-869e-4a52-8ae5-ded5fdaae21c)
    
* 使用測試使用者的指令集(需先用 user@gmail.com 登入)
* 點擊 My Commands 叫出指令集，在 git clone 指令處點擊 **Use**，放入指令
  ![My Commands-git clone](https://github.com/user-attachments/assets/d9f8aeca-dbd7-47ce-9c6c-c94d62ff75e6)

* 將 git clone 後面改成剛剛複製的 URL。
* 在Try Command 輸入框按 enter
* 就會執行模擬的 git，並顯示 git 模擬預覽圖
  ![execute git clone](https://github.com/user-attachments/assets/3eb4dbcc-692e-4e63-8084-5a3980e04d1e)

* 接著按 Run All 按鈕實際執行
* 在實際的專案資料夾執行 git，並顯示 git 實際預覽圖
  ![Run All git clone](https://github.com/user-attachments/assets/62d31d6d-6c49-4357-92b8-7e244059d47c)

### 3. 用測試專案使用 git 指令
接著用 git clone 好的測試專案來使用 git 指令
輸入指令的方式有兩種：
* 方式一、 一個個指令輸入進 try command 輸入框，每輸入完一個指令就 enter
* 方式一、 使用指令集，將系列指令一次放入 ( 下方用指令集示範 )
### 情境一、git add、git commit、git push
首先，製造需要 git add 的情況
1. 在檔案總管 → 開啟測試專案 → 進到 .gitviewer 資料夾
2. 選一個 yml 檔案，「複製」「貼上」檔案
3. Git Viewer 檢查到專案的 git 有變動，會跳提醒詢問是否更新資料狀態，請選擇「確定」
4. git 圖形更新，出現虛線圓圈，代表有尚未 git add . 到 stash 的變動
![gitviewer-add-commit-push](https://github.com/user-attachments/assets/cc315f8c-259b-45a4-a18a-237b3242eead)

開始 add、commit、push 流程
* 開啟指令集 Customized My Commands
* 選擇 Scenario: add-commit-push
* 按 Use 按鈕，將指令一次放入 try command
* 每按一次 enter 會**模擬**執行一個 git 指令
  > git push 在模擬時，不會 psuh 到 github，而是與 github 版本比較有無衝突

![My Commands_add-commit-push](https://github.com/user-attachments/assets/fe5465de-39de-4778-9bc5-392a93ea6f64)
* 確認預覽沒問題，可以 Run All 按鈕實際執行在專案上。
  
### 情境二、git branch、git checkout、git rebase
* (1) 輸入指令進 try command 輸入框
* (2) 使用指令集，將系列指令一次放入
  * 開啟 Customized My Commands
```sh
# Step 1: Create a new branch 'test'
git branch test

# Step 2: Switch to 'test' branch
git checkout test

# Step 3: Make some changes and commit them
# (Assuming you make changes in your working directory)
git add .
git commit -m "Commit changes in test branch"

# Step 4: Switch back to 'develop' branch
git checkout develop

# Step 5: Make some changes and commit them
# (Assuming you make changes in your working directory)
git add .
git commit -m "Commit changes in develop branch"

# Step 6: Switch back to 'test' branch
git checkout test

# Step 7: Rebase 'test' branch onto 'develop' branch
git rebase develop
```
### 4. 用測試專案執行 workflow 
首先，讓測試專案回到一開始 clone 下來的狀態
* 若剛剛都沒執行「Run All」，可以直接按「Reset Graph」按鈕。會讓模擬的資料變與實際專案的資料狀態一樣。
* 若已經執行「Run All」，可以執行下方指令，讓本機與遠端 github 的狀態回退一個 commit
  ```
  git reset --soft HEAD~1
  git push origin +HEAD
  git reset
  ```
* 檔案內已有三種情境的 yml 
### 情境一、自動化測試 Automatic Testing
* 示範檔案：automatic_test.yml

### 情境二、自動化確認格式和語法 Formatter and Linter
* 示範檔案：lint_and_format.yml

### 情境三、自動化部署到 EC2
* 示範檔案：deploy_to_ec2.yml
如影片實際操作示範
[![Side Project【Git Viewer】_Back End_林虹伶_2024](https://img.youtube.com/vi/1v4r5_5uo8s/0.jpg)](https://youtu.be/1v4r5_5uo8s)

## 所有功能介紹
* 模擬到一半想要回到模擬之前的狀態，可以使用 Reset Graph 按鈕，會讓模擬的資料變與實際專案的資料狀態一樣。

## 架構圖 Architecture
![Architecture](https://github.com/user-attachments/assets/efc3cea0-deee-44af-8985-4c1be09b3ded)

## Workflow 流程圖
![Workflow Architecture](https://github.com/user-attachments/assets/4c63b267-308b-433d-89c8-a801d7800c1e)

## 資料庫設計
