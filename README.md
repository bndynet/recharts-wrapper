# Recharts  Wrapper

It's just a wrapper of Recharts for easiler to code.

## New Features

- By default, support toggling legend items for showing/hiding the series

## Example

```typescript
public render() {
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

    return (
        <Chart width={500} height={500} data={data} xKey="name" series={series} />
    );
}
```