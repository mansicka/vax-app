import React from "react";
import { useState, useEffect } from "react";
import url from '../../util/url'
import { Doughnut } from 'react-chartjs-2'

function OrderChartDistricts() {
    //states
    const [districts, setDistricts] = useState([]);



    useEffect(() => {
        //fetchers
        const getOrders = async () => {
            let response = await fetch(url + '/order/all');
            let data = await response.json();
            parseToArr(data);
            return true;
        }
        //parse sexes
        const parseToArr = async (data) => {
            let TAYS = 0;
            let HYKS = 0;
            let TYKS = 0;
            let OYS = 0;
            let KYS = 0;
            await data.forEach(order => {
                if (order.district === 'TAYS') {
                    TAYS++
                } else if (order.district === 'HYKS') {
                    HYKS++
                } else if (order.district === 'TYKS') {
                    TYKS++
                } else if (order.district === 'OYS') {
                    OYS++
                }
                else {
                    KYS++
                }
            });
            setDistricts([TAYS, HYKS, TYKS, OYS, KYS]);

        }
        getOrders()
    }, []);

    //options & data for charts.js
    const options = {
        legend: {
            display: true,
            position: "right"
        }
    };
    const data = {
        labels: ['TAYS', 'HYKS', 'TYKS', 'OYS', 'KYS'],
        datasets: [
            {
                label: '# of orders per district',
                data: districts,
                backgroundColor: [
                    '#003f5c',
                    '#58508d',
                    '#bc5090',
                    '#ff6361',
                    '#ffa600',
                ],
                borderColor: [
                    '#fffff'
                ],
                borderWidth: 2,
            },
        ],
    };
    return (
        <div>
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default OrderChartDistricts;