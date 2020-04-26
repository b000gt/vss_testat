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
            unique: true,
        },
        amount: {
            type: "int",
            nullable: false,
            unique: true,
        }
    }
};