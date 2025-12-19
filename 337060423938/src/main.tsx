import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import App from "./App.tsx";
import "./index.css";


// 为GitHub Pages设置正确的基础路径
// 如果您的仓库URL是 https://username.github.io/repo-name/
// 则需要将basename设置为 "/repo-name"
// 当前设置为空字符串，表示使用根路径
const basename = "jiangxia124/turbo-funicular/edit/jiangxia124-patch-3/337060423938/";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
