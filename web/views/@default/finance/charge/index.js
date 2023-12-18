Tea.context(function () {
	this.methodCode = 0
	if (this.methods.length > 0) {
		this.methodCode = this.methods[0].code
	}

	this.selectMethod = function (method) {
		this.methodCode = method.code
	}

	this.success = function (resp) {
		window.location = "/finance/pay?code=" + resp.data.code + "&from=" + this.currentURL
	}
})