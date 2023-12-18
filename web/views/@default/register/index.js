Tea.context(function () {
	this.username = ""
	this.password = ""
	this.isSubmitting = false

	this.$delay(function () {
		this.$find("form input[name='username']").focus()
		this.changePassword()
	})

	this.changePassword = function () {
	}

	this.submitBefore = function () {
		this.isSubmitting = true;
	}

	this.submitDone = function () {
		this.isSubmitting = false;
	}

	this.submitSuccess = function (resp) {
		let message = "注册成功，现在去登录"
		teaweb.success(message, function () {
			window.location = "/"
		})
	}
})