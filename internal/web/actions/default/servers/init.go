package servers

import (
	"EdgeUser/internal/web/helpers"
	"github.com/iwind/TeaGo"
)

func init() {
	TeaGo.BeforeStart(func(server *TeaGo.Server) {
		server.
			Helper(helpers.NewUserMustAuth()).
			Helper(NewHelper()).
			Prefix("/servers").
			Get("", new(IndexAction)).
			EndAll()
	})
}
