import { useState } from "react";
import Chart from "react-apexcharts";
import '../assets/styles/UserCard.scss'

function UserCard(props: { key: any, Name: string, avatar?: string, occupation: string, id: string, totalImpresions: number, totalConversions: number, totalRevenue: number, chartSummary: string }) {

    const [chardData, setChartData] = useState({
        options: {
            chart: {
                id: "basic-bar",
                toolbar: {
                    show: false,
                },
            },
            grid: {
                show: false,
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                labels: {
                    show: false
                },
                categories: ["2013-04-24 19:20:09", "2013-04-25 19:20:09", "2013-04-26 19:20:09", "2013-04-27 19:20:09", "2013-04-28 19:20:09", "2013-04-29 19:20:09", "2013-04-30 19:20:09", "2013-05-01 19:20:09"]
            },
            yaxis: {
                labels: {
                    show: false
                },
            }
        },
        series: [
            {
                name: "conversions",
                data: [12, 2, 6, 89, 3, 5, 9, 43]
            }
        ]
    })

    return (
        <div className="user-card ml-0 md:ml-8 mb-8 flex relative">
            <div className="graphical-data">
                <div className="flex">
                    <div className="avatar" style={props.avatar ? {
                        backgroundImage: `url(${props.avatar})`
                    } : {}}>
                        {props.avatar ? "" : props.Name[0]}
                    </div>
                    <div className="details">
                        <div className="names">
                            {((name) => { return name.length > 20 ? name.substring(0, 10) + '...' : name })(props.Name)}
                        </div>
                        <div className="occupation">
                            {props.occupation}
                        </div>
                    </div>
                </div>
                <div className="chart -mt-8">
                    <Chart
                        options={chardData.options}
                        series={chardData.series}
                        type="line"
                        width="190px"
                    />
                </div>
                <div className="summary">{props.chartSummary}</div>
            </div>
            <div className="text-data text-right ml-auto">
                <div className="impressions">{props.totalImpresions}</div>
                <div className="label">impressions</div>
                <div className="conversions">{props.totalConversions}</div>
                <div className="label">conversions</div>
                <div className="revenue">${props.totalRevenue}</div>
            </div>
        </div>
    )
}

export default UserCard
