Tea.context(function () {
    this.success = NotifyReloadSuccess("任务提交成功")

    this.isRequesting = false
    this.before = function () {
        this.isRequesting = true
    }

    this.done = function () {
        this.isRequesting = false
    }
})