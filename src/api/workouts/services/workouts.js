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
    updateWorkouts: async (userId, body, method) => {

        try {
            console.log(method)
            const [user_ob, count] = await strapi.db.query('api::saved-workout.saved-workout').findWithCount({
                // select: ['user', 'exercises'],
                where: { user: userId },
                populate: { user: true, exercises: { populate: { id: true } } },
            });
            const user = await user_ob


            // console.log(result);


            let entry;

            if (count != 0) {
                let result;
                if (user[0].exercises && Array.isArray(user[0].exercises)) {
                    result = await user[0].exercises.reduce(async (acc, item) => {
                        acc = acc || [];
                        const accum = await acc;
                        accum.push(item.id);
                        return accum;
                    }, []);
                }
                if (method === 'DELETE') {
                    const index = result.indexOf(body.data.exercises);
                    console.log(body.data.exercises);
                    if (index > -1) { // only splice array when item is found
                        result.splice(index, 1);
                    }
                }
                else
                    result = result.concat([body.data.exercises])

                entry = await strapi.db.query('api::saved-workout.saved-workout').update({
                    where: { user: userId },
                    data: {
                        exercises: result,
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
                messaage: user
            };

            return exercisesReduced;
        } catch (err) {
            return err;
        }
    },
};