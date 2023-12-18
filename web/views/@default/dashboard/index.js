Tea.context(function () {
	this.splitFormat = function (format) {
		let result = format.match(/^([0-9.]+)([a-zA-Z]+)$/)
		return [result[1], result[2]]
	}

	this.isLoading = true

	this.dashboard = {}

	this.$delay(function () {
		this.$post("$")
			.success(function (resp) {
				this.isLoading = false

				for (let k in resp.data) {
					this[k] = resp.data[k]
				}

				let bandwidthUnit = this.uiConfig.bandwidthUnit
				if (bandwidthUnit == null || bandwidthUnit.length == 0) {
					bandwidthUnit = "bit"
				}
				if (bandwidthUnit == "bit") {
					this.dashboard.monthlyPeekBandwidthBytes = this.dashboard.monthlyPeekBandwidthBytes.replace("B", "b")
					this.dashboard.dailyPeekBandwidthBytes = this.dashboard.dailyPeekBandwidthBytes.replace("B", "b")
				}

				{
					let pieces = this.splitFormat(this.dashboard.monthlyTrafficBytes)
					this.dashboard.monthlyTrafficBytes = pieces[0]
					this.dashboard.monthlyTrafficBytesUnit = pieces[1]
				}

				{
					let pieces = this.splitFormat(this.dashboard.monthlyPeekBandwidthBytes)
					this.dashboard.monthlyPeekBandwidthBytes = pieces[0]
					this.dashboard.monthlyPeekBandwidthBytesUnit = pieces[1]
				}

				{
					let pieces = this.splitFormat(this.dashboard.dailyTrafficBytes)
					this.dashboard.dailyTrafficBytes = pieces[0]
					this.dashboard.dailyTrafficBytesUnit = pieces[1]
				}

				{
					let pieces = this.splitFormat(this.dashboard.dailyPeekBandwidthBytes)
					this.dashboard.dailyPeekBandwidthBytes = pieces[0]
					this.dashboard.dailyPeekBandwidthBytesUnit = pieces[1]
				}

				this.$delay(function () {
					this.reloadDailyTrafficChart()
					this.reloadDailyPeekBandwidthChart()
				})
			})
	})


	this.reloadDailyTrafficChart = function () {
		let bandwidthUnit = this.uiConfig.bandwidthUnit

		if (!this.uiConfig.showTrafficCharts) {
			return
		}

		let stats = this.dailyTrafficStats
		let hasCacheInfo = false
		let axis = teaweb.bytesAxis(stats, function (stat) {
			if (stat.cachedBytes != null) {
				hasCacheInfo = true
			}
			return stat.bytes
		})
		let series = []
		if (hasCacheInfo) {
			series = [
				{
					name: name,
					type: "line",
					data: stats.map(function (stat) {
						return stat.cachedBytes / axis.divider
					}),
					itemStyle: {
						color: "rgba(97,160,168,0.2)"
					},
					areaStyle: {
						//color: "#61A0A8"
					},
					smooth: true
				}
			]
		}

		teaweb.renderLineChart({
			id: "daily-traffic-chart",
			values: stats,
			axis: axis,
			x: function (stat) {
				return stat.day
			},
			value: function (stat) {
				return stat.bytes / axis.divider
			},
			tooltip: function (args, values) {
				let index = args.dataIndex

				let hasCacheInfo = (stats[index].cachedBytes != null)
				let cachedRatio = 0
				if (hasCacheInfo) {
					cachedRatio = Math.round(stats[index].cachedBytes * 10000 / stats[index].bytes) / 100
				}

				let tooltip = values[index].day + "<br/>流量：" + teaweb.formatBytes(values[index].bytes)
				if (hasCacheInfo) {
					tooltip += "<br/>缓存流量：" + teaweb.formatBytes(values[index].cachedBytes)
					tooltip += "<br/>缓存命中率：" + cachedRatio + "%"
				}
				return tooltip
			},
			series: series
		})
	}

	this.reloadDailyPeekBandwidthChart = function () {
		let bandwidthUnit = this.uiConfig.bandwidthUnit

		if (!this.uiConfig.showBandwidthCharts) {
			return
		}

		let stats = this.dailyPeekBandwidthStats
		let axis = teaweb.bitsAxis(stats, function (stat) {
			let value = stat.bytes
			if (bandwidthUnit == "bit") {
				value *= 8
			}
			return value
		})
		teaweb.renderLineChart({
			id: "daily-peek-bandwidth-chart",
			values: stats,
			axis: axis,
			x: function (stat) {
				return stat.day
			},
			value: function (stat) {
				let value = stat.bytes
				if (bandwidthUnit == "bit") {
					value *= 8
				}
				return value / axis.divider
			},
			tooltip: function (args, values) {
				if (args.componentType == "markLine") {
					return args.name
				}
				let index = args.dataIndex
				let value = values[index].bytes
				if (bandwidthUnit == "bit") {
					value *= 8
				}
				return values[index].day + "<br/>峰值带宽：" + teaweb.formatBits(value)
			},
			left: 30,
			right: 40,
			markLine: {
				precision: 4,
				data: [{
					name: this.bandwidthPercentile + "th",
					yAxis: this.bandwidthPercentileBits / axis.divider
				}],
				symbol: "none",
				lineStyle: {
					color: teaweb.chartColor("red")
				}
			}
		})
	}
})