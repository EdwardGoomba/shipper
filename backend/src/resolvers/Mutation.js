const mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: check if they are logged in
    const item = await ctx.db.mutation.createItem({
      data: {
        ...args
      }
    }, info)

    return item
  },
  updateItem(parent, args, ctx, info) {
    // first take a copy of updates
    const updates = { ...args }
    // remove id from updates
    delete updates.id
    // run the update method
    return ctx.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.id
      }
    }, info)
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id }
    // find the item
    const item = await ctx.db.query.item({ where }, `{ id title}`)
    // check if user owns item and has permissions
    // TODO:
    // delete it
    return ctx.db.mutation.deleteItem({ where }, info)
  }
};

module.exports = mutations;
