Tea.context(function () {
	this.enable = function () {
		teaweb.confirm("确定要启用多因子认证吗？", function () {
			this.$post(".enable")
				.success(function () {
					teaweb.reload()
				})
		})
	}

	this.disable = function () {
		teaweb.confirm("确定要停用多因子认证吗？", function () {
			this.$post(".disable")
				.success(function () {
					teaweb.reload()
				})
		})
	}
})