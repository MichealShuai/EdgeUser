Tea.context(function () {
	this.createRoute = function () {
		teaweb.popup("/ns/routes/createPopup", {
			width: "50em",
			height: "30em",
			callback: function () {
				teaweb.success("保存成功", function () {
					window.location = "/ns/routes"
				})
			}
		})
	}

	this.selectedType = "isp"

	this.selectRouteType = function (routeType) {
		this.selectedType = routeType
	}
})