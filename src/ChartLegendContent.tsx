import * as React from "react";
import classNames from "classnames";
import { LegendProps, Surface, Symbols } from "recharts";

import { ISerie } from "./serie";

const ICON_SIZE = 32;

export interface IChartLegendContentProps extends LegendProps {
  classes?: { itemInactive: string };
  series: ISerie[];
  onItemClick?: (serie: ISerie) => void;
}

export class ChartLegendContent extends React.Component<
  IChartLegendContentProps,
  {
    offSeries: any;
  }
> {
  constructor(props: IChartLegendContentProps) {
    super(props);
    this.state = {
      offSeries: {}
    };
  }

  public render() {
    const { classes, align, iconSize } = this.props;
    return (
      <div
        className="customized-legend"
        style={{
          textAlign: align
        }}
      >
        {this.props.series &&
          this.props.series.map((serie, index) => {
            const { key, label, color } = serie;
            const inactive = !!this.state.offSeries[key];
            const margin = {
              left: `0 16px 0 0`,
              right: `0 0 0 16px`,
              center: `0 8px 0 8px`
            };
            const itemStyles = {
              margin: margin[align || "center"],
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center"
            };

            return (
              <span
                key={`legend-item-${index}`}
                className={classNames(
                  "recharts-legend-item",
                  inactive && classes && classes.itemInactive
                )}
                onClick={() => this.handleLegendItemClick(serie)}
                style={itemStyles}
              >
                <Surface
                  width={iconSize}
                  height={iconSize}
                  viewBox={{
                    x: 0,
                    y: 0,
                    width: ICON_SIZE,
                    height: ICON_SIZE
                  }}
                  style={{
                    marginRight: 4
                  }}
                >
                  {this.renderIcon(serie, inactive)}
                </Surface>
                <span>{label || key}</span>
              </span>
            );
          })}
      </div>
    );
  }
  private handleLegendItemClick = (serie: ISerie) => {
    this.setState({
      offSeries: {
        ...this.state.offSeries,
        [serie.key]: !this.state.offSeries[serie.key]
      }
    });
    if (this.props.onItemClick) {
      this.props.onItemClick(serie);
    }
  };
  private renderIcon(serie: ISerie, inactive: boolean = false) {
    const halfSize = ICON_SIZE / 2;
    const sixthSize = ICON_SIZE / 6;
    const thirdSize = ICON_SIZE / 3;
    const color = serie.color;
    if (!serie.legendIconType) {
      if (serie.type === "line") {
        // show line as the legend icon
        return inactive ? (
          <path
            strokeWidth={4}
            fill="none"
            stroke={"#9e9e9e"}
            d={`M0,${halfSize}h${thirdSize}
                                A${sixthSize},${sixthSize},0,1,1,${2 *
              thirdSize},${halfSize}
                                H${ICON_SIZE}M${2 * thirdSize},${halfSize}
                                A${sixthSize},${sixthSize},0,1,1,${thirdSize},${halfSize}`}
            className="recharts-legend-icon"
          />
        ) : (
          <path
            strokeWidth={4}
            fill="none"
            stroke={color}
            d={`M0,${halfSize}h${thirdSize}
                                A${sixthSize},${sixthSize},0,1,1,${2 *
              thirdSize},${halfSize}
                                H${ICON_SIZE}M${2 * thirdSize},${halfSize}
                                A${sixthSize},${sixthSize},0,1,1,${thirdSize},${halfSize}`}
            className="recharts-legend-icon"
          />
        );
      } else {
        // for area, bar show rect legend
        return inactive ? (
          <path
            strokeWidth={4}
            stroke={color}
            fill="none"
            d={`M0,${sixthSize}h${ICON_SIZE}v${halfSize}h${-ICON_SIZE}z`}
            className="recharts-legend-icon"
          />
        ) : (
          <path
            stroke="none"
            fill={color}
            d={`M0,${sixthSize}h${ICON_SIZE}v${halfSize}h${-ICON_SIZE}z`}
            className="recharts-legend-icon"
          />
        );
      }
    }
    return inactive ? (
      <Symbols
        fill="none"
        strokeWidth={4}
        stroke={color}
        cx={halfSize}
        cy={halfSize}
        size={ICON_SIZE - 10}
        sizeType="diameter"
        type={serie.legendIconType || "circle"}
      />
    ) : (
      <Symbols
        fill={color}
        cx={halfSize}
        cy={halfSize}
        size={ICON_SIZE - 10}
        sizeType="diameter"
        type={serie.legendIconType || "circle"}
      />
    );
  }
}
