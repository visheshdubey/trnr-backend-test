module.exports = {
    /* Displays a List of Product Categories*/

    categoryList: async () => {
        try {
            // fetching data
            const entries = await strapi.entityService.findMany(
                "api::category.category",
                {
                    fields: ["id", "name", "updatedAt"],
                    populate: {
                        image: {
                            fields: ["url"],
                        },
                    },
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
                        image: item.image?.url || "",
                        updatedAt: new Date(item.updatedAt) || "",
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