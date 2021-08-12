import React from "react";
import { useState, useEffect } from "react";
import url from '../util/url'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import calculateTotals from './util/calculateTotals'
import { Paper } from "@material-ui/core";

function DateSelect() {
    const [date, setDate] = useState(new Date());
    const [totals, setTotals] = useState({});
    const [orders, setOrders] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);



    const handleDateChange = async (date) => {
        date = new Date(date).toISOString();
        setDate(date);
        let totals = await calculateTotals(orders, vaccinations, date)
        setTotals(totals);
    };

    //useEffect block
    useEffect(() => {

        const getOrders = async () => {
            let response = await fetch(url + '/order/all');
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            let orders = await response.json();
            setOrders(orders);
        }

        const getVaccinations = async () => {
            let response = await fetch(url + '/vaccination/all');
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            let vaccinations = await response.json();
            setVaccinations(vaccinations)
        }

        getOrders();
        getVaccinations();
    }, []);

    //return block
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Paper>
                <Grid container spacing={3} justifyContent='center'>
                    <Grid item xs={12}>
                        <Typography variant='h5'>Experied orders and vaccines by selected date</Typography>
                    </Grid>
                    <Grid item xs={4}  >
                        <KeyboardDatePicker
                            disableToolbar
                            variant="date-picker-dialog"
                            format="MM/dd/yyyy"
                            margin="20px"
                            id="date-picker"
                            label="Date picker"
                            value={date}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant='body1'>
                            Total of orders expired for selected date: <b>{totals.orders_expired}</b></Typography><br />
                        <Typography variant='body2'>That's <b>{totals.orders_precent}%</b> of total of {totals.orders_total} orders received until selected date.
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant='body1'>
                            Total of vaccinations expired for selected date: <b>{totals.vaccinations_expired}</b></Typography><br />
                        <Typography variant='body2'>That's <b>{totals.vaccinations_precent}%</b> of total of <b>{totals.vaccinations_total}</b> vaccinations available until selected date. <br />
                            A total of <b>{totals.injections_done}</b> vaccinations were done from the expired bottles.
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </MuiPickersUtilsProvider >
    )
}
export default DateSelect;