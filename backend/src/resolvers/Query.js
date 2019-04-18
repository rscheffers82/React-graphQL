const { forwardTo } = require('prisma-binding');

// Resolver file, logic for the queries

const Query = {
    // When the query is exactly the same on the frontend as in the backend, then the query can be forwarded like below
    // This is the case when no authentication or data manipulation is needed.
    items: forwardTo('db'),
    // The above is the same as the below items function.
    // async items(parent, args, ctx, info) {
    //     const items = await ctx.db.query.items();
    //     return items;
    // },
    item: forwardTo('db'),
    itemsConnection: forwardTo('db'),

};

module.exports = Query;
