import * as React from "react";
import classNames from "classnames";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  Bar,
  Area,
  IconType
} from "recharts";
import { ISerie } from "./serie";
import { ChartLegendContent } from "./ChartLegendContent";

export interface IChartProps {
  classes?: any;
  className?: string;
  data: any[];
  xKey: string;
  series: ISerie[];
  width?: number | string;
  height?: number | string;
  xHeight?: number;
  yWidth?: number;
  legendHeight?: number;
  legendItemIconType?: IconType;
  loadingElement?: React.ReactNode | React.ReactNode[];
  dataSource?: Promise<any[]> | (() => Promise<any[]>);
  onDataSourceError?: (error: any) => void;
  onLegendClick?: (options: any) => void;
}

export interface IChartState {
  loadingDataSource: boolean;
  data: any[];
  offSeries: any;
}

export class Chart extends React.Component<IChartProps, IChartState> {
  constructor(props: IChartProps) {
    super(props);
    this.state = {
      loadingDataSource: false,
      data: this.props.data,
      offSeries: {}
    };
  }
  public componentDidMount() {
    if (this.props.dataSource) {
      const promise =
        typeof this.props.dataSource === "object"
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
  public componentWillReceiveProps(props: IChartProps) {
    if (!this.props.dataSource) {
      this.setState({
        data: props.data
      });
    }
  }
  public render() {
    const { classes } = this.props;
    const height = this.props.height || 320;
    return (
      <div
        className={classNames(classes && classes.root, this.props.className)}
        style={{ width: this.props.width, height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={this.state.data}>
            <XAxis dataKey={this.props.xKey} height={this.props.xHeight} />
            <YAxis
              width={
                this.state.data && this.state.data.length > 0
                  ? this.props.yWidth
                  : 0
              }
            />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            {this.props.data && this.props.data.length > 0 && <Tooltip />}
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
                    itemInactive: classes && classes.legendItemInactive
                  }}
                />
              )}
            />
            {this.props.series &&
              this.props.series.map((serie, index) => {
                if (this.state.offSeries[serie.key]) {
                  return;
                }
                switch (serie.type) {
                  case "area":
                    return (
                      <Area
                        key={index}
                        type={serie.visualizationType || "monotone"}
                        dataKey={serie.key}
                        fill={serie.color}
                        stroke={serie.color}
                      />
                    );
                  case "bar":
                    return (
                      <Bar
                        key={index}
                        dataKey={serie.key}
                        barSize={serie.width || 20}
                        fill={serie.color}
                      />
                    );
                  case "line":
                  default:
                    return (
                      <Line
                        key={index}
                        type={serie.visualizationType || "monotone"}
                        dataKey={serie.key}
                        stroke={serie.color}
                      />
                    );
                }
              })}
          </ComposedChart>
        </ResponsiveContainer>
        {this.state.loadingDataSource && this.props.loadingElement && (
          <div className={classes.loadingBox} style={{ height, width: "100%" }}>
            {this.props.loadingElement}
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
  private onLegentItemClick = (serie: ISerie) => {
    const dataKey = serie.key;
    this.setState({
      offSeries: {
        ...this.state.offSeries,
        [dataKey]: !this.state.offSeries[dataKey]
      }
    });
  };
}
