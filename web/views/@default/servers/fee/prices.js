Tea.context(function () {
	this.setPriceType = function (priceType) {
		this.priceType = priceType
	}

	this.formatGB = function (gb) {
		if (gb == 0) {
			return "∞"
		}
		return teaweb.formatBytes(gb * 1024 * 1024 * 1024)
	}

	this.formatMB = function (mb) {
		if (mb == 0) {
			return "∞"
		}
		return teaweb.formatBits(mb * 1024 * 1024)
	}
})