module.exports = {
    name: "total_clicks",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        amount: {
            type: "bigint",
            default: 0
        },
        locked: {
            type: "boolean",
            default: true
        }
    }
};