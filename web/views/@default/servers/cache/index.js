Tea.context(function () {
    this.keyType = "key"

    this.success = NotifyReloadSuccess("任务提交成功")

	this.$delay(function () {
		this.$refs.keysBox.focus()
		this.$watch("keyType", function () {
			this.$refs.keysBox.focus()
		})
	})

    this.isRequesting = false
    this.before = function () {
        this.isRequesting = true
    }

    this.done = function () {
        this.isRequesting = false
    }
})