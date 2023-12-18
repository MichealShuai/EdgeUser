package rpc

import (
	"EdgeUser/internal/configs"
	teaconst "EdgeUser/internal/const"
	"EdgeUser/internal/encrypt"
	"EdgeUser/internal/rpc/user"
	"EdgeUser/internal/utils"
	"context"
	"encoding/base64"
	"errors"
	"github.com/iwind/TeaGo/maps"
	"github.com/iwind/TeaGo/rands"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
	"time"
)

type RPCClient struct {
	apiConfig   *configs.APIConfig
	userClients []user.ServiceClient
}

func NewRPCClient(apiConfig *configs.APIConfig) (*RPCClient, error) {
	if apiConfig == nil {
		return nil, errors.New("api config should not be nil")
	}

	userClients := []user.ServiceClient{}

	conns := []*grpc.ClientConn{}
	for _, endpoint := range apiConfig.RPC.Endpoints {
		conn, err := grpc.Dial(endpoint, grpc.WithInsecure())
		if err != nil {
			return nil, err
		}
		conns = append(conns, conn)
	}
	if len(conns) == 0 {
		return nil, errors.New("[RPC]no available endpoints")
	}

	// node clients
	for _, conn := range conns {
		userClients = append(userClients, user.NewServiceClient(conn))
	}

	return &RPCClient{
		apiConfig:   apiConfig,
		userClients: userClients,
	}, nil
}

func (this *RPCClient) UserRPC() user.ServiceClient {
	if len(this.userClients) > 0 {
		return this.userClients[rands.Int(0, len(this.userClients)-1)]
	}
	return nil
}

func (this *RPCClient) Context(userId int) context.Context {
	ctx := context.Background()
	m := maps.Map{
		"timestamp": time.Now().Unix(),
		"userId":    userId,
	}
	method, err := encrypt.NewMethodInstance(teaconst.EncryptMethod, this.apiConfig.Secret, this.apiConfig.NodeId)
	if err != nil {
		utils.PrintError(err)
		return context.Background()
	}
	data, err := method.Encrypt(m.AsJSON())
	if err != nil {
		utils.PrintError(err)
		return context.Background()
	}
	token := base64.StdEncoding.EncodeToString(data)
	ctx = metadata.AppendToOutgoingContext(ctx, "nodeId", this.apiConfig.NodeId, "token", token)
	return ctx
}
