import React from "react";
import { shallow } from "enzyme";
import { Legend } from "recharts";
import { Chart } from "../src/Chart";
import { chartData, chartSeries } from "./_data";
import { ChartLegendContent } from '../src/ChartLegendContent';

describe("Comp: Chart", () => {
    it("should render ChartLegendContent", () => {
        const wrapper = shallow(<Chart
            width={500}
            height={500}
            data={chartData}
            xKey="name"
            series={chartSeries}
        />);
        expect((wrapper.find(Legend).first().prop("content") as any)().type).toBe(ChartLegendContent);
    });

    it("should toggle the series when Legend item clicked", () => {
        const wrapper = shallow(<Chart
            width={500}
            height={500}
            data={chartData}
            xKey="name"
            series={chartSeries}
        />);
        wrapper.find(Legend).dive().find(ChartLegendContent).dive().find(".recharts-legend-item").first().simulate("click");
        expect(Object.keys(wrapper.state("offSeries")).length).toBe(1);
    });

    it("should render the result if dataSource property specified", async () => {
        const promise = new Promise<any[]>((resolve, reject) => {
            setTimeout(() => {
                resolve([]);
            }, 100);
        });
        const wrapper = shallow(<Chart
            width={500}
            height={500}
            data={chartData}
            xKey="name"
            series={chartSeries}
            dataSource={promise}
        />);
        await promise;
        setTimeout(() => {
            expect(wrapper.state<any[]>("data").length).toEqual(0);
            expect(wrapper.state("loadingDataSource")).toBe(false);
        }, 200);
    });

    it("should render the result using data property if no dataSource property specified", () => {
        const wrapper = shallow(<Chart
            width={500}
            height={500}
            data={chartData}
            xKey="name"
            series={chartSeries}
        />);
        wrapper.setProps({
            data: [],
        });
        expect(wrapper.state<any[]>("data").length).toEqual(0);
    });

    it("should trigger the click event when Legend clicked", () => {
        const fnLegendClick = jest.fn();
        const wrapper = shallow(<Chart
            width={500}
            height={500}
            data={chartData}
            xKey="name"
            series={chartSeries}
            onLegendClick={fnLegendClick}
        />);
        wrapper.find(Legend).simulate("click");
        expect(fnLegendClick.mock.calls.length).toBe(1);
    });

    it("should handle the exceptions when dataSource property specified and errors occurred", async () => {
        const errorPromise = () => Promise.reject("error");
        const errorFn = jest.fn();
        shallow(<Chart
            width={500}
            data={chartData}
            xKey="name"
            series={chartSeries}
            dataSource={errorPromise}
            onDataSourceError={errorFn}
            classes={{
                root: "test",
                legendItemInactive: "test",
            }}
        />);
        await errorPromise;
        setTimeout(() => {
            expect(errorFn.mock.calls.length).toBe(1);
        }, 200);
    });
});
