module.exports = {
    exerciseList: async () => {
        try {
            // fetching data
            const entries = await strapi.entityService.findMany(
                "api::exercise.exercise",
                {
                    fields: ["id", "name", "createdAt"],
                    populate: {
                        category: {
                            name: true
                        }
                    },
                    filters: {
                        category: {
                            name: {
                                $contains: "BALA"
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
                        // name: item.name || "",
                        exercise: item.name || "",
                        // publishedDate: new Date(item.createdAt).toDateString() || "",
                        // image: item.thumbnail?.url || "",
                        category: item.category?.name || "",
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