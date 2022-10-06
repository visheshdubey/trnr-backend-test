module.exports = {
    exerciseCategoryList: async (productId) => {

        /* Generates list of exercise categories which has exercise in it. 
        Those exercise categories which are not alloted any exercise are opted out from the result*/
        try {
            // fetching data
            const entries = await strapi.entityService.findMany(
                "api::exercise.exercise",
                {
                    fields: ["id", "name", "updatedAt"],
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
                        exerciseCategory: item.name || "",
                        updatedDate: item.updatedAt || "",
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
    exerciseDetail: async (exerciseId) => {

        /* Gets Single Exercise in Detail*/
        try {
            // fetching data
            const entries = await strapi.entityService.findOne(
                "api::exercise.exercise", exerciseId,
                {
                    fields: ["id", "name", "description", "updatedAt"],
                    populate: {
                        exercise_category: {
                            fields: ["id", "name", "updatedAt"],
                        },
                        video: {
                            fields: ["url"],
                        },
                        image_large: {
                            fields: ["url"],
                        },
                        image_small: {
                            fields: ["url"],
                        }

                    },

                }
            );

            return entries;
        } catch (err) {
            return err;
        }
    },
    exerciseCategory: async (productId, categoryId) => {

        /* Displays a List of Exercises in the given category*/
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