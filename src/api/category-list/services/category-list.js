module.exports = {
    /* Displays a List of Product Categories*/

    categoryList: async () => {
        try {
            // fetching data
            const entries = await strapi.entityService.findMany(
                "api::category.category",
                {
                    fields: ["id", "name", "order", "updatedAt"],
                    populate: {
                        image: {
                            fields: ["url"],
                        },
                        blur_image: {
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
                        image: item.blur_image?.url || "",
                        order: item.order || "",
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