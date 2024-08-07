# Git-Viewer
![Git 圖形化預演 & 自動化部署](https://github.com/user-attachments/assets/9972385d-63fe-4ed9-8ba5-e64ab9507482)

# Git Viewer designed to enhance the Git experience for developers
> **Git Viewer 透過模擬 git 指令結果，確認符合預期再實際執行 git 指令，減少錯誤率並提高 workflow 效率**

# Introduction Video
[![Side Project【Git Viewer】_Back End_林虹伶_2024](https://img.youtube.com/vi/1v4r5_5uo8s/0.jpg)](https://youtu.be/1v4r5_5uo8s)

# Contents
- [試用步驟](#試用步驟)
  - [1. github release 下載 Git Viewer 桌面應用程式](#1-github-release-下載-git-viewer-桌面應用程式)
  - [2. 下載測試專案 - git fork & git clone repo 到您的本機](#2-下載測試專案---git-fork--git-clone-repo-到您的本機)
  - [3. 用測試專案使用 git 指令](#3-用測試專案使用-git-指令)
    - [情境一、git add、git commit、git push](#情境一git-addgit-commitgit-push)
    - [情境二、reset one commit to github](#情境二reset-one-commit-to-github)
  - [4. 用測試專案執行 workflow](#4-用測試專案執行-workflow)
    - [情境一、自動化測試 Automatic Testing](#情境一自動化測試-automatic-testing)
    - [情境二、自動化確認格式和語法 Formatter and Linter](#情境二自動化確認格式和語法-formatter-and-linter)
    - [情境三、自動化部署到 EC2](#情境三自動化部署到-ec2)
- [其他功能介紹](#其他功能介紹)
- [架構圖 Architecture](#架構圖-architecture)
- [Workflow 流程圖](#workflow-流程圖)

## 試用步驟
## 1. GitHub Release 下載 Git Viewer 桌面應用程式
* [Download Link - Git Viewer](https://github.com/LilyLin395135/Git-Viewer/releases/)
  
* 點擊 Latest 到 Git Viewer 最新版本的頁面
  ![Latest release](https://github.com/user-attachments/assets/c2573b9f-d7ff-45e5-b08b-40c8950a6e07)
  
* 下載 GitViewer.setup.exe 執行檔案
  ![Download .exe file](https://github.com/user-attachments/assets/1d06e48e-4239-4652-a1d9-968eccc754a4)
  
* 開啟下載資料夾 download folder，並雙擊應用程式執行
  ![download folder](https://github.com/user-attachments/assets/aa2595a6-1f57-4777-971d-9cb5557fc6e9)
  
* 點擊「其他資訊」、點擊「仍要執行」
  ![execute](https://github.com/user-attachments/assets/38dbfa23-03af-47b7-9550-bc0caf0ec68b)
  
* 下載完成自動開啟應用程式
  ![Git Viewer](https://github.com/user-attachments/assets/6cee70ec-887f-448d-a431-f58c39333ecd)

* 點擊 Workflow 頁籤，導到登入畫面。
* 【測試帳號密碼】
  * 帳號：user@gmail.com
  * 密碼：gitViewer
  * 應用程式已設定自動帶入測試帳號的帳號密碼，可以直接按登入。
  ![log in](https://github.com/user-attachments/assets/df7595d0-a7e1-4c3f-9999-9005d1e2f63f)

* 可以看到該帳號的專案 workflow 記錄和執行的 log
  ![workflow](https://github.com/user-attachments/assets/d9138206-11bd-4256-a079-c0ffd0cbbe3f)

## 2. 下載測試專案 - git fork & git clone repo 到您的本機
【git fork】
* 前往 [Repo for testing - Simple-Server](https://github.com/LilyLin395135/Simple-Server) fork
  ![fork](https://github.com/user-attachments/assets/6aee8a15-9e6f-4eb4-b62e-e27a39c4f6a9)

* Create fork ( Please copy all the branches )
  ![fork all the branch](https://github.com/user-attachments/assets/a45abb50-8a25-4e13-8716-1592e1aa6daa)

* 在您的 GitHub 帳號 Repositories 中，找到剛剛 fork 的 repository，點擊進入 repository
  ![image](https://github.com/user-attachments/assets/90f2e1e3-db4c-4e9b-a94d-d8e11f4b6eb3)
  
* 點擊「Code」按鈕，複製 URL
  ![image](https://github.com/user-attachments/assets/e604c559-caef-4be5-b35c-6ea464eea58c)

git fork 完接著【git clone】
> 注意：
> 必須先建立一個空資料夾，在該空資料夾再 git clone (詳細步驟如下)

* 我們使用 Git Viewer 執行 git clone 流程
* Open Folder 時，新增資料夾
  ![empty folder](https://github.com/user-attachments/assets/6e263781-869e-4a52-8ae5-ded5fdaae21c)
    
* 使用測試使用者的指令集(需先用 user@gmail.com 登入)
* 點擊 My Commands 叫出指令集，在 git clone 指令處點擊 **Use**，放入指令
  ![My Commands-git clone](https://github.com/user-attachments/assets/d9f8aeca-dbd7-47ce-9c6c-c94d62ff75e6)

* 將 git clone 後面改成剛剛複製的 URL
* 在Try Command 輸入框按 enter
* 就會執行模擬的 git，並顯示 git 模擬預覽圖
  ![execute git clone](https://github.com/user-attachments/assets/3eb4dbcc-692e-4e63-8084-5a3980e04d1e)

* 接著按 Run All 按鈕實際執行
  * 若 Run All 時出現錯誤訊息可能是您目前的資料夾已經被父層中的 .git 管理，須請您回到 git clone 一開始的步驟，Open Folder 選擇外層、沒有 .git 管理的地方再建立一次資料夾並選取該資料夾執行 git clone。
* 在實際的專案資料夾執行 git，並顯示 git 實際預覽圖
  ![Run All git clone](https://github.com/user-attachments/assets/62d31d6d-6c49-4357-92b8-7e244059d47c)

## 3. 用測試專案使用 git 指令
接著用 git clone 好的測試專案來使用 git 指令
輸入指令的方式有兩種：
* 方式一、 一個個指令輸入進 try command 輸入框，每輸入完一個指令就 enter
* 方式二、 使用指令集，將系列指令一次放入 ( 下方用指令集示範 )
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
  ```
  git add .
  git commit -m "feat: copy yaml file"
  git push
  ```
* 按 Use 按鈕，將指令一次放入 try command
* 每按一次 enter 會**模擬**執行一個 git 指令
  > git push 在模擬時，不會 psuh 到 github，而是與 github 版本比較有無衝突

![My Commands_add-commit-push](https://github.com/user-attachments/assets/fe5465de-39de-4778-9bc5-392a93ea6f64)
* 確認預覽沒問題，可以 Run All 按鈕實際執行在專案上。
* 若執行 Run All 會因為實際執行 git push 而有如下方將說明的觸發執行 workflow 效果 [4. 用測試專案執行 workflow](#4-用測試專案執行-workflow)。跟著提示框會被導到 workflow 頁面看執行情況。
  
### 情境二、reset one commit to github
目標：讓 GitHub 與本地都撤銷目前的 commit，讓版本回退一個 commit
* 到 Git Viewer 首頁
* 開啟指令集 Customized My Commands
* 選擇 Scenario: reset one commit to github
  ```
  git reset --soft HEAD~1
  git push origin +HEAD
  git reset
  ```
* 按 Use 按鈕，將指令一次放入 try command
* 每按一次 enter 會**模擬**執行一個 git 指令
* 確認預覽沒問題，可以 Run All 按鈕實際執行在專案上。

## 4. 用測試專案執行 workflow 
檔案內已有三種情境的 yml 
### 情境一、自動化測試 Automatic Testing
示範檔案：automated_test.yml ，已在下載的測試專案檔案中，可以用 Visual Studio Code 開啟看 yaml 檔案內容。[automated_test.yml-GitHub](https://github.com/LilyLin395135/Simple-Server/blob/main/.gitviewer/automatic_test.yml)
檔案內容說明：
 會在 develop 分支 git push 時，觸發執行專案內所有測試
 ![image](https://github.com/user-attachments/assets/2d091ac3-185c-4371-bbfc-635545c38aad)
步驟 ( 請搭配下方圖示 ) ：
1. 開啟指令集
2. 使用 Scenario → on push develop trigger workflow ，點擊 Use 按鈕
  ```
  git branch
  git checkout develop
  git branch
  git add .
  git commit -m "feat: execute automated testing or linter checking"
  git push
  ```
3. 在 Try Command 框 Enter 輸入指令做模擬
4. 全部指令輸入完，再請點擊 Run All 實際執行
5. 指令將會一個個執行，最終會因為 git push 到 develop 觸發 workflow
6. 當提示訊息詢問：是否前往看 workflow 執行情況「Workflow executed successfully. Would you like to view the log?」，請點擊「確定」
7. 會進入 Workflow 的 log 頁面，每秒會更新執行情況
8. 當看到 Status 為綠色圖示 (Success and Complete)，就代表執行完成
9. 在 log 最下方會有 unit testing 的執行結果
![image](https://github.com/user-attachments/assets/2ed6fc4d-3c32-4446-9b61-495f0e4185d0)
![image](https://github.com/user-attachments/assets/e1a50dbb-9bdc-4a51-a87a-2ad5e86f053d)
![image](https://github.com/user-attachments/assets/49dbe2f9-c6c2-4c04-8802-894948b20e77)

### 情境二、自動化確認格式和語法 Formatter and Linter
* 示範檔案：lint_and_format.yml，已在下載的測試專案檔案中，請用 Visual Studio Code 開啟測試專案
* 選擇 lint_and_format.yml，將註解打開，並 ctrl + s 儲存
* 選擇 automated_test.yml，註解
  ```
  on:
  push:
    branches:
      - develop
  ```
  ![image](https://github.com/user-attachments/assets/b8718705-6821-450b-b8c4-f08a756e9445)

* 後續與「情境一、自動化測試 Automatic Testing 」的操作流程一樣
* 在指令集 Use 使用 Scenario → on push develop trigger workflow，Enter 模擬執行，Run All 實際執行
* 在develop 分支 git push 有實際執行成功就會觸發 workflow，自動執行 Formatter and Linter
* 在 log 最下方會有 Formatter and Linter 的執行結果
![image](https://github.com/user-attachments/assets/7717fdc6-0c1a-42f9-a2f9-66df21af0a7e)

### 情境三、自動化部署到 EC2
* 示範檔案：deploy_to_ec2.yml，已在下載的測試專案檔案中，可以用 Visual Studio Code 開啟看 yaml 檔案內容 (會在 main 分支 git push 時觸發部署到 EC2 )
* 在 Settings 設定 EC2 的 secrets，需對應 yaml 檔案內的帶入變數名稱，目前是已設定一台 EC2 的 secrets
* 在指令集 Use 使用 Scenario → on push main trigger workflow，Enter 模擬執行，再 Run All 實際執行
* 流程如影片實際操作示範 ( 影片從按「Run All」按鈕之前帶大家確認資料和檔案，以及實際執行後的效果 )
* [測試的 EC2](http://44.206.195.98/) 每日更新時間是中午 12:00 和晚上 21:00，會更新成頁面只有 Hello World 的狀態。如果打開該網址是已經部署好的狀態，就要再等到上述兩個時間後再測試部署功能。謝謝
* [![Side Project【Git Viewer】_Back End_林虹伶_2024](https://img.youtube.com/vi/1v4r5_5uo8s/0.jpg)](https://youtu.be/1v4r5_5uo8s?si=zLI9qJzkhNZL_gEc&t=62)

## 其他功能介紹
* 模擬到一半想要回到模擬之前的狀態，可以使用 Reset Graph 按鈕，會讓模擬的資料變與實際專案的資料狀態一樣
* Customized My Commands 指令集列表上的指令，都可以直接點擊，就會複製到剪貼簿
* Command History 可以看每次 Run All 的執行結果記錄

## 架構圖 Architecture
* Electron 做出 Git Viewer 桌面應用程式
* git 資料用 D3 繪圖
* 用 vite 打包前端
* 用 GitHub Actions 自動打包放到 GitHub Release 給使用者下載
* 後端先經過 EC2 的 server，ElastiCache 做成的 queue，連接另一台 EC2 的 worker 裡面用到 Docker，資料庫是用 MYSQL RDS
![Architecture](https://github.com/user-attachments/assets/efc3cea0-deee-44af-8985-4c1be09b3ded)

## Workflow 流程圖
* 當監聽指令被觸發，server 將 workflow 放入 queue，worker 取出並 run Docker Image 在 Container 內依據 yaml 檔案，執行自動化部署 EC2 或自動化測試、自動 Formatter和Linter。執行完成 remove Container，worker 接續處理下個請求並建立新的Container 裡面執行。
![Workflow Architecture](https://github.com/user-attachments/assets/4c63b267-308b-433d-89c8-a801d7800c1e)

## 資料庫設計
![gitViewerTable](https://github.com/user-attachments/assets/69401fef-fffb-4081-9805-38652592781a)
