Tea.context(function () {
	this.$delay(function () {
		this.reloadTopDomainsChart()
	})

	// 域名排行
	this.reloadTopDomainsChart = function () {
		let that = this
		let axis = teaweb.countAxis(this.topDomainStats, function (v) {
			return v.countRequests
		})
		teaweb.renderBarChart({
			id: "top-domains-chart",
			name: "域名",
			values: this.topDomainStats,
			x: function (v) {
				return v.domainName
			},
			tooltip: function (args, stats) {
				return stats[args.dataIndex].domainName + "<br/>请求数：" + " " + teaweb.formatNumber(stats[args.dataIndex].countRequests) + "<br/>流量：" + teaweb.formatBytes(stats[args.dataIndex].bytes)
			},
			value: function (v) {
				return v.countRequests / axis.divider;
			},
			axis: axis,
			click: function (args, stats) {
				window.location = "/ns/domains/domain?domainId=" + stats[args.dataIndex].domainId
			}
		})
	}
})