Tea.context(function () {
	this.backPreviewURL = ""
	this.frontPreviewURL = ""
	this.isSubmitting = false

	this.realName = ""
	this.number = ""

	if (this.identity != null) {
		this.realName = this.identity.realName
		this.number = this.identity.number
	}
	this.canEdit = (this.identity == null || this.identity.status == "none" || this.identity.status == "rejected")

	this.selectFile = function (targetId) {
		let selector = document.getElementById(targetId)
		selector.click()
	}

	this.changeBackFile = function (e) {
		let files = e.target.files
		if (files.length > 0) {
			this.backPreviewURL = URL.createObjectURL(files[0])
		}
	}

	this.changeFrontFile = function (e) {
		let files = e.target.files
		if (files.length > 0) {
			this.frontPreviewURL = URL.createObjectURL(files[0])
		}
	}

	this.beforeSubmit = function () {
		this.isSubmitting = true
	}

	this.doneSubmit = function () {
		this.isSubmitting = false
	}

	this.success = function () {
		teaweb.success("保存成功", function () {
			teaweb.reload()
		})
	}

	this.submit = function () {
		if (this.identity == null) {
			teaweb.fail("请先保存后再提交审核")
			return
		}
		this.$post(".submit")
			.params({
				identityId: this.identity.id
			})
			.success(function () {
				teaweb.success("提交成功", function () {
					teaweb.reload()
				})
			})
	}

	this.cancel = function () {
		if (this.identity == null) {
			teaweb.fail("请先保存后再提交审核")
			return
		}
		teaweb.confirm("确定要取消提交审核吗？", function () {
			this.$post(".cancel")
				.params({
					identityId: this.identity.id
				})
				.success(function () {
					teaweb.success("取消成功", function () {
						teaweb.reload()
					})
				})
		})
	}
})