import * as React from "react";
import { LegendProps } from "recharts";
import { ISerie } from "../typings/serie";
export interface IChartLegendContentProps extends LegendProps {
    classes?: {
        itemInactive: string;
    };
    series: ISerie[];
    onItemClick?: (serie: ISerie) => void;
}
export declare class ChartLegendContent extends React.Component<
    IChartLegendContentProps,
    {
        offSeries: any;
    }
> {
    constructor(props: IChartLegendContentProps);
    render(): JSX.Element;
    private handleLegendItemClick;
    private renderIcon;
}
