import React from "react";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount, render } from "enzyme";
Enzyme.configure({ adapter: new Adapter() });

import { Chart, ISerie } from "../src";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Legend
} from "recharts";
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

// Required because of https://github.com/recharts/recharts/issues/765
// solution at https://reactjs.org/blog/2016/11/16/react-v15.4.0.html#mocking-refs-for-snapshot-testing
function createNodeMock() {
  const doc = document.implementation.createHTMLDocument();
  return { parentElement: doc.body };
}

test("<Chart />", () => {
  const ele = (
    <Chart width={500} height={500} data={data} xKey="name" series={series} />
  );
  // const chart = shallow(ele);
  // const ele = <LineChart width={600} height={300} data={data}
  //     margin={{top: 5, right: 30, left: 20, bottom: 5}}>
  //   <XAxis dataKey="name"/>
  //   <YAxis/>
  //   <CartesianGrid strokeDasharray="3 3"/>
  //   <Tooltip/>
  //   <Legend />
  //   <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
  //   <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
  //   </LineChart>;
  // expect(wrapper.html()).toEqual("Off");
  // const component = renderer.create(ele, {createNodeMock});
  // const instance = component.root;
  // expect(instance.findByType(ChartLegendContent).props.series.length).toBe(3);
  // let html = component.toJSON();
  // expect(html).toMatchSnapshot();
});
