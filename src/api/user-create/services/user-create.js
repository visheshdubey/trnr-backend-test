/**
 * We take shopify customer ID as url parameter and, we do CRUD on the basis of that particular id
 * We don't want strapi default ID to be accessed because it is sequential in nature.
 * 
 * UPDATE USER :- 
 * This method takes input CustomerID()Shopify, body
 * 
 * If the user is not created it will create, else it will upate the existing user
 * It finds user on the basis of customerId
 *
 */



module.exports = {
    getUser: async (userId) => {
        try {
            const entries = await strapi.entityService.findMany(
                "api::custom-user.custom-user",
                {
                    fields: ['firstName', 'lastName', 'phone', 'email', 'DOB', 'country', 'gender', 'tnc'],
                    limit: 1,
                    filters: {
                        customer_id: { $eq: userId }
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
                select: ['firstName', 'lastName', 'phone', 'email', 'DOB', 'customer_id'],
                where: { customer_id: userId },
            });
            const user = await user_ob

            let entry;
            console.log(JSON.stringify(user));

            //Update if user Exist
            if (count != 0) {
                entry = await strapi.db.query('api::custom-user.custom-user').update({
                    select: ['firstName', 'lastName', 'phone', 'email', 'DOB', 'customer_id'],
                    where: { customer_id: userId },
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
                        customer_id: userId,
                        firstName: body.data.firstName || '',
                        lastName: body.data.lastName || '',
                        phone: body.data.phone || '',
                        email: body.data.email || '',
                        DOB: body.data.DOB || new Date("1-1-1000"),
                        country: body.data.country || '',
                        gender: body.data.gender || '',
                        tnc: body.data.tnc || 'FALSE',
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