Tea.context(function () {
	this.targetType = ""
	this.countServers = -1

	this.targets = []

	this.reloadCountServers = function () {
		this.countServers = -1
		this.$post(".countServers")
			.params({
				"targets": this.targets
			})
			.success(function (resp) {
				this.countServers = resp.data.countServers
			})
	}

	this.changeTargetType = function () {
		this.targets = []
		this.countServers = -1
		if (this.targetType.match(/^(user):/)) {
			this.targets = [this.targetType]
			this.reloadCountServers()
		}
	}

	let groupIds = []
	this.changeGroupId = function (groupId) {
		if (groupIds.$contains(groupId)) {
			groupIds.$removeValue(groupId)
		} else {
			groupIds.push(groupId)
		}
		if (groupIds.length > 0) {
			this.targets = ["groups:" + groupIds.join(",")]
			this.reloadCountServers()
		} else {
			this.targets = []
			this.countServers = -1
		}
	}

	this.isRequesting = false
	this.before = function () {
		this.isRequesting = true
	}

	this.done = function () {
		this.isRequesting = false
	}
})