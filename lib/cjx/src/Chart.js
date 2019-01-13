"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var recharts_1 = require("recharts");
var ChartLegendContent_1 = require("./ChartLegendContent");
var Chart = (function (_super) {
    __extends(Chart, _super);
    function Chart(props) {
        var _this = _super.call(this, props) || this;
        _this.onLegendClick = function (options) {
            if (_this.props.onLegendClick) {
                _this.props.onLegendClick(options);
            }
        };
        _this.onLegentItemClick = function (serie) {
            var _a;
            var dataKey = serie.key;
            _this.setState({
                offSeries: __assign({}, _this.state.offSeries, (_a = {}, _a[dataKey] = !_this.state.offSeries[dataKey], _a))
            });
        };
        _this.state = {
            loadingDataSource: false,
            data: _this.props.data,
            offSeries: {}
        };
        return _this;
    }
    Chart.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.dataSource) {
            var promise = typeof this.props.dataSource === "object"
                ? this.props.dataSource
                : this.props.dataSource();
            this.setState({
                loadingDataSource: true
            });
            promise
                .then(function (result) {
                _this.setState({
                    data: result,
                    loadingDataSource: false
                });
            })
                .catch(function (error) {
                _this.setState({
                    loadingDataSource: false
                });
                if (_this.props.onDataSourceError) {
                    _this.props.onDataSourceError(error);
                }
            });
        }
    };
    Chart.prototype.componentWillReceiveProps = function (props) {
        if (!this.props.dataSource) {
            this.setState({
                data: props.data
            });
        }
    };
    Chart.prototype.render = function () {
        var _this = this;
        var classes = this.props.classes;
        var height = this.props.height || 320;
        return (React.createElement("div", { className: classnames_1.default(classes && classes.root, this.props.className), style: { width: this.props.width, height: height } },
            React.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: "100%" },
                React.createElement(recharts_1.ComposedChart, { data: this.state.data },
                    React.createElement(recharts_1.XAxis, { dataKey: this.props.xKey, height: this.props.xHeight }),
                    React.createElement(recharts_1.YAxis, { width: this.state.data && this.state.data.length > 0
                            ? this.props.yWidth
                            : 0 }),
                    React.createElement(recharts_1.CartesianGrid, { vertical: false, strokeDasharray: "3 3" }),
                    this.props.data && this.props.data.length > 0 && React.createElement(recharts_1.Tooltip, null),
                    React.createElement(recharts_1.Legend, { height: this.props.legendHeight || 45, iconType: this.props.legendItemIconType || "square", onClick: this.onLegendClick, content: function (props) { return (React.createElement(ChartLegendContent_1.ChartLegendContent, __assign({}, props, { series: _this.props.series, onItemClick: _this.onLegentItemClick, classes: {
                                itemInactive: classes && classes.legendItemInactive
                            } }))); } }),
                    this.props.series &&
                        this.props.series.map(function (serie, index) {
                            if (_this.state.offSeries[serie.key]) {
                                return;
                            }
                            switch (serie.type) {
                                case "area":
                                    return (React.createElement(recharts_1.Area, { key: index, type: serie.visualizationType || "monotone", dataKey: serie.key, fill: serie.color, stroke: serie.color }));
                                case "bar":
                                    return (React.createElement(recharts_1.Bar, { key: index, dataKey: serie.key, barSize: serie.width || 20, fill: serie.color }));
                                case "line":
                                default:
                                    return (React.createElement(recharts_1.Line, { key: index, type: serie.visualizationType || "monotone", dataKey: serie.key, stroke: serie.color }));
                            }
                        }))),
            this.state.loadingDataSource && this.props.loadingElement && (React.createElement("div", { className: classes.loadingBox, style: { height: height, width: "100%" } }, this.props.loadingElement))));
    };
    return Chart;
}(React.Component));
exports.Chart = Chart;
//# sourceMappingURL=Chart.js.map