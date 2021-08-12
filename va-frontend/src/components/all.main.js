import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import OrdersMain from "./orders.main";
import VaccinationsMain from "./ vaccinations.main";
import DateSelect from "./dateSelect";

function AllMain() {

    return (

        <Paper>
            <Grid container spacing={4} justifyContent='space-around'>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant='h2'>vax-app</Typography>
                </Grid>
                <Grid item xs={6}>
                    <OrdersMain />
                </Grid>
                <Grid item xs={6}>
                    <VaccinationsMain />
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={8} >
                    <DateSelect />
                </Grid>
                <Grid item xs={2} />


            </Grid>
        </Paper>
    )
}
export default AllMain;