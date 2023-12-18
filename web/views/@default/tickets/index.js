Tea.context(function () {
	this.createTicket = function () {
		teaweb.popup("/tickets/createPopup", {
			height: "26em",
			callback: function () {
				teaweb.successRefresh("保存成功")
			}
		})
	}
})