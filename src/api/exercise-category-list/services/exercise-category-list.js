module.exports = {
    exerciseCategoryList: async (productId) => {

        /**  Generates list of exercise categories which has exercise in it. 
         *   Those exercise categories which are not alloted any exercise are opted out from the result
         *   These data is for Material-TAB layout, this data is needed to prepare the tab layout well in advance
         * */
        try {
            // fetching data
            const entries = await strapi.entityService.findMany(
                "api::exercise.exercise",
                {
                    fields: ["id", "name", "order", "updatedAt"],
                    populate: {
                        exercise_category: {
                            id: true,
                            name: true,
                            order: true
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
                        name: item.exercise_category.name,
                        order: item.exercise_category.order || 0,
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
                        order: item.order || 0,

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
                        },
                        blur_image_large: {
                            fields: ["url"],
                        },
                        blur_image_small: {
                            fields: ["url"],
                        },
                        video_thumbnail: {
                            fields: ["url"],
                        },

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
                    fields: ["id", "name", "order"],
                    populate: {
                        exercise_category: {
                            id: true,
                            name: true
                        },
                        thumbnail: {
                            url: true
                        },
                        blur_image: {
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
                    },
                    // sort: { order: 'desc' },  // This will sort the list and generates a ordered response
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

                        blur_image: item.thumbnail?.url || "",
                        category: item.product.category?.name || "",
                        order: item.order || 0,
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