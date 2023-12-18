Tea.context(function () {
	this.serverType = this.serverTypes[0].code

	this.enableTCP = false
	this.enableTLS = false
	this.enableUDP = false

	this.family = ""

	this.changeServerType = function () {
		switch (this.serverType) {
			case "tcpProxy":
				this.family = "tcp"
				break
			case "udpProxy":
				this.family = "udp"
				break
		}
		if (this.$refs != null) {
			this.$refs.originInputBox.changeFamily(this.family)
		}
	}

	this.changeServerType()

	this.success = NotifySuccess("保存成功", "/lb")
})