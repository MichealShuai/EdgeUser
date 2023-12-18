Tea.context(function () {
	this.period = "yearly"

	this.success = function (resp) {
		if (resp.data.success) {
			teaweb.success("套餐购买成功", function () {
				window.location = "/ns/plans"
			})
			return
		}

		if (resp.data.orderCode.length > 0) {
			window.location = "/finance/pay?code=" + resp.data.orderCode + "&from=" + window.escape(window.location.toString()) + "&returnURL=/ns/plans"
		}
	}

	this.methodCode = "@balance"
	this.changePayMethod = function (methodCode) {
		this.methodCode = methodCode
	}
})