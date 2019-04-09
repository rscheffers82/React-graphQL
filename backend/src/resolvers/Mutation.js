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
    }
    // createDog(parent, args, ctx, info) {
    //     global.dogs = global.dogs || [];
    //     const newDog = {
    //         name: args.name
    //     }
    //     global.dogs.push(newDog);
    //     return newDog;
    // }
};

module.exports = Mutations;
