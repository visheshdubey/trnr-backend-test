module.exports = {
    exerciseCategoryList: async (productId) => {
        try {
            // fetching data
            const entries = await strapi.entityService.findMany(
                "api::exercise.exercise",
                {
                    fields: ["id", "name", "createdAt"],
                    populate: {
                        exercise_category: {
                            id: true,
                            name: true
                        }
                    },
                    filters: {
                        product: { //product, because we are looking for exercises associated with product whose id is given
                            id: {
                                $eq: productId
                            }
                        }
                    }
                }
            );

            // reduce the data to the format we want to return
            let entriesReduced;
            if (entries && Array.isArray(entries)) {
                var c = entries.map((item) => {
                    return {
                        id: item.exercise_category.id,
                        name: item.exercise_category.name
                    }

                })
                const uniqueIds = [];
                const unique = c.filter(element => {
                    const isDuplicate = uniqueIds.includes(element.id);
                    if (!isDuplicate) {
                        uniqueIds.push(element.id);
                        return true;
                    }
                    return false;
                });
                entriesReduced = unique.reduce((acc, item) => {
                    acc = acc || [];

                    acc.push({
                        id: item.id,
                        // name: item.name || "",
                        exerciseCategory: item.name || "",
                        // publishedDate: new Date(item.createdAt).toDateString() || "",
                        // image: item.thumbnail?.url || "",
                        // category: item.exercise_category?.name || "",
                    });

                    return acc;
                }, []);
                // var c = new Set(acc);
                // console.log(c);
            }

            // return the reduced data
            return entriesReduced;
        } catch (err) {
            return err;
        }
    },
    exerciseCategory: async (productId, categoryId) => {
        try {
            // fetching data
            console.log(productId + "llll" + categoryId);
            const entries = await strapi.entityService.findMany(
                "api::exercise.exercise",
                {
                    fields: ["id", "name"],
                    populate: {
                        exercise_category: {
                            id: true,
                            name: true
                        },
                        thumbnail: {
                            url: true
                        },
                        product: {

                            name: true,
                            populate: {
                                category: true
                            }


                        }
                    },
                    filters: {
                        $and: [
                            {
                                product: { //product, because we are looking for exercises associated with product whose id is given
                                    id: {
                                        $eq: productId
                                    }
                                }
                            },
                            {
                                exercise_category: {
                                    id: {
                                        $eq: categoryId
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
                        name: item.name || "",
                        // exerciseCategory: item.name || "",
                        // publishedDate: new Date(item.createdAt).toDateString() || "",
                        image: item.thumbnail?.url || "",
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