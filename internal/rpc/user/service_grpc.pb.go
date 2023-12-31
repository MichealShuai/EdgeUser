// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v3.15.8
// source: service.proto

package user

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	Service_Login_FullMethodName            = "/user.Service/login"
	Service_CreateLog_FullMethodName        = "/user.Service/createLog"
	Service_CheckUserExists_FullMethodName  = "/user.Service/checkUserExists"
	Service_FindUserFullName_FullMethodName = "/user.Service/findUserFullName"
)

// ServiceClient is the client API for Service service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ServiceClient interface {
	// 登录
	Login(ctx context.Context, in *LoginRequest, opts ...grpc.CallOption) (*LoginResponse, error)
	// 创建操作日志
	CreateLog(ctx context.Context, in *CreateLogRequest, opts ...grpc.CallOption) (*CreateLogResponse, error)
	// 检查User是否存在
	CheckUserExists(ctx context.Context, in *CheckUserExistsRequest, opts ...grpc.CallOption) (*CheckUserExistsResponse, error)
	// 获取User名称
	FindUserFullName(ctx context.Context, in *FindUserNameRequest, opts ...grpc.CallOption) (*FindUserNameResponse, error)
}

type serviceClient struct {
	cc grpc.ClientConnInterface
}

func NewServiceClient(cc grpc.ClientConnInterface) ServiceClient {
	return &serviceClient{cc}
}

func (c *serviceClient) Login(ctx context.Context, in *LoginRequest, opts ...grpc.CallOption) (*LoginResponse, error) {
	out := new(LoginResponse)
	err := c.cc.Invoke(ctx, Service_Login_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *serviceClient) CreateLog(ctx context.Context, in *CreateLogRequest, opts ...grpc.CallOption) (*CreateLogResponse, error) {
	out := new(CreateLogResponse)
	err := c.cc.Invoke(ctx, Service_CreateLog_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *serviceClient) CheckUserExists(ctx context.Context, in *CheckUserExistsRequest, opts ...grpc.CallOption) (*CheckUserExistsResponse, error) {
	out := new(CheckUserExistsResponse)
	err := c.cc.Invoke(ctx, Service_CheckUserExists_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *serviceClient) FindUserFullName(ctx context.Context, in *FindUserNameRequest, opts ...grpc.CallOption) (*FindUserNameResponse, error) {
	out := new(FindUserNameResponse)
	err := c.cc.Invoke(ctx, Service_FindUserFullName_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ServiceServer is the server API for Service service.
// All implementations must embed UnimplementedServiceServer
// for forward compatibility
type ServiceServer interface {
	// 登录
	Login(context.Context, *LoginRequest) (*LoginResponse, error)
	// 创建操作日志
	CreateLog(context.Context, *CreateLogRequest) (*CreateLogResponse, error)
	// 检查User是否存在
	CheckUserExists(context.Context, *CheckUserExistsRequest) (*CheckUserExistsResponse, error)
	// 获取User名称
	FindUserFullName(context.Context, *FindUserNameRequest) (*FindUserNameResponse, error)
	mustEmbedUnimplementedServiceServer()
}

// UnimplementedServiceServer must be embedded to have forward compatible implementations.
type UnimplementedServiceServer struct {
}

func (UnimplementedServiceServer) Login(context.Context, *LoginRequest) (*LoginResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Login not implemented")
}
func (UnimplementedServiceServer) CreateLog(context.Context, *CreateLogRequest) (*CreateLogResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateLog not implemented")
}
func (UnimplementedServiceServer) CheckUserExists(context.Context, *CheckUserExistsRequest) (*CheckUserExistsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CheckUserExists not implemented")
}
func (UnimplementedServiceServer) FindUserFullName(context.Context, *FindUserNameRequest) (*FindUserNameResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FindUserFullName not implemented")
}
func (UnimplementedServiceServer) mustEmbedUnimplementedServiceServer() {}

// UnsafeServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ServiceServer will
// result in compilation errors.
type UnsafeServiceServer interface {
	mustEmbedUnimplementedServiceServer()
}

func RegisterServiceServer(s grpc.ServiceRegistrar, srv ServiceServer) {
	s.RegisterService(&Service_ServiceDesc, srv)
}

func _Service_Login_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(LoginRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ServiceServer).Login(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Service_Login_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ServiceServer).Login(ctx, req.(*LoginRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Service_CreateLog_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateLogRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ServiceServer).CreateLog(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Service_CreateLog_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ServiceServer).CreateLog(ctx, req.(*CreateLogRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Service_CheckUserExists_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CheckUserExistsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ServiceServer).CheckUserExists(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Service_CheckUserExists_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ServiceServer).CheckUserExists(ctx, req.(*CheckUserExistsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Service_FindUserFullName_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FindUserNameRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ServiceServer).FindUserFullName(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Service_FindUserFullName_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ServiceServer).FindUserFullName(ctx, req.(*FindUserNameRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Service_ServiceDesc is the grpc.ServiceDesc for Service service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Service_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "user.Service",
	HandlerType: (*ServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "login",
			Handler:    _Service_Login_Handler,
		},
		{
			MethodName: "createLog",
			Handler:    _Service_CreateLog_Handler,
		},
		{
			MethodName: "checkUserExists",
			Handler:    _Service_CheckUserExists_Handler,
		},
		{
			MethodName: "findUserFullName",
			Handler:    _Service_FindUserFullName_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "service.proto",
}
