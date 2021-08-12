import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import VaccinationChartsDates from "./charts/charts.vaccination.date";
import VaccinationChartsSex from "./charts/charts.vaccination.sexes";


function VaccinationsMain() {

    return (
        <Paper>
            <Grid container spacing={3} justifyContent='center'>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant='h4'>Vaccinations</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant='h5'>Vaccinations per date</Typography><br />
                    <VaccinationChartsDates />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h5'>Sex distribution</Typography><br />
                    <VaccinationChartsSex />
                </Grid>
            </Grid>
        </Paper>
    )
}
export default VaccinationsMain