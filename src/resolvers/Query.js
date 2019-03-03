
//If no filter string is applied the where object will be an empty object and no
//filtering conditions will be applied
//If there is a filter carried by the args the where object will pass the 2 conditions
async function feed(parent, args, context) {
    const where = args.filter ? {
        OR: [
            {description_contains: args.filter},
            {url_contains: args.filter},
        ],
    } : {}

    //Prisma uses the where object to filter out links that don't satisfy
    //one of the two conditions
    const links = await context.prisma.links({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy,
    })

    const count = await context.prisma
        .linksConnection({
            where,
            skip: args.skip,
        })
        .aggregate()
        .count()

    return {
        links,
        count,
    }
}

module.exports = {
    feed,
}