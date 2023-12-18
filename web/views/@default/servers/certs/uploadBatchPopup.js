Tea.context(function () {
	this.isRequesting = false

	this.before = function () {
		this.isRequesting = true
	}

	this.done = function () {
		this.isRequesting = false
	}

	this.successUpload = function (resp) {
		let msg = "html:成功上传" + resp.data.count + "个证书"
		teaweb.success(msg, function () {
			NotifyPopup(resp)
		})
	}
})