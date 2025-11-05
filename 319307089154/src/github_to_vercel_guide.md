# 从GitHub部署到Vercel的详细指南

本指南将一步一步教您如何将贵州大学美食节众筹企划项目从GitHub部署到Vercel平台。请按照以下步骤操作：

## 前提条件

在开始之前，请确保您已经：
1. 拥有一个[GitHub](https://github.com/)账号
2. 拥有一个[Vercel](https://vercel.com/)账号
3. 已在您的电脑上安装[Git](https://git-scm.com/downloads)

## 步骤1：将项目代码上传到GitHub仓库

### 子步骤1.1：确认您的GitHub仓库已创建
1. 打开浏览器，登录您的GitHub账号
2. 检查您的仓库列表中是否已经有一个名为`turbo-funicular`的仓库
3. 如果没有，请先创建这个仓库（创建时不需要勾选"Initialize this repository with a README"选项）

### 子步骤1.2：将本地项目与GitHub仓库连接
1. 找到您的项目文件夹，右键点击文件夹，选择"Git Bash Here"（Windows）或"在终端中打开"（Mac）
2. 在打开的命令行窗口中，输入以下命令并按回车键（请确保您已安装Git）：

```bash
# 初始化Git仓库
git init

# 添加所有文件到暂存区
git add .

# 提交更改
git commit -m "Initial commit"

# 连接到GitHub仓库
git remote add origin https://github.com/您的GitHub用户名/turbo-funicular.git

# 推送到GitHub
git push -u origin master
```

**注意：** 请将`您的GitHub用户名`替换为您实际的GitHub用户名

如果推送时出现权限问题，请按照屏幕提示进行身份验证，或设置[SSH密钥](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)。

## 步骤2：在Vercel上部署项目

### 子步骤2.1：登录Vercel账号
1. 打开浏览器，访问[Vercel官网](https://vercel.com/)
2. 点击右上角的"Login"按钮
3. 使用您的GitHub账号登录（推荐，这样可以直接访问您的GitHub仓库）

### 子步骤2.2：导入GitHub仓库
1. 登录成功后，您会进入Vercel的仪表盘
2. 点击仪表盘上的"New Project"按钮
3. 在"Import Git Repository"部分，您应该能看到您的GitHub仓库列表
4. 找到并选择`turbo-funicular`仓库
5. 点击"Import"按钮

### 子步骤2.3：配置部署设置
1. 在配置页面，确保以下设置正确（这是项目能够成功部署的关键！）：
   - **Framework Preset**: 选择`Vite`
   - **Build Command**: 保持为`npm run build`
   - **Output Directory**: 保持为`dist`
   - **Install Command**: 保持为`npm install`
2. 向下滚动页面，检查是否有其他需要配置的选项（通常保持默认即可）
3. 确认所有设置正确后，点击"Deploy"按钮

### 子步骤2.4：等待部署完成
1. Vercel会自动开始构建和部署您的项目
2. 部署过程中，您可以看到实时的日志输出
3. 等待几分钟，直到看到"Deployment Complete"的提示

### 子步骤2.5：访问已部署的网站
1. 部署成功后，Vercel会为您提供一个可访问的URL，类似于`https://turbo-funicular.vercel.app`
2. 点击这个URL，您就可以访问已经成功部署的贵州大学美食节众筹企划网站了！

## 常见问题及解决方案

### 问题1：部署后网站显示白屏或路由不正常

**解决方案：**
1. 这通常是SPA（单页应用）路由配置问题
2. 本项目已经在代码中优化了配置，确保SPA路由正常工作
3. 如果仍然遇到问题，可以尝试在Vercel控制台中添加重写规则：
   - 登录Vercel控制台，选择您的项目
   - 点击"Settings" -> "Domains" -> "Redirects"
   - 添加一条规则：
     - Source: `/*`
     - Destination: `/index.html`
     - Type: `Rewrite`
   - 保存设置并重新部署项目

### 问题2：部署时出现构建错误

**解决方案：**
1. 首先确保您的项目可以在本地正常构建：
   ```bash
   # 在项目文件夹中运行
   npm install
   npm run build
   ```
2. 如果本地构建失败，请先解决构建问题
3. 检查是否有缺失的依赖
4. 查看Vercel控制台中的构建日志，了解具体的错误信息

### 问题3：GitHub仓库无法在Vercel中显示

**解决方案：**
1. 确认您的Vercel账号已正确连接到GitHub账号
2. 在Vercel的"Integrations"页面，检查GitHub权限是否正确
3. 如果问题依然存在，尝试手动输入仓库URL：
   - 在Vercel导入页面，选择"Import Git Repository"
   - 点击"Paste Repository URL"
   - 输入您的GitHub仓库URL：`https://github.com/您的GitHub用户名/turbo-funicular.git`
   - 点击"Continue"

## 特别提示

1. 本项目已经过优化，可以直接部署到Vercel等平台
2. 项目中的所有图片都使用了绝对URL，确保在任何环境下都能正常显示
3. 每次您向GitHub仓库推送新的更改，Vercel会自动重新构建和部署您的网站
4. 如果您想使用自定义域名，可以在Vercel的项目设置中进行配置
5. 部署完成后，您可以在Vercel控制台中查看网站的访问统计和性能数据

祝您部署顺利！贵州大学美食节众筹企划网站将很快与大家见面！