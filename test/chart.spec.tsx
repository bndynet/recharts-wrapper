import React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { Legend } from "recharts";
import { Chart, ChartLegendContent } from "../src/recharts-wrapper";
import { chartData, chartSeries } from "./_data";

describe("Comp: Chart", () => {
    const fnLegendClick = jest.fn();
    let mountedWrapper: ReactWrapper;
    let shallowrapper: ShallowWrapper;

    beforeAll(() => {
        const d = new Promise<any[]>((resolve, reject) => {
            setTimeout(() => {
                resolve([]);
            }, 500);
        });
        const ele = (
            <Chart
                width={500}
                height={500}
                data={chartData}
                xKey="name"
                series={chartSeries}
                dataSource={d}
                onLegendClick={fnLegendClick}
            />
        );
        mountedWrapper = mount(ele);
        shallowrapper = shallow(ele);
    });

    it("should render a ChartLegendContent component", () => {
        expect(mountedWrapper.find(ChartLegendContent).length).toEqual(1);
    });

    it("should render the result if dataSource property specified", () => {
        setTimeout(() => {
            expect(mountedWrapper.state<any[]>("data").length).toEqual(0);
        }, 1000);
    });

    it("should trigger the click event when Legend clicked", () => {
        shallowrapper.find(Legend).simulate("click");
        expect(fnLegendClick.mock.calls.length).toBe(1);
    });
});
