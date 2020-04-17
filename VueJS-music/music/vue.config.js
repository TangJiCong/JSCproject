module.exports = {
    devServer: {
        open: true,
        proxy: {
            "/baiduapi": {
                target: "http://tingapi.ting.baidu.com",
                changeOrigin: true,
                pathRewrite: {
                    "^/baiduapi": ""
                }
            },
            "/wangyiyunapi": {
                target: "http://www.young1024.com:666",
                changeOrigin: true,
                pathRewrite: {
                    "^/wangyiyunapi": ""
                }
            },
        }
    }
};