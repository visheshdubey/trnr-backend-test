module.exports = {
    getUser: async (userId) => {
        // yo
        try {
            const entries = await strapi.entityService.findMany(
                "api::custom-user.custom-user",
                {
                    fields: ["id", 'firstName', 'lastName', 'phone', 'email', 'DOB', 'country', 'gender', 'tnc'],
                    limit: 1,
                    filters: {
                        id: { $eq: userId }
                    }
                }
            );
            console.log(entries);
            return entries[0];
        } catch (err) {
            return err;
        }
    },
    updateUser: async (userId, body) => {
        console.log('hi');

        try {
            const [user_ob, count] = await strapi.db.query('api::custom-user.custom-user').findWithCount({
                select: ['id', 'firstName', 'lastName', 'phone', 'email', 'DOB'],
                where: { id: userId },
            });
            const user = await user_ob

            let entry;

            //Update if user Exist
            if (count != 0) {
                entry = await strapi.db.query('api::custom-user.custom-user').update({
                    where: { id: userId },
                    data: {
                        firstName: body.data.firstName,
                        lastName: body.data.lastName || user[0].lastName,
                        phone: body.data.phone || user[0].phone,
                        email: body.data.email || user[0].email,
                        DOB: body.data.DOB || user[0].DOB,
                        country: body.data.country || user[0].country,
                        gender: body.data.gender || user[0].gender,
                        tnc: body.data.tnc || user[0].tnc,
                    }
                });
            }
            //Create a new user
            else {
                entry = await strapi.entityService.create('api::custom-user.custom-user', {

                    data: {
                        id: userId,
                        firstName: body.data.firstName || '',
                        lastName: body.data.lastName || '',
                        phone: body.data.phone || '',
                        email: body.data.email || '',
                        DOB: body.data.DOB || '',
                        country: body.data.country || '',
                        gender: body.data.gender || '',
                        tnc: body.data.tnc || '',
                        publishedAt: new Date()
                    }
                });
            }
            let exercisesReduced = {
                messaage: entry[0]
            };

            return exercisesReduced;
        } catch (err) {
            return err;
        }
    },
};