package dashboard

import (
	"EdgeUser/internal/web/helpers"
	"github.com/iwind/TeaGo"
)

func init() {
	TeaGo.BeforeStart(func(server *TeaGo.Server) {
		server.Prefix("/dashboard").
			Helper(new(helpers.UserMustAuth)).
			GetPost("", new(IndexAction)).
			EndAll()
	})
}
