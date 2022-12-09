'use strict';

/**
 * profile-api service
 */

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
     getProfile: async (userId) => {
          try {
               const entries = await strapi.entityService.findMany(
                    "api::custom-user.custom-user",
                    {
                         fields: ['firstName', 'lastName', 'phone', 'email', 'DOB', 'country', 'gender', 'tnc'],
                         populate: { user_id: { fields: ["id"] } },
                         limit: 1,
                         filters: {
                              user_id: { id: { $eq: userId } }
                         }
                    }
               );
               console.log(entries);

               return entries[0];
          } catch (err) {
               return err;
          }
     },
     createProfile: async (userId, body) => {
          try {
               // console.log(JSON.stringify(userId));
               const [user_ob, count] = await strapi.db.query('api::custom-user.custom-user').findWithCount({
                    select: ['id'],
                    populate: ['user_id'],
                    where: { user_id: userId },
               });
               const user = await user_ob
               console.log(JSON.stringify(count));
               let entry;


               //Update if user Exist
               if (count === 0) {
                    entry = await strapi.entityService.create('api::custom-user.custom-user', {

                         data: {
                              user_id: userId,
                              firstName: body.data.firstName || '',
                              lastName: body.data.lastName || '',
                              phone: body.data.phone || '',
                              email: body.data.email || '',
                              DOB: body.data.DOB || null,
                              country: body.data.country || '',
                              gender: body.data.gender || 'OTHER',
                              tnc: body.data.tnc || 'FALSE',
                              publishedAt: new Date()
                         }
                    });
               }
               else {
                    entry = 'Profile exists'

               }

               let exercisesReduced = {
                    messaage: entry
               };

               return exercisesReduced;
          } catch (err) {
               return err;
          }
     },
     updateProfile: async (userId, body) => {
          try {
               const [user_ob, count] = await strapi.db.query('api::custom-user.custom-user').findWithCount({
                    select: ['firstName', 'lastName', 'phone', 'email', 'DOB'],
                    populate: ['user_id'],
                    where: { user_id: userId },
               });
               const user = await user_ob

               let entry;
               console.log(JSON.stringify(user));

               //Update if user Exist
               if (count != 0) {
                    entry = await strapi.db.query('api::custom-user.custom-user').update({
                         select: ['firstName', 'lastName', 'phone', 'email', 'DOB'],
                         populate: ['customer_id'],
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
                    entry = "Profile dosen't exist"
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
