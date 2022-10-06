module.exports = {
    productList: async (categoryId) => {
        try {
            /* Displays a List of Product Items in the given category*/
            const entries = await strapi.entityService.findMany(
                "api::product.product",
                {
                    fields: ["id", "name", "createdAt"],
                    populate: {
                        image: true,
                        category: {
                            name: true,
                            id: true
                        }
                    },
                    filters: {
                        category: {
                            id: {
                                $eq: categoryId
                            }
                        }
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
                        name: item.name || "",
                        category: item.category?.id || "",
                        category_name: item.category?.name || "",
                        image: item.image?.url || ""
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