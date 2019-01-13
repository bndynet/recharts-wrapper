import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { render } from "enzyme";
Enzyme.configure({ adapter: new Adapter() });

import { Chart, ISerie } from "../src";
import { ChartLegendContent } from "../src/ChartLegendContent";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];

const series: ISerie[] = [
  { key: "uv", color: "#82ca9d", type: "bar" },
  { key: "pv", color: "#8884d8", type: "area" },
  { key: "amt", color: "#ff0000", type: "line", legendIconType: "circle" }
];

describe("<ChartLegendContent />", () => {
  let wrapper: Cheerio;

  beforeEach(() => {
    wrapper = render(<ChartLegendContent series={series} iconSize={14} />);
  });

  test("Should render three legend items", () => {
    expect(wrapper.find(".recharts-legend-item").length).toEqual(3);
  });
});
