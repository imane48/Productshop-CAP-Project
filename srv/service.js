/*const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { Products } = this.entities;

    this.before(['CREATE', 'UPDATE'], Products, (req) => {
        if (!req.data) return;

        const { category } = req.data;

        const validCategories = ['Drinks', 'Grocery'];
        
        if (category && !validCategories.includes(category)) {
            return req.error(400, `Category must be 'Drinks' or 'Grocery'. Received: ${category}`);
        }
    });
});*/
