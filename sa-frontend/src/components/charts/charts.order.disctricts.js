import React from "react";
import { useState, useEffect } from "react";
import url from '../../util/url'
import { Pie } from 'react-chartjs-2'
import Typography from '@material-ui/core/Typography'
import { Grid } from "@material-ui/core";


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
        maintainAspectRatio: true,
        legend: {
            display: true,
            position: "right",
            labels: {
                fontSize: 12
            }

        }
    };
    const data = {
        labels: ['TAYS', 'HYKS', 'TYKS', 'OYS', 'KYS'],
        datasets: [
            {
                label: '# of orders per district',
                data: districts,
                backgroundColor: [
                    '#ff6384',
                    '#ff8093',
                    '#ff99a3',
                    '#ffb2b5',
                    '#ffc9c9',
                ],
                borderColor: [
                    '#fffff'
                ],
                borderWidth: 2,
            },
        ],
    };
    return (
        <Grid container spacing={3} justifyContent='center'>
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography variant='h6'>Orders split by district</Typography>
            </Grid>
            <Grid item xs={12}>
                <Pie data={data} options={options} />
            </Grid>
        </Grid>
    );
}

export default OrderChartDistricts;