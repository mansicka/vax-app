const calculateTotals = async (orders, vaccinations, date) => {

    let totalExpiredOrders = 0;
    let totalExpiredVaccinations = 0;
    let totalVaccinations = 0;
    let oPrecent = 0
    let vPrecent = 0;
    let totalOrders = 0;
    let injectionsDone = 0;

    orders.forEach(order => {
        let injectionsLeft = order.injections;

        let arrivalDate = new Date(order.arrival_date);
        let expiryDate = new Date(order.arrival_date);
        expiryDate = expiryDate.setDate(expiryDate.getDate() + 30);
        let currentDate = new Date(date);

        if (currentDate >= expiryDate) {

            vaccinations.forEach(vaccination => {
                if (vaccination.OrderId === order.id) {
                    injectionsLeft--;
                }
            })

            totalExpiredOrders++;
            totalExpiredVaccinations = totalExpiredVaccinations + injectionsLeft;
        }
        if (currentDate >= arrivalDate) {
            totalVaccinations = totalVaccinations + order.injections;
            totalVaccinations = totalVaccinations + order.injections;
            totalOrders++;
        }


    });
    oPrecent = ((totalExpiredOrders / totalOrders) * 100).toFixed();
    vPrecent = ((totalExpiredVaccinations / totalVaccinations) * 100).toFixed();
    injectionsDone = totalVaccinations - totalExpiredVaccinations;
    let totals = ({
        'orders_expired': totalExpiredOrders,
        'vaccinations_expired': totalExpiredVaccinations,
        'vaccinations_total': totalVaccinations,
        'orders_total': totalOrders,
        'orders_precent': oPrecent,
        'vaccinations_precent': vPrecent,
        'injections_done': injectionsDone

    });
    return totals;
}
export default calculateTotals;