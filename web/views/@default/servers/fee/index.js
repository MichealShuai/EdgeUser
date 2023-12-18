Tea.context(function () {
	this.updatePriceType = function () {
		teaweb.popup("/servers/fee/updatePriceTypePopup", {
			callback: function () {
				teaweb.success("保存成功", function () {
					window.location.reload()
				})
			}
		})
	}

	this.updatePricePeriod = function () {
		teaweb.popup("/servers/fee/updatePricePeriodPopup", {
			callback: function () {
				teaweb.success("保存成功", function () {
					window.location.reload()
				})
			}
		})
	}
})