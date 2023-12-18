Tea.context(function () {
	this.isOk = false
	this.errorMessage = ""
	this.rawErrorMessage= ""
	this.isVerifying = false

	this.before = function () {
		this.isOk = false
		this.errorMessage = ""
		this.rawErrorMessage= ""
		this.isVerifying = true
	}

	this.submitSuccess = function (resp) {
		this.isOk = resp.data.isOk
		this.errorMessage = resp.data.message
		this.rawErrorMessage = resp.data.rawErrorMessage

		if (this.isOk) {
			teaweb.success("验证完成", function () {
				window.parent.location.reload()
			})
		}
	}

	this.done = function () {
		this.isVerifying = false
	}
})