const calculateResponseTime = (startTime, endTime) => {
    const responseTime = endTime - startTime;
    return responseTime;
};

module.exports = {
    calculateResponseTime
};