Tea.context(function () {
	this.isUpdating = false

	this.success = NotifyReloadSuccess("保存成功")

	this.update = function () {
		this.isUpdating = !this.isUpdating
	}

	this.newUserPlanId = 0
	this.newUserPlan = null
	this.newUserPlanDescription = ""
	this.newUserPlanLimit = ""

	let changePlanRequestId = ""

	this.changeUserPlan = function () {
		this.newUserPlan = null
		this.newUserPlanDescription = ""
		this.newUserPlanLimit = ""
		if (this.newUserPlanId == 0) {
			return
		}
		let that = this
		this.newUserPlan = this.userPlans.find(function (v) {
			return v.id == that.newUserPlanId
		})
		if (this.newUserPlan != null) {
			changePlanRequestId = Math.random().toString()
			var requestId = changePlanRequestId

			this.$post(".data")
				.params({
					serverId: this.serverId,
					userPlanId: this.newUserPlanId
				})
				.success(function (resp) {
					// check request
					if (requestId != changePlanRequestId) {
						return
					}

					let quotaInfo = resp.data
					let descriptionItems = []
					if (quotaInfo.servers.max > 0) {
						descriptionItems.push("网站数限制：" + quotaInfo.servers.current + "+1/" + quotaInfo.servers.max)
						if (!quotaInfo.servers.isValid) {
							this.newUserPlanLimit = "已绑定网站数超出当前套餐限制"
						}
					}
					if (quotaInfo.allServerNames.max > 0) {
						descriptionItems.push("域名数限制：" + quotaInfo.allServerNames.current + "+" + quotaInfo.serverNames.current + "/" + quotaInfo.allServerNames.max)
						if (!quotaInfo.allServerNames.isValid) {
							this.newUserPlanLimit = "已绑定域名数超出当前套餐限制"
						}
					}
					if (quotaInfo.serverNames.max > 0) {
						descriptionItems.push("单网站域名数限制：+" + quotaInfo.serverNames.current + "/" + quotaInfo.serverNames.max)
						if (!quotaInfo.serverNames.isValid) {
							this.newUserPlanLimit = "当前网站域名数超出当前套餐限制"
						}
					}
					if (descriptionItems.length > 0) {
						this.newUserPlanDescription = descriptionItems.join("；") + "。"
					}
				})
		}
	}
})