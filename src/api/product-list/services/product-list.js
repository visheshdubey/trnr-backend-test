module.exports = {
    productList: async (categoryId) => {
        try {
            // fetching data
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
                        // product: item.product.name || "",
                        // publishedDate: new Date(item.createdAt).toDateString() || "",
                        category: item.category?.id || "",
                        category_name: item.category?.name || "",
                        image: item.image?.url || ""
                        // authorEmail: item.author?.email || "",
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