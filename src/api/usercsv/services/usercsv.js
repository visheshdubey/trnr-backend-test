'use strict';

/**
 * usercsv service
 */

// module.exports = () => ({});
module.exports = {
     usercsv: async () => {
          try {
               const entries = await strapi.entityService.findMany(
                    "api::custom-user.custom-user",
                    {
                         fields: ['firstName', 'lastName', 'email', 'DOB', 'country', 'gender', 'tnc', 'createdAt'],
                         populate: { user_id: { fields: ["id"] } }
                    }
               );
               // reduce the data to the format we want to return
               let entriesReduced;
               if (entries && Array.isArray(entries)) {
                    entriesReduced = entries.reduce((acc, item) => {
                         acc = acc || [];
                         acc.push({
                              id: item.id,
                              user_firstName: item.firstName || "",
                              user_lastName: item.lastName || "",
                              email: item.email || "",
                              DOB: item.DOB || "",
                              gender: item.gender || "",
                              country: item.country || "",
                              joined: item.createdAt || ""

                         });
                         return acc;
                    }, []);
               }
               return entriesReduced;
          } catch (err) {
               return err;
          }
     }
}