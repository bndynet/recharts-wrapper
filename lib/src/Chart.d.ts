import * as React from "react";
import { IconType } from "recharts";
import { ISerie } from "../typings/serie";
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
export declare class Chart extends React.Component<IChartProps, IChartState> {
    constructor(props: IChartProps);
    componentDidMount(): void;
    componentWillReceiveProps(props: IChartProps): void;
    render(): JSX.Element;
    private onLegendClick;
    private onLegentItemClick;
}
