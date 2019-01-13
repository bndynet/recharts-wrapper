import { LineType } from "recharts";

export interface ISerie {
  key: string;
  label?: string;
  color?: string;
  width?: number;
  type?: "area" | "line" | "bar";
  legendIconType?:
    | "circle"
    | "cross"
    | "diamond"
    | "square"
    | "star"
    | "triangle"
    | "wye";
  visualizationType?: LineType;
}
