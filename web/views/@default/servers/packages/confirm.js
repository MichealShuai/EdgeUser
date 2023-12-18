Tea.context(function () {
	this.goBack = function () {
		window.history.back()
	}

	this.success = function (resp) {
		if (resp.data.success) {
			teaweb.success("流量包购买成功", function () {
				window.location = "/servers/packages"
			})
			return
		}

		if (resp.data.orderCode.length > 0) {
			window.location = "/finance/pay?code=" + resp.data.orderCode + "&from=" + window.escape(window.location.toString()) + "&returnURL=/servers/packages"
		}
	}

	this.methodCode = "@balance"
	this.changePayMethod = function (methodCode) {
		this.methodCode = methodCode
	}
})