// Resolver file, logic for the mutations

const Mutations = {
    // info contains the query from the front-end. This is needed to the backend and therefore added tot he createItem function.
    async createItem(parent, args, ctx, info) {
        // TODO: Check if they are logged in

        const item = await ctx.db.mutation.createItem({
            data: {
                ...args,
            }
        }, info);

        return item;
    },
    // createDog(parent, args, ctx, info) {
    //     global.dogs = global.dogs || [];
    //     const newDog = {
    //         name: args.name
    //     }
    //     global.dogs.push(newDog);
    //     return newDog;
    // }
    async updateItem(parent, args, ctx, info) {
        // take a copy of the updates
        const updates = { ... args };
        // remove the ID from the updates
        delete updates.id;
        // run the update method
        const updatedItem = await ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id,
            }
        }, info);
        // return the updated item
        return updatedItem;
    }
};

module.exports = Mutations;
