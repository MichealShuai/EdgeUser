Tea.context(function () {
	this.deleteServer = function (serverId) {
		let that = this
		teaweb.confirm("确定要删除此网站吗？", function () {
			that.$post(".delete")
				.params({
					serverId: serverId
				})
				.refresh()
		})
	}

	this.updateServerOn = function (serverId) {
		let that = this
		teaweb.confirm("确定要启用此网站吗？", function () {
			that.$post(".updateOn")
				.params({
					serverId: serverId,
					isOn: true
				})
				.refresh()
		})
	}

	this.updateServerOff = function (serverId) {
		let that = this
		teaweb.confirm("确定要停用此网站吗？", function () {
			that.$post(".updateOn")
				.params({
					serverId: serverId,
					isOn: false
				})
				.refresh()
		})
	}
})