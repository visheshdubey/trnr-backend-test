module.exports = {
    Search: async (query) => {
        try {
            // fetching data
            const entries = await strapi.entityService.findMany(
                "api::exercise.exercise",
                {
                    fields: ["id", "name", "createdAt"],
                    populate: {

                        product: {
                            name: true,
                            category: {
                                name: true
                            },
                        }
                    },
                    filters: {
                        $or: [
                            {
                                name: {
                                    $startsWith: query
                                }
                            },
                            {
                                product: {
                                    name: {
                                        $startsWith: query
                                    }
                                }
                            }
                        ]


                    }
                }
            );

            // reduce the data to the format we want to return
            let entriesReduced;
            if (entries && Array.isArray(entries)) {
                entriesReduced = entries.reduce((acc, item) => {
                    acc = acc || [];
                    acc.push({
                        id: item.id,
                        productName: item.product?.name || "",
                        exercise: item.name || "",
                        // publishedDate: new Date(item.createdAt).toDateString() || "",
                        // image: item.thumbnail?.url || "",
                        category: item.product.category?.name || "",
                    });
                    return acc;
                }, []);
            }

            // return the reduced data
            return entriesReduced;
        } catch (err) {
            return err;
        }
    },
};