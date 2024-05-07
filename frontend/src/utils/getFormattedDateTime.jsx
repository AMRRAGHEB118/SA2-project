const getFormattedDateTime = async (date, time) => {
    const combinedDateTime = new Date(date);
    const [hours, minutes] = time.split(":");
    combinedDateTime.setHours(hours);
    combinedDateTime.setMinutes(minutes);

    const options = { timeZone: 'Africa/Cairo' };
    const formattedDateTime = combinedDateTime.toLocaleString('en-US', options);
    return formattedDateTime
}

export default getFormattedDateTime