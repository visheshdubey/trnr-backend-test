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
                            populate: {
                                category: true
                            }
                        },
                        thumbnail: true

                    },
                    filters: {
                        $or: [
                            {
                                name: {
                                    $containsi: query
                                }
                            },
                            {
                                product: {
                                    name: {
                                        $containsi: query
                                    }
                                }
                            }
                        ]


                    },
                    limit: 100

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
                        image: item.thumbnail?.url || "",
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