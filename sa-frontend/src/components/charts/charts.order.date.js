import React from "react";
import { useState, useEffect } from "react";
import url from "../../util/url"
import { Line } from 'react-chartjs-2'
import Typography from '@material-ui/core/Typography'
import { Grid } from "@material-ui/core";

function OrderChartsDates() {
    //states
    const [data, setData] = useState([]);

    useEffect(() => {
        //fetchers
        const getVaccinations = async () => {
            let response = await fetch(url + '/order/all');
            let data = await response.json();
            let fData = await toDateArray(data);
            setData(fData);
            return true;
        }
        //arr tools
        const toDateArray = async (data) => {
            let arr = [];
            let result = [];

            data.forEach(e => {
                var dateFromData = new Date(e.arrival_date).toISOString().substring(0, 10);
                arr.push(dateFromData);
            })

            var uniqArr = arr.filter(onlyUnique);
            uniqArr.forEach(c => {
                var count = data.filter((obj) => new Date(obj.arrival_date).toISOString().substring(0, 10) === c).length;
                result.push({ 'date': c, 'count': count })
            })
            result.sort(function (a, b) {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            })
            return result;
        }

        //this function is ripped from https://bit.ly/3iuH8sk
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        getVaccinations();

    }, []);

    const chartData = {
        labels: data.map(o => o.date),
        datasets: [
            {
                label: 'Orders recieved per date',
                data: data.map(o => o.count),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255,99,132,0.2)',
            },
        ]
    };
    // options & data for charts.js
    const options = {
        parsing: {
            xAxisKey: 'date',
            yAxisKey: 'count'
        },
        scales: {
            xAxes: [{
                type: 'time',
            }]
        }
    }


    return (
        <Grid container spacing={3} justifyContent='center'>
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography variant='h6'>Orders received by date</Typography>
            </Grid>
            <Grid item xs={12}>
                <Line data={chartData} options={options} />
            </Grid>
        </Grid>

    );
}

export default OrderChartsDates;