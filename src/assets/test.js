import Data from '../../public/logs.json' assert { type: "json" }
const verifySolution = (userId, date) => {
    let totalConversions = 0;
    let totalImpressions = 0;
    let totalRevenue = 0;

    let conversionsPerDay = 0;

    for (let log of Data) {
        if (log.user_id === userId) {
            switch (log.type) {
                case "impression":
                    totalImpressions++;
                    break;

                case "conversion":
                    totalConversions++;
                    break;

                default:
                    break;
            }
            totalRevenue += log.revenue;
            if (log.time.split(" ")[0] === date && log.type === "conversion") {
                conversionsPerDay++;
            }
        }
    }
    return {
        totalConversions,
        totalImpressions,
        totalRevenue,
        conversionsPerDay
    }
}

console.log(verifySolution(45, "2013-05-08")) // totalConversions: 328, totalImpressions: 887, totalRevenue: 15664.71, conversionsPerDay: 18