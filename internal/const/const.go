package _const

const (
	Version = "0.0.1"

	ProductName   = "Edge User"
	ProcessName   = "edge-user"
	ProductNameZH = "Edge"

	Role = "admin"

	EncryptKey    = "8f983f4d69b83aaa0d74b21a212f6967"
	EncryptMethod = "aes-256-cfb"

	CookieSID      = ""
	SessionAdminId = ""

	SystemdServiceName = "edge-user"
	UpdatesURL         = "https://goedge.cn/api/boot/versions?os=${os}&arch=${arch}&version=${version}"

	ErrServer = "服务器出了点小问题，请稍后重试"
)
