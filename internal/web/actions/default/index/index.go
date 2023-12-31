package index

import (
	user "EdgeCommon/pkg/rpc/usersystem"
	"EdgeUser/internal/oplogs"
	"EdgeUser/internal/rpc"
	"EdgeUser/internal/utils"
	"EdgeUser/internal/web/actions/actionutils"
	"EdgeUser/internal/web/helpers"
	"fmt"
	"github.com/iwind/TeaGo/actions"
	"github.com/iwind/TeaGo/types"
	stringutil "github.com/iwind/TeaGo/utils/string"
	"time"
)

type IndexAction actions.Action

// 首页（登录页）

var TokenSalt = stringutil.Rand(32)

func (this *IndexAction) RunGet(params struct {
	From string

	Auth *helpers.UserShouldAuth
}) {
	// 已登录跳转到dashboard
	if params.Auth.IsUser() {
		this.RedirectURL("/dashboard")
		return
	}

	this.Data["isUser"] = false
	this.Data["menu"] = "signIn"

	timestamp := fmt.Sprintf("%d", time.Now().Unix())
	this.Data["token"] = stringutil.Md5(TokenSalt+timestamp) + timestamp
	this.Data["from"] = params.From

	this.Show()
}

// 提交
func (this *IndexAction) RunPost(params struct {
	Token    string
	Username string
	Password string
	Remember bool
	Must     *actions.Must
	Auth     *helpers.UserShouldAuth
}) {
	params.Must.
		Field("username", params.Username).
		Require("请输入用户名").
		Field("password", params.Password).
		Require("请输入密码")

	if params.Password == stringutil.Md5("") {
		this.FailField("password", "请输入密码")
	}

	// 检查token
	if len(params.Token) <= 32 {
		this.Fail("请通过登录页面登录")
	}
	timestampString := params.Token[32:]
	if stringutil.Md5(TokenSalt+timestampString) != params.Token[:32] {
		this.FailField("refresh", "登录页面已过期，请刷新后重试")
	}
	timestamp := types.Int64(timestampString)
	if timestamp < time.Now().Unix()-1800 {
		this.FailField("refresh", "登录页面已过期，请刷新后重试")
	}

	rpcClient, err := rpc.SharedRPC()
	if err != nil {
		this.Fail("服务器出了点小问题：" + err.Error())
	}
	resp, err := rpcClient.UserRPC().Login(rpcClient.Context(0), &user.LoginRequest{
		Username: params.Username,
		Password: params.Password,
	})

	if err != nil {
		_, err = rpcClient.UserRPC().CreateLog(rpcClient.Context(0), &user.CreateLogRequest{
			Level:       oplogs.LevelError,
			Description: "登录时发生系统错误：" + err.Error(),
			Action:      this.Request.URL.Path,
			Ip:          this.RequestRemoteIP(),
		})
		if err != nil {
			utils.PrintError(err)
		}

		actionutils.Fail(this, err)
	}

	if !resp.IsOk {
		_, err = rpcClient.UserRPC().CreateLog(rpcClient.Context(0), &user.CreateLogRequest{
			Level:       oplogs.LevelWarn,
			Description: "登录失败，用户名：" + params.Username,
			Action:      this.Request.URL.Path,
			Ip:          this.RequestRemoteIP(),
		})
		if err != nil {
			utils.PrintError(err)
		}

		this.Fail("请输入正确的用户名密码")
	}

	userId := int(resp.UserId)
	params.Auth.StoreAdmin(userId, params.Remember)

	// 记录日志
	_, err = rpcClient.UserRPC().CreateLog(rpcClient.Context(0), &user.CreateLogRequest{
		Level:       oplogs.LevelInfo,
		Description: "成功登录系统，用户名：" + params.Username,
		Action:      this.Request.URL.Path,
		Ip:          this.RequestRemoteIP(),
	})
	if err != nil {
		utils.PrintError(err)
	}

	this.Success()
}
