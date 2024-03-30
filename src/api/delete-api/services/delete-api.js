'use strict';
const crypto = require('crypto');
module.exports = {
     createDeleteRequest: async (userId, body, method) => {
          try {
               /* -------------------------------------------------------------------------- */
               /*                        Fetching Custom profile data                        */
               /* -------------------------------------------------------------------------- */
               const custom_user = await strapi.db.query('api::custom-user.custom-user').findOne({
                    where: { email: userId.email },
               })
               if (!custom_user) {
                    throw new Error("Custom user not found");
               }
               /* -------------------------------------------------------------------------- */
               /*                        Creating delete request entry                       */
               /* -------------------------------------------------------------------------- */
               const confirmationCode = crypto.randomBytes(20).toString('hex');
               const c = await strapi.db.query('api::delete-account-request.delete-account-request').create({
                    data: {
                         reason: body?.reason || "No reason provided",
                         explanation: body?.explanation || "",
                         users_permissions_user: userId.id,
                         status: "NEW",
                         custom_user: custom_user.id,
                         confirmation_code: confirmationCode,
                    },
               });
               if (!c) {
                    throw new Error("Error creating delete request");
               }
               /* -------------------------------------------------------------------------- */
               /*           Sending a Confirmation email to the user and TRNR team           */
               /* -------------------------------------------------------------------------- */
               await strapi.plugins['email'].services.email.send({
                    to: custom_user.email,
                    from: 'info@trnr.com',
                    cc: "thecampusmonk@gmail.com",
                    subject: '🔴 TRNR - Delete account request received.',
                    html: `<!DOCTYPE HTML>
                    <html lang="en">
                    
                    <head>
                         <meta charset="UTF-8">
                         <meta name="viewport" content="width=device-width, initial-scale=1.0">
                         <title>Delete Account Request</title>
                         <style>
                              body {
                                   margin: 0;
                                   padding: 0;
                                   font-family: Arial, sans-serif;
                                   background-color: #ffffff;
                                   color: #000000;
                              }
                    
                              .container {
                                   padding: 20px;
                              }
                    
                              .button {
                                   display: inline-block;
                                   padding: 10px 20px;
                                   background-color: #000000;
                                   color: #ffffff;
                                   text-decoration: none;
                                   border-radius: 4px;
                                   margin-top: 20px;
                              }
                         </style>
                    </head>
                    
                    <body>
                         <div class="container">
                              <img src="https://trnr-app-media.s3.ap-southeast-2.amazonaws.com/Exclude_41ccaddd3d.jpg?updated_at=2023-01-07T05:56:14.068Z"
                                   alt="" style="width: 100%; max-width: 120px;">
                    
                              <h1>Delete Account Request Received</h1>
                              <p>Follow this link to confirm your account deletion request for <strong>TRNR app</strong>. All your data will
                                   be deleted in the next 3-4 working days. If you didn't request account deletion, you can safely ignore
                                   this email.</p>
                              <a href="http://localhost:1337/delete/confirm.html?confirmationCode=${confirmationCode}" class="button" target="_blank">Confirm Deletion</a>
                         </div>
                    </body>
                    
                    </html>`,
               });

               return { message: "success" }

          } catch (err) {
               console.log("Delete Create request: 🔴", err);
               throw err;
          }
     },
     confirmDeletion: async (confirmationCode) => {
          try {
               /* -------------------------------------------------------------------------- */
               /*                           Fetch Deletion request                           */
               /* -------------------------------------------------------------------------- */
               const deletion_request = await strapi.db.query('api::delete-account-request.delete-account-request').findOne({
                    where: { confirmation_code: confirmationCode, status: "NEW" },
                    populate: ['users_permissions_user'],
               });
               if (!deletion_request) {
                    throw new Error("Invalid confirmation code");
               }
               console.log("🔴", deletion_request);
               /* -------------------------------------------------------------------------- */
               /*                              Block user access                             */
               /* -------------------------------------------------------------------------- */
               const updated_user = await strapi.db.query('plugin::users-permissions.user').update({
                    where: { id: deletion_request.users_permissions_user.id },
                    data: {
                         blocked: true
                    },
               });
               if (!updated_user) {
                    throw new Error("User not found");
               }
               console.log("🔴", updated_user);
               /* -------------------------------------------------------------------------- */
               /*                       Updating delete request status                       */
               /* -------------------------------------------------------------------------- */
               await strapi.db.query('api::delete-account-request.delete-account-request').update({
                    where: { id: deletion_request.id },
                    data: {
                         status: "CONFIRMED",
                    },
               });
               return { message: "delete request confirmed", status: 200 }
          } catch (err) {
               console.log(err);
               throw err;
          }
     }
};