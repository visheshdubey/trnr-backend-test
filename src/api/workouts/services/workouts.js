module.exports = {
    Workouts: async (userId) => {

        try {
            const entries = await strapi.entityService.findMany(
                "api::saved-workout.saved-workout",
                {
                    fields: ["id"],
                    limit: 1,
                    populate: {
                        exercises: {
                            exercise: true
                        }
                    },
                    filters: {
                        user: {
                            id: { $eq: userId }
                        }
                    }
                }
            );
            let result;
            const getExerciseRelations = async (id) => {
                const entry = await strapi.entityService.findOne('api::exercise.exercise', id, {
                    fields: ["id", "name", "createdAt"],
                    populate: {
                        exercise_category: {
                            name: true
                        },
                        thumbnail: {
                            url: true
                        }
                    },
                });
                return entry;
            }
            const getExercises = async (exercises) => {
                let exercisesReduced;
                if (exercises && Array.isArray(exercises)) {
                    exercisesReduced = await exercises.reduce(async (acc, item) => {
                        acc = acc || [];
                        const accum = await acc;
                        accum.push({
                            id: item.id,
                            name: item.name || "",
                            image: await getExerciseRelations(item.id).then(entry => entry.thumbnail?.url) || "",
                            exercise_category: await getExerciseRelations(item.id).then(entry => entry.exercise_category?.name) || ""
                        });
                        return accum;
                    }, []);
                }
                return exercisesReduced;
            }
            result = {
                id: entries[0].id,
                exercises: await getExercises(entries[0].exercises) || "",
            }
            return result;
        } catch (err) {
            return err;
        }
    },
    // addWorkouts: async (userId, body) => {

    //     try {
    //         const entry = await strapi.entityService.create('api::saved-workout.saved-workout', {

    //             data: {
    //                 user: userId,
    //                 exercises: body.data.exercises,
    //                 publishedAt: new Date()
    //             }
    //         });
    //         let exercisesReduced = {
    //             messaage: entry
    //         };
    //         return exercisesReduced;

    //     } catch (err) {
    //         return err;
    //     }
    // },
    updateWorkouts: async (userId, body) => {

        try {
            console.log('hey')
            const [user_ob, count] = await strapi.db.query('api::saved-workout.saved-workout').findWithCount({
                // select: ['user', 'exercises'],
                where: { user: 1 },
                populate: { user: true },
            });
            console.log(count)
            let entry;

            if (count != 0) {
                entry = await strapi.db.query('api::saved-workout.saved-workout').update({
                    where: { user: userId },
                    data: {
                        exercises: body.data.exercises,
                    },
                });
            }
            else {
                entry = await strapi.entityService.create('api::saved-workout.saved-workout', {

                    data: {
                        user: userId,
                        exercises: body.data.exercises,
                        publishedAt: new Date()
                    }
                });
            }
            let exercisesReduced = {
                messaage: entry
            };

            return exercisesReduced;
        } catch (err) {
            return err;
        }
    },
};