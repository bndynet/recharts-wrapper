import React from "react";
import { shallow, mount } from "enzyme";
import { Legend, PieChart, Cell, Pie } from "recharts";
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

    it("should render a pie chart with one circle", () => {
        const data = [[{ name: "A1", value: 100 },]];
        const series = [{ key: "value" }];
        const wrapper = shallow(<Chart
            width={500}
            type="pie"
            data={data}
            series={series}
        />);
        expect(wrapper.find(Pie).length).toBe(1);
    });

    it("should render a pie chart with two circle", () => {
        const data = [[{ name: "Group A", value: 400 }, { name: "Group B", value: 300 }, { name: "Group C", value: 300 }, { name: "Group D", value: 200 }], [{ name: "A1", value: 100 }, { name: "A2", value: 300 }, { name: "B1", value: 100 }, { name: "B2", value: 80 }, { name: "B3", value: 40 }, { name: "B4", value: 30 }, { name: "B5", value: 50 }, { name: "C1", value: 100 }, { name: "C2", value: 200 }, { name: "D1", value: 150 }, { name: "D2", value: 50 }]];
        const series = [{ key: "value", color: "#ff0000"}, { key: "value" }];
        const wrapper = shallow(<Chart
            width={500}
            type="pie"
            data={data}
            series={series}
        />);
        const Label = wrapper.find(Pie).first().prop("label");
        const props = wrapper.find(Pie).first().props();
        expect(shallow(<Label {...props}/>).instance).not.toBe(null);
        expect(wrapper.find(Pie).length).toBe(2);
    });

});
