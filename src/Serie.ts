import { LineType } from "recharts";

export interface Serie {
    key: string;
    label?: string;
    color?: string;
    width?: number;
    type?: "area" | "line" | "bar" | "pie";
    legendIconType?: "circle" | "cross" | "diamond" | "square" | "star" | "triangle" | "wye";
    visualizationType?: LineType;
}
