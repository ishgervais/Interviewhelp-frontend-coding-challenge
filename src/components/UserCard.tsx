import { useState } from "react";
import Chart from "react-apexcharts";
import '../assets/styles/UserCard.scss'
import { FormatedUserRecord } from "../types";

function UserCard(props: { key: any, data: FormatedUserRecord }) {

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
                    <div className="avatar" style={props.data.avatar ? {
                        backgroundImage: `url(${props.data.avatar})`
                    } : {}}>
                        {props.data.avatar ? "" : props.data.Name[0]}
                    </div>
                    <div className="details">
                        <div className="names">
                            {((name) => { return name.length > 20 ? name.substring(0, 10) + '...' : name })(props.data.Name)}
                        </div>
                        <div className="occupation">
                            {props.data.occupation}
                        </div>
                    </div>
                </div>
                <div className="chart -mt-8">
                    <Chart
                        options={{
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
                                categories: props.data.categories
                            },
                            yaxis: {
                                labels: {
                                    show: false
                                },
                            }
                        }}
                        series={[
                            {
                                name: "conversions",
                                data: props.data.series
                            }
                        ]}
                        type="line"
                        width="190px"
                    />
                </div>
                <div className="summary">{props.data.chartSummary}</div>
            </div>
            <div className="text-data text-right ml-auto">
                <div className="impressions">{props.data.totalImpresions}</div>
                <div className="label">impressions</div>
                <div className="conversions">{props.data.totalConversions}</div>
                <div className="label">conversions</div>
                <div className="revenue">${props.data.totalRevenue}</div>
            </div>
        </div>
    )
}

export default UserCard
