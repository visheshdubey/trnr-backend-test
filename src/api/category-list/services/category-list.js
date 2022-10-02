module.exports = {
    categoryList: async () => {
        try {
            // fetching data
            const entries = await strapi.entityService.findMany(
                "api::category.category",
                {
                    fields: ["id", "name", "createdAt"],
                    populate: {
                        image: {
                            fields: ["url"],
                        },
                        // category: {
                        //     fields: ["name"],
                        // },
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
                        // category: item.category.name || "",
                        publishedDate: new Date(item.createdAt).toDateString() || "",
                        image: item.image?.url || "",
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