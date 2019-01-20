import React from "react";
import { render, mount, ReactWrapper } from "enzyme";
import { ChartLegendContent } from "../src/ChartLegendContent";
import { chartSeries} from "./_data";

describe("Comp: ChartLegendContent", () => {
  let wrapper: Cheerio;

  beforeEach(() => {
    wrapper = render(<ChartLegendContent series={chartSeries} iconSize={14} />);
  });

  it("should render three legend items", () => {
    expect(wrapper.find(".recharts-legend-item").length).toEqual(3);
  });

  describe("inactive item when clicking", () => {
    const fn = jest.fn;
    const w = mount(<ChartLegendContent series={chartSeries} iconSize={14} onItemClick={() => fn} />);
    let num = 0;
    w.find(".recharts-legend-item").forEach((legendItem: ReactWrapper) => {
      num++;
      legendItem.simulate("click");
      it (`clicked item #${num}`, () => {
        expect(w.find(".inactive").length).toBe(num);
      })
    })
  });

});
