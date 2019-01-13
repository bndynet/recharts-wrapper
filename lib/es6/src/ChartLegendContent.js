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
import * as React from "react";
import classNames from "classnames";
import { Surface, Symbols } from "recharts";
var ICON_SIZE = 32;
var ChartLegendContent = (function (_super) {
    __extends(ChartLegendContent, _super);
    function ChartLegendContent(props) {
        var _this = _super.call(this, props) || this;
        _this.handleLegendItemClick = function (serie) {
            var _a;
            _this.setState({
                offSeries: __assign({}, _this.state.offSeries, (_a = {}, _a[serie.key] = !_this.state.offSeries[serie.key], _a))
            });
            if (_this.props.onItemClick) {
                _this.props.onItemClick(serie);
            }
        };
        _this.state = {
            offSeries: {}
        };
        return _this;
    }
    ChartLegendContent.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, align = _a.align, iconSize = _a.iconSize;
        return (React.createElement("div", { className: "customized-legend", style: {
                textAlign: align
            } }, this.props.series &&
            this.props.series.map(function (serie, index) {
                var key = serie.key, label = serie.label, color = serie.color;
                var inactive = !!_this.state.offSeries[key];
                var margin = {
                    left: "0 16px 0 0",
                    right: "0 0 0 16px",
                    center: "0 8px 0 8px"
                };
                var itemStyles = {
                    margin: margin[align || "center"],
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center"
                };
                return (React.createElement("span", { key: "legend-item-" + index, className: classNames("recharts-legend-item", inactive && classes && classes.itemInactive), onClick: function () { return _this.handleLegendItemClick(serie); }, style: itemStyles },
                    React.createElement(Surface, { width: iconSize, height: iconSize, viewBox: {
                            x: 0,
                            y: 0,
                            width: ICON_SIZE,
                            height: ICON_SIZE
                        }, style: {
                            marginRight: 4
                        } }, _this.renderIcon(serie, inactive)),
                    React.createElement("span", null, label || key)));
            })));
    };
    ChartLegendContent.prototype.renderIcon = function (serie, inactive) {
        if (inactive === void 0) { inactive = false; }
        var halfSize = ICON_SIZE / 2;
        var sixthSize = ICON_SIZE / 6;
        var thirdSize = ICON_SIZE / 3;
        var color = serie.color;
        if (!serie.legendIconType) {
            if (serie.type === "line") {
                return inactive ? (React.createElement("path", { strokeWidth: 4, fill: "none", stroke: "#9e9e9e", d: "M0," + halfSize + "h" + thirdSize + "\n                                A" + sixthSize + "," + sixthSize + ",0,1,1," + 2 *
                        thirdSize + "," + halfSize + "\n                                H" + ICON_SIZE + "M" + 2 * thirdSize + "," + halfSize + "\n                                A" + sixthSize + "," + sixthSize + ",0,1,1," + thirdSize + "," + halfSize, className: "recharts-legend-icon" })) : (React.createElement("path", { strokeWidth: 4, fill: "none", stroke: color, d: "M0," + halfSize + "h" + thirdSize + "\n                                A" + sixthSize + "," + sixthSize + ",0,1,1," + 2 *
                        thirdSize + "," + halfSize + "\n                                H" + ICON_SIZE + "M" + 2 * thirdSize + "," + halfSize + "\n                                A" + sixthSize + "," + sixthSize + ",0,1,1," + thirdSize + "," + halfSize, className: "recharts-legend-icon" }));
            }
            else {
                return inactive ? (React.createElement("path", { strokeWidth: 4, stroke: color, fill: "none", d: "M0," + sixthSize + "h" + ICON_SIZE + "v" + halfSize + "h" + -ICON_SIZE + "z", className: "recharts-legend-icon" })) : (React.createElement("path", { stroke: "none", fill: color, d: "M0," + sixthSize + "h" + ICON_SIZE + "v" + halfSize + "h" + -ICON_SIZE + "z", className: "recharts-legend-icon" }));
            }
        }
        return inactive ? (React.createElement(Symbols, { fill: "none", strokeWidth: 4, stroke: color, cx: halfSize, cy: halfSize, size: ICON_SIZE - 10, sizeType: "diameter", type: serie.legendIconType || "circle" })) : (React.createElement(Symbols, { fill: color, cx: halfSize, cy: halfSize, size: ICON_SIZE - 10, sizeType: "diameter", type: serie.legendIconType || "circle" }));
    };
    return ChartLegendContent;
}(React.Component));
export { ChartLegendContent };
//# sourceMappingURL=ChartLegendContent.js.map