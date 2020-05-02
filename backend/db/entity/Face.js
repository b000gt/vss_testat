module.exports = {
    name: "face",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        amount: {
            type: "int",
            nullable: false,
            unique: true,
        }
    }
};