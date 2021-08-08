import React from "react";
import { useState, useEffect } from "react";
import url from '../util/url'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';


function OrderDateSelect() {
    const [data, setData] = useState([]);
    const [dataPerDay, setDataPerDay] = useState([]);
    const [date, setDate] = useState(new Date().toString())

    const handleDateChange = (date) => {
        setDate(date);
        getOrdersExpired(date);
    };
    const getOrdersExpired = async (date) => {
        let response = await fetch(url + '/order/gonebad/' + date);
        let data = await response.json();
        setDataPerDay(data);
        return true;
    }
    useEffect(() => {
        //fetchers
        const getOrders = async () => {
            let response = await fetch(url + '/order/all');
            let data = await response.json();
            setData(data);
            return true;
        }


        getOrders();
        getOrdersExpired();
    }, []);

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={date}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            {date}
        </div>
    )
}
export default OrderDateSelect;