# 解决Windows PowerShell npm脚本执行问题的详细指南

## 问题描述
当您尝试在Windows PowerShell中运行`npm install`或其他npm命令时，遇到了以下错误：

```
npm : 无法加载文件 C:\Program Files\nodejs\npm.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 2
+  npm install
+  ~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

这是由于Windows PowerShell的执行策略（Execution Policy）限制导致的，它默认不允许运行未签名的脚本。

## 解决方案

### 方法一：使用命令提示符(CMD)代替PowerShell（最简单）
如果您不想修改PowerShell的执行策略，可以直接使用Windows的命令提示符(CMD)来运行npm命令：

1. 按下 `Win + R` 组合键
2. 输入 `cmd` 并按回车键
3. 在打开的命令提示符窗口中，导航到项目目录并运行 `npm install` 命令

### 方法二：修改PowerShell执行策略（永久解决）

#### 步骤1：以管理员身份打开PowerShell
1. 按下 `Win + S` 组合键打开搜索
2. 输入 `PowerShell`
3. 在搜索结果中，右键点击 "Windows PowerShell"
4. 选择 "以管理员身份运行"
5. 如果出现用户账户控制(UAC)提示，点击 "是"

#### 步骤2：查看当前执行策略
在管理员PowerShell窗口中，输入以下命令并按回车键：
```powershell
Get-ExecutionPolicy
```
您可能会看到结果是 `Restricted`（这是默认设置，不允许运行任何脚本）

#### 步骤3：修改执行策略
输入以下命令并按回车键：
```powershell
Set-ExecutionPolicy RemoteSigned
```
这个命令将执行策略设置为 `RemoteSigned`，它允许运行本地创建的脚本，同时要求从互联网下载的脚本必须有数字签名。

#### 步骤4：确认更改
当出现确认提示时，输入 `Y` 并按回车键确认更改。

#### 步骤5：验证执行策略已更改
再次输入以下命令验证更改是否生效：
```powershell
Get-ExecutionPolicy
```
现在应该显示 `RemoteSigned`

#### 步骤6：关闭管理员PowerShell窗口
现在您可以关闭管理员PowerShell窗口，并在普通PowerShell窗口中正常运行npm命令了。

### 方法三：临时绕过执行策略（单次解决）
如果您不想永久更改执行策略，可以在每次运行npm命令时使用以下格式：
```powershell
powershell -ExecutionPolicy Bypass -Command "npm install"
```
这将临时绕过执行策略限制，但只对当前命令有效。

## 运行项目的替代方法
如果您仍然遇到问题，或者不想处理这些技术设置，您可以直接使用项目根目录下的 `贵州大学美食节众筹企划.html` 文件：
1. 找到这个HTML文件
2. 双击它，系统会自动用您的默认浏览器打开
3. 这样您就可以直接查看网站内容，无需安装任何依赖或运行构建命令

## 常见问题解答
1. **为什么会出现这个问题？**
   - 这是Windows的安全措施，默认限制运行未签名的脚本，以防止恶意脚本执行。

2. **修改执行策略是否安全？**
   - 将执行策略设置为 `RemoteSigned` 是相对安全的，它只允许运行本地创建的脚本和有签名的远程脚本。

3. **我还能改回原来的执行策略吗？**
   - 当然可以，只需以管理员身份运行PowerShell，然后输入 `Set-ExecutionPolicy Restricted` 即可恢复默认设置。

## 完成以上步骤后
您现在应该可以在PowerShell中正常运行以下命令了：
```powershell
# 进入项目目录
cd 贵州大学美食节众筹企划项目

# 使用npm安装依赖
npm install

# 构建项目
npm run build

# 本地预览构建结果
npm run preview
```

如果您仍然遇到问题，请参考项目根目录下的 `step_by_step_guide.md` 文件，其中提供了更详细的操作指南。

祝您顺利运行项目！贵州大学美食节众筹企划网站期待您的体验！