# Recharts  Wrapper

[![npm](https://img.shields.io/npm/v/@bndynet/recharts-wrapper.svg)](https://www.npmjs.com/package/@bndynet/recharts-wrapper)
[![Build Status](https://travis-ci.com/bndynet/recharts-wrapper.svg?branch=master)](https://travis-ci.com/bndynet/recharts-wrapper)
[![Coverage Status](https://coveralls.io/repos/github/bndynet/recharts-wrapper/badge.svg?branch=master)](https://coveralls.io/github/bndynet/recharts-wrapper?branch=master)
[![Code Styles](https://img.shields.io/badge/Code_Style-Prettier-ff69b4.svg)](https://github.com/prettier/prettier)

It's just a wrapper of Recharts for easiler to code, but some enhancements. [Here](https://bndynet.github.io/recharts-wrapper/index.html) is the API documentation

## New Features

- By default, support toggling legend items for showing/hiding the series
- Use a random color to render if no color specified

## Getting Started

### For SPA (Single Page Application)

Use `npm install @bndynet/recharts-wrapper` to install package, and start your chart like below:

```typescript
import { Chart } from "@bndynet/recharts-wrapper";

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
    { key: "uv", type: "bar" },
    { key: "pv", color: "#8884d8", type: "area" },
    { key: "amt", color: "#ff0000", type: "line", legendIconType: "circle" }
];

return (
    <Chart width={500} height={500} data={data} xKey="name" series={series} />
);
```

### For Website

The UMD build is also available on unpkg.com, and you can add to your website like:

```html
<script src="https://unpkg.com/react/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/prop-types/prop-types.min.js"></script>
<script src="https://unpkg.com/recharts/umd/Recharts.min.js"></script>
<script src="https://unpkg.com/@bndynet/recharts-wrapper/dist/recharts-wrapper.umd.js"></script>

<div id="chart"></div>

<script>
    var data = [
        { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
        { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
        { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
        { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
    ];
    ReactDOM.render(React.createElement(rechartsWrapper.Chart, {
        data,
        series: [
            { key: "uv"},
            { key: "pv"},
            { key: "amt"},
        ]}), document.querySelector("#chart"));
</script>
```
