import * as React from "react";
import classNames from "classnames";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ComposedChart, Bar, Area } from "recharts";
import { ChartLegendContent } from "./ChartLegendContent";
export class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.onLegendClick = (options) => {
            if (this.props.onLegendClick) {
                this.props.onLegendClick(options);
            }
        };
        this.onLegentItemClick = (serie) => {
            const dataKey = serie.key;
            this.setState({
                offSeries: Object.assign({}, this.state.offSeries, { [dataKey]: !this.state.offSeries[dataKey] })
            });
        };
        this.state = {
            loadingDataSource: false,
            data: this.props.data,
            offSeries: {}
        };
    }
    componentDidMount() {
        if (this.props.dataSource) {
            const promise = typeof this.props.dataSource === "object"
                ? this.props.dataSource
                : this.props.dataSource();
            this.setState({
                loadingDataSource: true
            });
            promise
                .then(result => {
                this.setState({
                    data: result,
                    loadingDataSource: false
                });
            })
                .catch(error => {
                this.setState({
                    loadingDataSource: false
                });
                if (this.props.onDataSourceError) {
                    this.props.onDataSourceError(error);
                }
            });
        }
    }
    componentWillReceiveProps(props) {
        if (!this.props.dataSource) {
            this.setState({
                data: props.data
            });
        }
    }
    render() {
        const { classes } = this.props;
        const height = this.props.height || 320;
        return (React.createElement("div", { className: classNames(classes && classes.root, this.props.className), style: { width: this.props.width, height } },
            React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
                React.createElement(ComposedChart, { data: this.state.data },
                    React.createElement(XAxis, { dataKey: this.props.xKey, height: this.props.xHeight }),
                    React.createElement(YAxis, { width: this.state.data && this.state.data.length > 0
                            ? this.props.yWidth
                            : 0 }),
                    React.createElement(CartesianGrid, { vertical: false, strokeDasharray: "3 3" }),
                    this.props.data && this.props.data.length > 0 && React.createElement(Tooltip, null),
                    React.createElement(Legend, { height: this.props.legendHeight || 45, iconType: this.props.legendItemIconType || "square", onClick: this.onLegendClick, content: props => (React.createElement(ChartLegendContent, Object.assign({}, props, { series: this.props.series, onItemClick: this.onLegentItemClick, classes: {
                                itemInactive: classes && classes.legendItemInactive
                            } }))) }),
                    this.props.series &&
                        this.props.series.map((serie, index) => {
                            if (this.state.offSeries[serie.key]) {
                                return;
                            }
                            switch (serie.type) {
                                case "area":
                                    return (React.createElement(Area, { key: index, type: serie.visualizationType || "monotone", dataKey: serie.key, fill: serie.color, stroke: serie.color }));
                                case "bar":
                                    return (React.createElement(Bar, { key: index, dataKey: serie.key, barSize: serie.width || 20, fill: serie.color }));
                                case "line":
                                default:
                                    return (React.createElement(Line, { key: index, type: serie.visualizationType || "monotone", dataKey: serie.key, stroke: serie.color }));
                            }
                        }))),
            this.state.loadingDataSource && this.props.loadingElement && (React.createElement("div", { className: classes.loadingBox, style: { height, width: "100%" } }, this.props.loadingElement))));
    }
}
//# sourceMappingURL=Chart.js.map