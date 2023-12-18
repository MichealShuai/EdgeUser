Tea.context(function () {
	this.$delay(function () {
		let input = this.$refs.focus
		if (input != null) {
			input.focus()
		}
	})

	this.nameOrEmail = ""
	this.isSent = false
	this.email = ""
	this.action = "send"

	this.before = function () {

	}

	this.success = function (resp) {
		if (this.action == "send") {
			this.isSent = true
			this.action = "update"
			this.email = resp.data.email
			this.$delay(function () {
				this.$refs.verifyCodeInput.focus()
			})
		} else if (this.action == "update") {
			teaweb.success("你已成功设置了新密码，现在去登录", function () {
				window.location = "/"
			})
		}
	}
})