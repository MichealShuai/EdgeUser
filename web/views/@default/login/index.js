Tea.context(function () {
	this.username = "";
	this.password = "";
	this.passwordMd5 = "";
	this.encodedFrom = window.encodeURIComponent(this.from);

	this.showOTP = false

	this.isSubmitting = false

	this.$delay(function () {
		this.$find("form input[name='username']").focus();
		this.changePassword();
	})

	this.usernamePlaceholder = "请输入用户名"
	var loginMethods = []
	if (this.emailCanLogin) {
		loginMethods.push("邮箱")
	}
	if (this.mobileCanLogin) {
		loginMethods.push("手机号码")
	}
	if (loginMethods.length > 0) {
		this.usernamePlaceholder += "/" + loginMethods.join("/")
	}

	this.changeUsername = function () {
		this.$post("/checkOTP")
			.params({
				username: this.username
			})
			.success(function (resp) {
				this.showOTP = resp.data.requireOTP
			})
	}

	this.changePassword = function () {
		this.passwordMd5 = md5(this.password.trim());
	}

	// 更多选项
	this.moreOptionsVisible = false;
	this.showMoreOptions = function () {
		this.moreOptionsVisible = !this.moreOptionsVisible;
	}

	this.submitBefore = function () {
		this.isSubmitting = true;
	}

	this.submitDone = function () {
		this.isSubmitting = false;
	}

	this.submitSuccess = function () {
		if (this.from.length == 0) {
			window.location = "/dashboard";
		} else {
			window.location = this.from;
		}
	}
})