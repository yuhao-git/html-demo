// vite.config.ts
import vue from "file:///D:/common-project/html-demo/novice/novice-manage/node_modules/.pnpm/@vitejs+plugin-vue@3.2.0_vite@5.3.3_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig, loadEnv as loadEnv2 } from "file:///D:/common-project/html-demo/novice/novice-manage/node_modules/.pnpm/vite@5.3.3_less@4.1.3/node_modules/vite/dist/node/index.js";
import vueDevTools from "file:///D:/common-project/html-demo/novice/novice-manage/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.5_vite@5.3.3_vue@3.3.4/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import { resolve } from "path";
import svgLoader from "file:///D:/common-project/html-demo/novice/novice-manage/node_modules/.pnpm/vite-svg-loader@3.6.0/node_modules/vite-svg-loader/index.js";

// src/assets/icon/index.ts
import { readFileSync, readdirSync } from "fs";
var idPerfix = "";
var svgTitle = /<svg([^>+].*?)>/;
var clearHeightWidth = /(width|height)="([^>+].*?)"/g;
var hasViewBox = /(viewBox="[^>+].*?")/g;
var clearReturn = /(\r)|(\n)/g;
function svgFind(e) {
  const arr = [];
  const dirents = readdirSync(e, { withFileTypes: true });
  for (const dirent of dirents) {
    if (dirent.isDirectory()) arr.push(...svgFind(e + dirent.name + "/"));
    else {
      const svg = readFileSync(e + dirent.name).toString().replace(/fill=".*?"/, "").replace(clearReturn, "").replace(svgTitle, ($1, $2) => {
        let width = 0, height = 0, content = $2.replace(clearHeightWidth, (s1, s2, s3) => {
          if (s2 === "width") width = s3;
          else if (s2 === "height") height = s3;
          return "";
        });
        if (!hasViewBox.test($2)) content += `viewBox="0 0 ${width} ${height}"`;
        return `<symbol id="${idPerfix}-${dirent.name.replace(".svg", "")}" ${content}>`;
      }).replace("</svg>", "</symbol>");
      arr.push(svg);
    }
  }
  return arr;
}
var createSvg = (path, perfix = "icon") => {
  if (path === "") return;
  idPerfix = perfix;
  const res = svgFind(path);
  return {
    name: "svg-transform",
    transformIndexHtml(dom) {
      return dom.replace(
        "<body>",
        `<body><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">${res.join("")}</svg>`
      );
    }
  };
};

// config.js
import { loadEnv } from "file:///D:/common-project/html-demo/novice/novice-manage/node_modules/.pnpm/vite@5.3.3_less@4.1.3/node_modules/vite/dist/node/index.js";
var env = loadEnv(process.env.NODE_ENV, process.cwd(), "");
var config_default = {
  port: env.PORT
};

// vite.config.ts
var __vite_injected_original_dirname = "D:\\common-project\\html-demo\\novice\\novice-manage";
var pathResolve = (dir) => {
  return resolve(__vite_injected_original_dirname, ".", dir);
};
var alias = {
  "@": pathResolve("src")
};
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    base: loadEnv2(mode, process.cwd()).VITE_APP_BASEPATH,
    resolve: {
      alias
    },
    server: {
      host: "0.0.0.0",
      port: config_default.port,
      client: {
        webSocketURL: "ws://localhost:12010/"
      },
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    },
    plugins: [
      vueDevTools(),
      vue(),
      createSvg("./src/assets/icon/svg/"),
      svgLoader()
      // AutoImport({ 
      //   resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),
    ],
    define: {
      PORT: config_default.port
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL2Fzc2V0cy9pY29uL2luZGV4LnRzIiwgImNvbmZpZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvbW1vbi1wcm9qZWN0XFxcXGh0bWwtZGVtb1xcXFxub3ZpY2VcXFxcbm92aWNlLW1hbmFnZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29tbW9uLXByb2plY3RcXFxcaHRtbC1kZW1vXFxcXG5vdmljZVxcXFxub3ZpY2UtbWFuYWdlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb21tb24tcHJvamVjdC9odG1sLWRlbW8vbm92aWNlL25vdmljZS1tYW5hZ2Uvdml0ZS5jb25maWcudHNcIjsvLyB2aXRlLmNvbmZpZy50c1xyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuLy8gaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjsgICAvLyBcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVcdTdFQzRcdTRFRjZcdTYyRDZcdTYxNjJcdTk5OTZcdTZCMjFcdThCQkZcdTk1RUVcdTUyQTBcdThGN0RcdTkwMUZcdTVFQTZcclxuLy8gaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcclxuLy8gaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSBcInZpdGUtc3ZnLWxvYWRlclwiO1xyXG5pbXBvcnQgeyBjcmVhdGVTdmcgfSBmcm9tIFwiLi9zcmMvYXNzZXRzL2ljb24vaW5kZXgudHNcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbi8qKiBcdThERUZcdTVGODRcdTY3RTVcdTYyN0UgKi9cclxuY29uc3QgcGF0aFJlc29sdmUgPSAoZGlyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiByZXNvbHZlKF9fZGlybmFtZSwgXCIuXCIsIGRpcik7XHJcbn07XHJcblxyXG4vKiogXHU4QkJFXHU3RjZFXHU1MjJCXHU1NDBEICovXHJcbmNvbnN0IGFsaWFzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gIFwiQFwiOiBwYXRoUmVzb2x2ZShcInNyY1wiKSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgYmFzZTogbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKS5WSVRFX0FQUF9CQVNFUEFUSCxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXMsXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxyXG4gICAgICBwb3J0OiBjb25maWcucG9ydCxcclxuICAgICAgY2xpZW50OntcclxuICAgICAgICB3ZWJTb2NrZXRVUkw6ICd3czovL2xvY2FsaG9zdDoxMjAxMC8nXHJcbiAgICAgIH0sXHJcbiAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZURldlRvb2xzKCksXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICBjcmVhdGVTdmcoXCIuL3NyYy9hc3NldHMvaWNvbi9zdmcvXCIpLFxyXG4gICAgICBzdmdMb2FkZXIoKSxcclxuICAgICAgLy8gQXV0b0ltcG9ydCh7IFxyXG4gICAgICAvLyAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICAgIC8vIH0pLFxyXG4gICAgICAvLyBDb21wb25lbnRzKHtcclxuICAgICAgLy8gICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICAvLyB9KSxcclxuICAgIF0sXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgUE9SVDogY29uZmlnLnBvcnQsXHJcbiAgICB9LFxyXG4gIH07XHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvbW1vbi1wcm9qZWN0XFxcXGh0bWwtZGVtb1xcXFxub3ZpY2VcXFxcbm92aWNlLW1hbmFnZVxcXFxzcmNcXFxcYXNzZXRzXFxcXGljb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvbW1vbi1wcm9qZWN0XFxcXGh0bWwtZGVtb1xcXFxub3ZpY2VcXFxcbm92aWNlLW1hbmFnZVxcXFxzcmNcXFxcYXNzZXRzXFxcXGljb25cXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvbW1vbi1wcm9qZWN0L2h0bWwtZGVtby9ub3ZpY2Uvbm92aWNlLW1hbmFnZS9zcmMvYXNzZXRzL2ljb24vaW5kZXgudHNcIjtpbXBvcnQgeyByZWFkRmlsZVN5bmMsIHJlYWRkaXJTeW5jIH0gZnJvbSAnZnMnXHJcblxyXG5sZXQgaWRQZXJmaXggPSAnJ1xyXG5jb25zdCBzdmdUaXRsZSA9IC88c3ZnKFtePitdLio/KT4vXHJcbmNvbnN0IGNsZWFySGVpZ2h0V2lkdGggPSAvKHdpZHRofGhlaWdodCk9XCIoW14+K10uKj8pXCIvZ1xyXG5jb25zdCBoYXNWaWV3Qm94ID0gLyh2aWV3Qm94PVwiW14+K10uKj9cIikvZ1xyXG5jb25zdCBjbGVhclJldHVybiA9IC8oXFxyKXwoXFxuKS9nXHJcblxyXG4vLyBcdTY3RTVcdTYyN0VzdmdcdTY1ODdcdTRFRjZcclxuZnVuY3Rpb24gc3ZnRmluZChlOiBhbnkpOiBBcnJheTxhbnk+IHtcclxuICBjb25zdCBhcnIgPSBbXVxyXG4gIGNvbnN0IGRpcmVudHMgPSByZWFkZGlyU3luYyhlLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSlcclxuICBmb3IgKGNvbnN0IGRpcmVudCBvZiBkaXJlbnRzKSB7XHJcbiAgICBpZiAoZGlyZW50LmlzRGlyZWN0b3J5KCkpIGFyci5wdXNoKC4uLnN2Z0ZpbmQoZSArIGRpcmVudC5uYW1lICsgJy8nKSlcclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zdCBzdmcgPSByZWFkRmlsZVN5bmMoZSArIGRpcmVudC5uYW1lKVxyXG4gICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgLnJlcGxhY2UoL2ZpbGw9XCIuKj9cIi8sICcnKVxyXG4gICAgICAgIC5yZXBsYWNlKGNsZWFyUmV0dXJuLCAnJylcclxuICAgICAgICAucmVwbGFjZShzdmdUaXRsZSwgKCQxOiBhbnksICQyOiBhbnkpID0+IHtcclxuICAgICAgICAgIGxldCB3aWR0aCA9IDAsXHJcbiAgICAgICAgICAgIGhlaWdodCA9IDAsXHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSAkMi5yZXBsYWNlKGNsZWFySGVpZ2h0V2lkdGgsIChzMTogYW55LCBzMjogYW55LCBzMzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHMyID09PSAnd2lkdGgnKSB3aWR0aCA9IHMzXHJcbiAgICAgICAgICAgICAgZWxzZSBpZiAoczIgPT09ICdoZWlnaHQnKSBoZWlnaHQgPSBzM1xyXG4gICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgaWYgKCFoYXNWaWV3Qm94LnRlc3QoJDIpKSBjb250ZW50ICs9IGB2aWV3Qm94PVwiMCAwICR7d2lkdGh9ICR7aGVpZ2h0fVwiYFxyXG4gICAgICAgICAgcmV0dXJuIGA8c3ltYm9sIGlkPVwiJHtpZFBlcmZpeH0tJHtkaXJlbnQubmFtZS5yZXBsYWNlKCcuc3ZnJywgJycpfVwiICR7Y29udGVudH0+YFxyXG4gICAgICAgIH0pLnJlcGxhY2UoJzwvc3ZnPicsICc8L3N5bWJvbD4nKVxyXG4gICAgICBhcnIucHVzaChzdmcpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBhcnJcclxufVxyXG5cclxuLy8gXHU3NTFGXHU2MjEwc3ZnXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVTdmcgPSAocGF0aDogYW55LCBwZXJmaXggPSAnaWNvbicpID0+IHtcclxuICBpZiAocGF0aCA9PT0gJycpIHJldHVyblxyXG4gIGlkUGVyZml4ID0gcGVyZml4XHJcbiAgY29uc3QgcmVzID0gc3ZnRmluZChwYXRoKVxyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnc3ZnLXRyYW5zZm9ybScsXHJcbiAgICB0cmFuc2Zvcm1JbmRleEh0bWwoZG9tOiBTdHJpbmcpIHtcclxuICAgICAgcmV0dXJuIGRvbS5yZXBsYWNlKFxyXG4gICAgICAgICc8Ym9keT4nLFxyXG4gICAgICAgIGA8Ym9keT48c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgd2lkdGg6IDA7IGhlaWdodDogMFwiPiR7cmVzLmpvaW4oJycpfTwvc3ZnPmBcclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH1cclxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY29tbW9uLXByb2plY3RcXFxcaHRtbC1kZW1vXFxcXG5vdmljZVxcXFxub3ZpY2UtbWFuYWdlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb21tb24tcHJvamVjdFxcXFxodG1sLWRlbW9cXFxcbm92aWNlXFxcXG5vdmljZS1tYW5hZ2VcXFxcY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb21tb24tcHJvamVjdC9odG1sLWRlbW8vbm92aWNlL25vdmljZS1tYW5hZ2UvY29uZmlnLmpzXCI7aW1wb3J0IHsgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXHJcblxyXG5jb25zdCBlbnYgPSBsb2FkRW52KHByb2Nlc3MuZW52Lk5PREVfRU5WLCBwcm9jZXNzLmN3ZCgpLCAnJylcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHBvcnQ6IGVudi5QT1JUXHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsY0FBYyxXQUFBQSxnQkFBZTtBQUN0QyxPQUFPLGlCQUFpQjtBQUl4QixTQUFTLGVBQWU7QUFDeEIsT0FBTyxlQUFlOzs7QUNSZ1csU0FBUyxjQUFjLG1CQUFtQjtBQUVoYSxJQUFJLFdBQVc7QUFDZixJQUFNLFdBQVc7QUFDakIsSUFBTSxtQkFBbUI7QUFDekIsSUFBTSxhQUFhO0FBQ25CLElBQU0sY0FBYztBQUdwQixTQUFTLFFBQVEsR0FBb0I7QUFDbkMsUUFBTSxNQUFNLENBQUM7QUFDYixRQUFNLFVBQVUsWUFBWSxHQUFHLEVBQUUsZUFBZSxLQUFLLENBQUM7QUFDdEQsYUFBVyxVQUFVLFNBQVM7QUFDNUIsUUFBSSxPQUFPLFlBQVksRUFBRyxLQUFJLEtBQUssR0FBRyxRQUFRLElBQUksT0FBTyxPQUFPLEdBQUcsQ0FBQztBQUFBLFNBQy9EO0FBQ0gsWUFBTSxNQUFNLGFBQWEsSUFBSSxPQUFPLElBQUksRUFDckMsU0FBUyxFQUNULFFBQVEsY0FBYyxFQUFFLEVBQ3hCLFFBQVEsYUFBYSxFQUFFLEVBQ3ZCLFFBQVEsVUFBVSxDQUFDLElBQVMsT0FBWTtBQUN2QyxZQUFJLFFBQVEsR0FDVixTQUFTLEdBQ1QsVUFBVSxHQUFHLFFBQVEsa0JBQWtCLENBQUMsSUFBUyxJQUFTLE9BQVk7QUFDcEUsY0FBSSxPQUFPLFFBQVMsU0FBUTtBQUFBLG1CQUNuQixPQUFPLFNBQVUsVUFBUztBQUNuQyxpQkFBTztBQUFBLFFBQ1QsQ0FBQztBQUNILFlBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxFQUFHLFlBQVcsZ0JBQWdCLEtBQUssSUFBSSxNQUFNO0FBQ3BFLGVBQU8sZUFBZSxRQUFRLElBQUksT0FBTyxLQUFLLFFBQVEsUUFBUSxFQUFFLENBQUMsS0FBSyxPQUFPO0FBQUEsTUFDL0UsQ0FBQyxFQUFFLFFBQVEsVUFBVSxXQUFXO0FBQ2xDLFVBQUksS0FBSyxHQUFHO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQ1Q7QUFHTyxJQUFNLFlBQVksQ0FBQyxNQUFXLFNBQVMsV0FBVztBQUN2RCxNQUFJLFNBQVMsR0FBSTtBQUNqQixhQUFXO0FBQ1gsUUFBTSxNQUFNLFFBQVEsSUFBSTtBQUN4QixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixtQkFBbUIsS0FBYTtBQUM5QixhQUFPLElBQUk7QUFBQSxRQUNUO0FBQUEsUUFDQSw0SUFBNEksSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUFBLE1BQzFKO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjs7O0FDbERrVSxTQUFTLGVBQWU7QUFFMVYsSUFBTSxNQUFNLFFBQVEsUUFBUSxJQUFJLFVBQVUsUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzRCxJQUFPLGlCQUFRO0FBQUEsRUFDYixNQUFNLElBQUk7QUFDWjs7O0FGTEEsSUFBTSxtQ0FBbUM7QUFhekMsSUFBTSxjQUFjLENBQUMsUUFBd0I7QUFDM0MsU0FBTyxRQUFRLGtDQUFXLEtBQUssR0FBRztBQUNwQztBQUdBLElBQU0sUUFBZ0M7QUFBQSxFQUNwQyxLQUFLLFlBQVksS0FBSztBQUN4QjtBQUVBLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFDakQsU0FBTztBQUFBLElBQ0wsTUFBTUMsU0FBUSxNQUFNLFFBQVEsSUFBSSxDQUFDLEVBQUU7QUFBQSxJQUNuQyxTQUFTO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU0sZUFBTztBQUFBLE1BQ2IsUUFBTztBQUFBLFFBQ0wsY0FBYztBQUFBLE1BQ2hCO0FBQUEsTUFDQSxTQUFRO0FBQUEsUUFDTiwrQkFBK0I7QUFBQSxNQUNqQztBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFlBQVk7QUFBQSxNQUNaLElBQUk7QUFBQSxNQUNKLFVBQVUsd0JBQXdCO0FBQUEsTUFDbEMsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBT1o7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU0sZUFBTztBQUFBLElBQ2Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsibG9hZEVudiIsICJsb2FkRW52Il0KfQo=
