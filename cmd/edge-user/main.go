package main

import (
	"EdgeUser/internal/apps"
	teaconst "EdgeUser/internal/const"
	_ "EdgeUser/internal/web"
	"github.com/iwind/TeaGo"
	"github.com/iwind/TeaGo/Tea"
	_ "github.com/iwind/TeaGo/bootstrap"
	"github.com/iwind/TeaGo/rands"
	"github.com/iwind/TeaGo/sessions"
)

func main() {
	app := apps.NewAppCmd().
		Version(teaconst.Version).
		Product(teaconst.ProductName).
		Usage(teaconst.ProcessName + " [-v|start|stop|restart]")

	app.Run(func() {
		// 启动管理界面
		secret := rands.String(32)

		// 测试环境下设置一个固定的key，方便我们调试
		if Tea.IsTesting() {
			secret = "8f983f4d69b83aaa0d74b21a212f6967"
		}

		server := TeaGo.NewServer(false).
			AccessLog(false).
			EndAll().
			Session(sessions.NewFileSessionManager(86400, secret), "cookieName-userId")
		server.Start()
	})
}
