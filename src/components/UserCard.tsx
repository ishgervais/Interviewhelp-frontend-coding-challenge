import { useState } from "react";
import Chart from "react-apexcharts";
import '../assets/styles/UserCard.scss'
import { FormatedUserRecord } from "../types";

function UserCard(props: { key: any, data: FormatedUserRecord }) {

    return (
        <div className="user-card md:ml-8 mb-8 flex relative">
            <div className="graphical-data">
                <div className="flex">
                    <div className={`avatar ${props.data.avatar ? '' : 'no-pic'}`} style={props.data.avatar ? {
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
                <div className="revenue">${((num) => Math.round(num * 100) / 100)(props.data.totalRevenue)}</div>
            </div>
        </div>
    )
}

export default UserCard
