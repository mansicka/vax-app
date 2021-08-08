import React from "react";
import { useState, useEffect } from "react";
import url from "../../util/url"
import { Doughnut } from 'react-chartjs-2'

function VaccinationChartsSex() {
    //states
    const [sexes, setSexes] = useState([]);



    useEffect(() => {
        //fetchers
        const getVaccinations = async () => {
            let response = await fetch(url + '/vaccination/all');
            let data = await response.json();
            parseToArr(data);
            return true;
        }
        //parse sexes
        const parseToArr = async (data) => {
            let male = 0;
            let female = 0;
            let nonBinary = 0;
            await data.forEach(vaccination => {
                if (vaccination.gender === 'male') {
                    male++
                } else if (vaccination.gender === 'female') {
                    female++
                } else {
                    nonBinary++
                }
            });
            setSexes([male, female, nonBinary]);

        }
        getVaccinations()
    }, []);

    //options & data for charts.js
    const options = {
        legend: {
            display: true,
            position: "right"
        }
    };
    const data = {
        labels: ['Male', 'Female', 'Nonbinary'],
        datasets: [
            {
                label: '# of vaccinations',
                data: sexes,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div>
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default VaccinationChartsSex;