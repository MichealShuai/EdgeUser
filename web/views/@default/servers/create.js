Tea.context(function () {
	this.supportHTTPS = false
	this.requestHostType = 0
	this.requestHost = ""

	this.success = function (resp) {
		if (resp.data.hasOSS) {
			NotifySuccess("保存成功", "/servers/server/settings/reverseProxy?serverId=" + resp.data.serverId)()
		} else {
			NotifySuccess("保存成功", "/servers")()
		}
	}

	this.fail = function (resp) {
		let that = this
		teaweb.warn(resp.message, function () {
			if (resp.data.requireServerNames) {
				that.$refs.serverNameBox.addServerName()
			}
		})
	}

	/**
	 * 证书相关
	 */
	this.findServerNames = function () {
		return this.$refs.serverNameBox.allServerNames()
	}
})