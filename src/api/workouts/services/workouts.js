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
                            customer_id: { $eq: userId }
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
                        product: {
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
                            exercise_category: await getExerciseRelations(item.id).then(entry => entry.exercise_category?.name) || "",
                            product: await getExerciseRelations(item.id).then(entry => entry.product?.name) || ""
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
    updateWorkouts: async (userId, body, method) => {

        try {
            console.log(method)
            const [user_ob1, count1] = await strapi.db.query('api::custom-user.custom-user').findWithCount({
                select: ['id'],
                where: { customer_id: userId },
            });
            const userID_extracted = await user_ob1
            const [user_ob, count] = await strapi.db.query('api::saved-workout.saved-workout').findWithCount({
                // select: ['user', 'exercises'],
                where: { user: userID_extracted[0].id },
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
                    }, []); //Exercise ID come into result
                }
                if (method === 'DELETE') {
                    const index = result.indexOf(body.data.exercises);
                    console.log(body.data.exercises);
                    if (index > -1) { // only splice array when item is foun
                        result.splice(index, 1);
                    }
                }
                else
                    result = result.concat([body.data.exercises])

                entry = await strapi.db.query('api::saved-workout.saved-workout').update({
                    where: { user: userID_extracted[0].id },
                    data: {
                        exercises: result,
                    },
                });
            }
            else {
                entry = await strapi.entityService.create('api::saved-workout.saved-workout', {

                    data: {
                        user: userID_extracted[0].id,
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