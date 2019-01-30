import * as React from "react";
import classNames from "classnames";
import randomColor from "randomcolor";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ComposedChart, Bar, Area, Cell, IconType, ResponsiveContainer, PieChart, Pie } from "recharts";
import { Serie } from "./Serie";
import { ChartLegendContent } from "./ChartLegendContent";

export interface ChartProps {
    classes?: {
        root?: any;
        loadingElement?: any;
        legendItemInactive?: any;
    };
    className?: string;
    type?: "area" | "line" | "bar" | "pie";
    data: any[];
    series: Serie[];
    xKey?: string;
    width?: number | string;
    height?: number | string;
    xHeight?: number;
    yWidth?: number;
    hideLegend?: boolean;
    legendHeight?: number;
    legendItemIconType?: IconType;
    loadingElement?: React.ReactNode | React.ReactNode[];
    dataSource?: Promise<any[]> | (() => Promise<any[]>);
    onDataSourceError?: (error: any) => void;
    onLegendClick?: (options: any) => void;
}

export interface ChartState {
    loadingDataSource: boolean;
    data: any[];
    offSeries: any;
}

export class Chart extends React.Component<ChartProps, ChartState> {
    constructor(props: ChartProps) {
        super(props);
        this.state = {
            loadingDataSource: false,
            data: this.props.data,
            offSeries: {},
        };
    }
    public componentDidMount() {
        if (this.props.dataSource) {
            const promise = typeof this.props.dataSource === "object" ? this.props.dataSource : this.props.dataSource();
            this.setState({
                loadingDataSource: true,
            });
            promise
                .then(result => {
                    this.setState({
                        data: result,
                        loadingDataSource: false,
                    });
                })
                .catch(error => {
                    this.setState({
                        loadingDataSource: false,
                    });
                    if (this.props.onDataSourceError) {
                        this.props.onDataSourceError(error);
                    }
                });
        }
    }
    public componentWillReceiveProps(props: ChartProps) {
        if (!this.props.dataSource) {
            this.setState({
                data: props.data,
            });
        }
    }
    public render() {
        const { classes } = this.props;
        const height = this.props.height || 320;
        const loadingElementStyles: React.CSSProperties = {
            position: "absolute",
            top: 0,
            display: "flex",
            alignItems: "center",
            height,
            width: "100%",
            textAlign: "center",
        };

        if (randomColor) {
            this.props.series.forEach(serie => {
                if (!serie.color) {
                    serie.color = randomColor();
                }
                if (this.props.type && !serie.type) {
                    serie.type = this.props.type;
                }
            });
        }

        return (
            <div
                className={classNames(classes && classes.root, this.props.className)}
                style={{
                    position: "relative",
                    width: this.props.width,
                    height,
                }}
            >
                {this.props.type !== "pie" && this.renderCromposedChart()}
                {this.props.type === "pie" && this.renderPieChart()}
                {this.state.loadingDataSource && this.props.loadingElement && (
                    <div className={classNames(classes && classes.loadingElement)} style={loadingElementStyles}>
                        <div style={{ flex: 1 }}>{this.props.loadingElement}</div>
                    </div>
                )}
            </div>
        );
    }

    private onLegendClick = (options: any) => {
        if (this.props.onLegendClick) {
            this.props.onLegendClick(options);
        }
    };

    private onLegentItemClick = (serie: Serie) => {
        const dataKey = serie.key;
        this.setState({
            offSeries: {
                ...this.state.offSeries,
                [dataKey]: !this.state.offSeries[dataKey],
            },
        });
    };

    private renderCromposedChart = () => {
        const { classes } = this.props;
        return (
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={this.state.data}>
                    <XAxis dataKey={this.props.xKey} height={this.props.xHeight} />
                    <YAxis width={this.state.data && this.state.data.length > 0 ? this.props.yWidth : 0} />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    {this.props.data && this.props.data.length > 0 && <Tooltip />}
                    {!this.props.hideLegend &&
                        <Legend
                            height={this.props.legendHeight || 45}
                            iconType={this.props.legendItemIconType || "square"}
                            onClick={this.onLegendClick}
                            content={props => (
                                <ChartLegendContent
                                    {...props}
                                    series={this.props.series}
                                    onItemClick={this.onLegentItemClick}
                                    classes={{
                                        itemInactive: classes && classes.legendItemInactive,
                                    }}
                                />
                            )}
                        />
                    }
                    {this.props.series &&
                        this.props.series.map((serie, index) => {
                            if (this.state.offSeries[serie.key]) {
                                return;
                            }
                            switch (serie.type) {
                                case "area":
                                    return <Area key={index} type={serie.visualizationType || "monotone"} dataKey={serie.key} fill={serie.color} stroke={serie.color} />;
                                case "bar":
                                    return <Bar key={index} dataKey={serie.key} barSize={serie.width || 20} fill={serie.color} />;
                                case "line":
                                default:
                                    return <Line key={index} type={serie.visualizationType || "monotone"} dataKey={serie.key} stroke={serie.color} />;
                            }
                        })}
                </ComposedChart>
            </ResponsiveContainer>
        );
    };

    private renderPieChart = () => {
        // const { classes } = this.props;
        const count = this.props.data.length;
        const colored = count === 1;
        const itemWidthUnit = 100 / count;
        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };

        return (
            <PieChart width={730} height={250}>
                {this.props.data &&
                    this.props.data.map((d, index) => {
                        const serie = this.props.series[index];
                        const innerRadius = index === 0 ? 0 : itemWidthUnit * index * 1.2 + "%";
                        const outerRadius = index === 0 ? itemWidthUnit + "%" : itemWidthUnit * index * 1.5 + "%";
                        return (
                            <Pie key={index} data={d} dataKey={serie.key} cx="50%" cy="50%" labelLine={index > 0}
                                label={index === 0 ? renderCustomizedLabel : true} activeIndex={index} innerRadius={innerRadius} outerRadius={outerRadius}>
                                {colored &&
                                    d.map((entry: any, dIndex: number) => {
                                        return <Cell key={dIndex} fill={randomColor()} />;
                                    })}
                                {!colored &&
                                    d.map((entry: any, dIndex: number) => {
                                        return <Cell key={dIndex} fill={serie.color} />;
                                    })}
                            </Pie>
                        );
                    })}
                {!this.props.hideLegend && <Legend />}
                <Tooltip />
            </PieChart>
        );
    };
}
