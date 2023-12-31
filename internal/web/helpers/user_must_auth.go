package helpers

import (
	teaconst "EdgeUser/internal/const"
	"EdgeUser/internal/utils"
	nodes "github.com/MichealShuai/goedge/tree/main/EdgeUser/internal/rpc"
	"github.com/iwind/TeaGo/actions"
	"github.com/iwind/TeaGo/logs"
	"net/http"
	"reflect"
)

// 认证拦截
type UserMustAuth struct {
	AdminId int
	Grant   string
}

func NewUserMustAuth() *UserMustAuth {
	return &UserMustAuth{}
}

func (this *UserMustAuth) BeforeAction(actionPtr actions.ActionWrapper, paramName string) (goNext bool) {
	var action = actionPtr.Object()

	var session = action.Session()
	var adminId = session.GetInt("adminId")
	if adminId <= 0 {
		this.login(action)
		return false
	}

	// 检查用户是否存在
	rpc, err := nodes.SharedRPC()
	if err != nil {
		utils.PrintError(err)
		return false
	}
	rpcResp, err := rpc.UserRPC().CheckUserExists(rpc.Context(0), &admin.CheckAdminExistsRequest{AdminId: int64(adminId)})
	if err != nil {
		logs.Error(err)
		return false
	}

	if !rpcResp.IsOk {
		session.Delete()

		this.login(action)
		return false
	}

	this.AdminId = adminId
	action.Context.Set("adminId", this.AdminId)

	if action.Request.Method != http.MethodGet {
		return true
	}

	// 初始化内置方法
	action.ViewFunc("teaTitle", func() string {
		return action.Data["teaTitle"].(string)
	})

	// 初始化变量
	modules := []map[string]interface{}{
		{
			"code":     "servers",
			"menuName": "服务管理",
			"icon":     "clone outsize",
		},
		{
			"code":     "nodes",
			"menuName": "节点管理",
			"icon":     "server",
		},
	}

	action.Data["teaTitle"] = teaconst.ProductNameZH
	action.Data["teaName"] = teaconst.ProductNameZH

	resp, err := rpc.AdminRPC().FindAdminFullname(rpc.Context(0), &admin.FindAdminNameRequest{AdminId: int64(this.AdminId)})
	if err != nil {
		utils.PrintError(err)
		action.Data["teaUsername"] = ""
	} else {
		action.Data["teaUsername"] = resp.Fullname
	}

	action.Data["teaUserAvatar"] = ""

	action.Data["teaMenu"] = ""
	action.Data["teaModules"] = modules
	action.Data["teaSubMenus"] = []map[string]interface{}{}
	action.Data["teaTabbar"] = []map[string]interface{}{}
	action.Data["teaVersion"] = teaconst.Version
	action.Data["teaIsSuper"] = false

	// 菜单
	action.Data["firstMenuItem"] = ""

	// 未读消息数
	action.Data["teaBadge"] = 0

	// 调用Init
	initMethod := reflect.ValueOf(actionPtr).MethodByName("Init")
	if initMethod.IsValid() {
		initMethod.Call([]reflect.Value{})
	}

	return true
}

func (this *UserMustAuth) login(action *actions.ActionObject) {
	action.RedirectURL("/")
}
