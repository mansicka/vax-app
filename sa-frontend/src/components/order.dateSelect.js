import React from "react";
import { useState, useEffect } from "react";
import url from '../util/url'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';


function OrderDateSelect() {
    const [data, setData] = useState([]);
    const [date, setDate] = useState(new Date());
    const [totals, setTotals] = useState({});


    const calculateTotals = async (data, date) => {

        let totalExpiredOrders = 0;
        let totalExpiredVaccinations = 0;
        let totalVaccinations = 0;
        let oPrecent = 0
        let vPrecent = 0;
        let totalOrders = 0;

        data.forEach(order => {
            let arrivalDate = new Date(order.arrival_date);
            let expiryDate = new Date(order.arrival_date);
            expiryDate = expiryDate.setDate(expiryDate.getDate() + 30);
            let currentDate = new Date(date);
            if (order.injections_left <= order.injections) {
                if (currentDate >= expiryDate) {
                    totalExpiredOrders++;
                    totalExpiredVaccinations = totalExpiredVaccinations + order.injections_left;
                }
                if (currentDate >= arrivalDate) {
                    totalVaccinations = totalVaccinations + order.injections;
                    totalOrders++;
                    totalVaccinations = totalVaccinations + order.injections;
                }
            }

        });
        oPrecent = ((totalExpiredOrders / data.length) * 100).toFixed();
        vPrecent = ((totalExpiredVaccinations / totalVaccinations) * 100).toFixed();
        setTotals({
            'orders_expired': totalExpiredOrders,
            'vaccinations_expired': totalExpiredVaccinations,
            'vaccinations_total': totalVaccinations,
            'orders_total': totalOrders,
            'orders_precent': oPrecent,
            'vaccinations_precent': vPrecent

        });

    }

    const handleDateChange = (date) => {
        date = new Date(date).toISOString();
        setDate(date);
        calculateTotals(data, date);
    };

    // options & data for charts.js


    //useEffect block
    useEffect(() => {

        const getOrders = async () => {
            let response = await fetch(url + '/order/all');
            let data = await response.json();
            setData(data);
            let date = new Date()
            calculateTotals(data, date);
            return true;
        }

        getOrders();
    }, []);

    //return block
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Paper>
                <Grid container spacing={3} justifyContent='center'>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                        <Typography variant='h6'>Date specific data</Typography>
                    </Grid>
                    <Grid item xs={6}>

                        <Typography variant='body1'>
                            Total of orders expired for selected date: {totals.orders_expired}</Typography><br />
                        <Typography variant='body2'>That's {totals.orders_precent}% of total of {totals.orders_total} orders received until selected date. <br /><br />
                        </Typography>
                        <Typography variant='body1'>
                            Total of vaccinations expired for selected date: {totals.vaccinations_expired}</Typography><br />
                        <Typography variant='body2'>That's {totals.vaccinations_precent}% of total of {totals.vaccinations_total} vaccinations available until selected date. <br /></Typography>

                    </Grid>
                    <Grid item xs={6}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="date-picker-dialog"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker"
                            label="Date picker"
                            value={date}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </Grid>

            </Paper>
        </MuiPickersUtilsProvider>

    )
}
export default OrderDateSelect;