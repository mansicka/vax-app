import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import OrderChartsDates from "./charts/charts.order.date";
import OrderChartDistricts from "./charts/charts.order.disctricts";
import OrderDateSelect from "./order.dateSelect";

function OrdersMain() {

    return (
        <Paper>
            <Grid container spacing={3} justifyContent='center'>

                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant='h2'>Orders</Typography>
                </Grid>
                <Grid item xs={8}>
                    <OrderChartsDates />
                </Grid>
                <Grid item xs={4}>
                    <OrderChartDistricts />
                </Grid>
                <Grid item xs={6}>
                    <OrderDateSelect />
                </Grid>
                <Grid item xs={6}>

                </Grid>
            </Grid>

        </Paper>
    )
}
export default OrdersMain