Tea.context(function () {
	this.planId = 0
	this.plan = null
	this.period = "monthly"
	this.fee = 0
	this.planDescription = ""
	this.changePlanId = function (planId) {
		this.planDescription = ""
		if (planId == 0) {
			this.plan = null
		} else {
			this.period = "monthly"

			this.plan = this.plans.$find(function (k, v) {
				return v.id == planId
			})

			if (this.plan != null) {
				this.fee = this.plan.monthlyPrice

				let descriptionItems = []
				if (this.plan.totalServers > 0) {
					descriptionItems.push("网站数限制：" + this.plan.totalServers)
				}
				if (this.plan.totalServerNames > 0) {
					descriptionItems.push("域名数限制：" + this.plan.totalServerNames)
				}
				if (this.plan.totalServerNamesPerServer > 0) {
					descriptionItems.push("单网站域名数限制：" + this.plan.totalServerNamesPerServer)
				}
				if (this.plan.dailyRequests > 0) {
					descriptionItems.push("单日请求数限制：" + teaweb.formatNumber(this.plan.dailyRequests))
				}
				if (this.plan.monthlyRequests > 0) {
					descriptionItems.push("单月请求数限制：" + teaweb.formatNumber(this.plan.monthlyRequests))
				}
				if (descriptionItems.length > 0) {
					this.planDescription = descriptionItems.join("；") + "。"
				}
			}
		}
	}

	this.countMonths = 1
	this.countSeasons = 1
	this.countYears = 1

	this.$delay(function () {
		this.$watch("period", function (period) {
			this.countMonths = 1
			this.countSeasons = 1
			this.countYears = 1

			switch (period) {
				case "monthly":
					this.fee = this.countMonths * this.plan.monthlyPrice
					break
				case "seasonally":
					this.fee = this.countSeasons * this.plan.seasonallyPrice
					break
				case "yearly":
					this.fee = this.countYears * this.plan.yearlyPrice
					break
			}
		})

		this.$watch("countMonths", function (months) {
			let count = parseInt(months)
			if (isNaN(count) || count < 1) {
				count = 1
			}
			this.fee = this.plan.monthlyPrice * count
		})
		this.$watch("countSeasons", function (seasons) {
			let count = parseInt(seasons)
			if (isNaN(count) || count < 1) {
				count = 1
			}
			this.fee = this.plan.seasonallyPrice * count
		})
		this.$watch("countYears", function (years) {
			let count = parseInt(years)
			if (isNaN(count) || count < 1) {
				count = 1
			}
			this.fee = this.plan.yearlyPrice * count
		})
	})
})