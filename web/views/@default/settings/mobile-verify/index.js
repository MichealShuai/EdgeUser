Tea.context(function () {
	this.mobileIsValid = false
	this.newMobile = ""
	this.isSending = false
	this.isSent = false

	this.code = ""
	this.codeIsValid = false

	this.changeMobile = function () {
		this.mobileIsValid = this.newMobile.match(/^1\d{10}$/)
	}

	this.beforeSend = function () {
		this.isSending = true
	}

	this.doneSend = function () {
		this.isSending = false
	}

	this.success = function () {
		this.isSent = true
		let that = this
		teaweb.success("已将验证码短信发送到你的手机中，请在" + this.smsLife + "内完成验证", function () {
			that.$refs.smsCodeRef.focus()
		})
	}

	this.changeCode = function () {
		this.codeIsValid = this.code.length == this.smsCodeLength && this.code.match(/^\d+$/)
	}

	this.verifySuccess = function () {
		teaweb.success("验证成功", function () {
			window.location = Tea.url("/settings/mobile-verify?viewOnly=1")
		})
	}
})