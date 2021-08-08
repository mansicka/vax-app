import React from "react";
import { useState, useEffect } from "react";
import url from "../../util/url"
import { Line } from 'react-chartjs-2'

function VaccinationChartsDates() {
    //states
    const [data, setData] = useState([]);



    useEffect(() => {
        //fetchers
        const getVaccinations = async () => {
            let response = await fetch(url + '/vaccination/all');
            let data = await response.json();
            let fData = await toDateArray(data);
            setData(fData);
            console.log(fData)
            return true;
        }
        //arr tools
        const toDateArray = async (data) => {
            let arr = [];
            let result = [];

            data.forEach(e => {
                var dateFromData = new Date(e.date).toISOString().substring(0, 10);
                arr.push(dateFromData);
            })

            var uniqArr = arr.filter(onlyUnique);
            uniqArr.forEach(c => {
                var count = data.filter((obj) => new Date(obj.date).toISOString().substring(0, 10) === c).length;
                result.push({ 'date': c, 'count': count })
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
                label: 'Vaccinations per date',
                data: data.map(o => o.count),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
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
        <div>
            <Line data={chartData} options={options} />
        </div >
    );
}

export default VaccinationChartsDates;