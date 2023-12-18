#!/usr/bin/env bash

function proto_compile() {

  protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative ./service.proto

}


proto_compile "user"
#proto_compile "dns"
#proto_compile "log"
#proto_compile "provider"
#proto_compile "stat"
#proto_compile "user"
#proto_compile "monitor"
#proto_compile "node"