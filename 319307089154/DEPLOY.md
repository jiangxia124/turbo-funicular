# 贵州大学美食节众筹企划网站 - 一键部署指南

非常简单！按照以下3个步骤，您只需要5分钟就能让网站上线：

## 步骤1：准备项目

确保您的计算机上有以下内容：
- 这个项目的所有文件（您已经有了）
- 一个GitHub账号（如果没有，请先注册）

## 步骤2：上传到GitHub

1. **登录GitHub**并点击右上角的"+"号，选择"New repository"
2. **创建仓库**：
   - 仓库名称：`turbo-funicular`（这是您指定的仓库名）
   - 其他选项保持默认
   - 点击"Create repository"
3. **上传文件**：
   - 按照GitHub提供的"push an existing repository from the command line"提示操作：
   ```bash
   # 在项目文件夹中打开命令行/终端
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/您的GitHub用户名/turbo-funicular.git
   git push -u origin master
   ```

## 步骤3：部署到Vercel

1. **访问Vercel**：打开 [Vercel官网](https://vercel.com/)，使用GitHub账号登录
2. **导入项目**：
   - 点击"New Project"按钮
   - 找到并选择您的`turbo-funicular`仓库
   - 点击"Import"按钮
3. **配置并部署**：
   - 确认**Framework Preset**自动选择了`Vite`
   - 其他设置（Build Command、Output Directory）保持默认
   - 点击"Deploy"按钮
4. **完成部署**：
   - 等待几分钟，Vercel会自动构建并部署您的网站
   - 部署完成后，您将获得一个可访问的URL（如 `https://turbo-funicular.vercel.app`）

## 大功告成！

现在您可以通过Vercel提供的URL访问您的贵州大学美食节众筹企划网站了！每当您向GitHub仓库推送新的更改，Vercel会自动重新构建和部署您的网站。

## 遇到问题？

如果遇到任何问题，您可以：
1. 使用项目根目录下的`贵州大学美食节众筹企划.html`文件，这是一个可以直接在浏览器中打开的完整版本
2. 查看浏览器控制台（按F12）是否有错误信息
3. 联系Vercel客服获取帮助

祝您的网站访问量节节攀升！