package services

import (
	"EdgeUser/internal/rpc/user"
	"context"
	//rpcutils "github.com/TeaOSLab/EdgeAPI/internal/rpc/utils"
)

// UserService 相关服务
type UserService struct {
	debug bool
}

// LoginUser 登录
func (this *UserService) Login(ctx context.Context, req *user.LoginRequest) (*user.LoginResponse, error) {
	//_, _, _, err := rpcutils.ValidateRequest(ctx)
	//if err != nil {
	//	return nil, err
	//}

	if len(req.Username) == 0 || len(req.Password) == 0 {
		return &user.LoginResponse{
			UserId:  0,
			IsOk:    false,
			Message: "请输入正确的用户名密码",
		}, nil
	}

	return &user.LoginResponse{
		UserId: 100,
		IsOk:   true,
	}, nil
}
