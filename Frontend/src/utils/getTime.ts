function getTimeOfDay(): string {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning!";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Good Afternoon!";
    } else {
        return " Good Night!";
    }
}



export default getTimeOfDay