Tea.context(function () {
	this.isPaying = false

	if (this.returnURL.length == 0) {
		this.returnURL = "/finance"
	}

	// 自动刷新页面
	this.$delay(function () {
		if (!this.isPaying) {
			window.location.reload()
		}
	}, 600 * 1000)

	this.goPay = function () {
		this.isPaying = true
	}

	this.cancel = function () {
		this.isPaying = false
	}
})