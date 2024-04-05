'use strict';
module.exports = {
     createDeleteRequest: async (userId, body, method) => {
          try {
               /* -------------------------------------------------------------------------- */
               /*                        Creating delete request entry                       */
               /* -------------------------------------------------------------------------- */
               const reqAlreadyExist = await strapi.db.query('api::delete-account-request.delete-account-request').findOne({
                    where: { user: userId.id },
               });
               if (reqAlreadyExist) {
                    throw new Error("Request already exists");
               }
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
               const c = await strapi.db.query('api::delete-account-request.delete-account-request').create({
                    data: {
                         reason: body?.reason || "No reason provided",
                         explanation: body?.explanation || "",
                         user: userId.id,
                         status: "NEW",
                         user_profile: custom_user.id,
                    },
               });
               if (!c) {
                    throw new Error("Error creating delete request");
               }
               /* -------------------------------------------------------------------------- */
               /*                              Block user access                             */
               /* -------------------------------------------------------------------------- */
               const updated_user = await strapi.db.query('plugin::users-permissions.user').update({
                    where: { id: userId.id, },
                    data: {
                         blocked: false
                    },
               });
               console.log("Updated user: ", updated_user);
               if (!updated_user) {
                    throw new Error("User not found");
               }
               /* -------------------------------------------------------------------------- */
               /*           Sending a Confirmation email to the user and TRNR team           */
               /* -------------------------------------------------------------------------- */
               await strapi.plugins['email'].services.email.send({
                    to: custom_user.email,
                    from: 'TRNR Admin <info@trnr.com>',
                    cc: "thecampusmonk@gmail.com",
                    subject: 'Delete account request received.',
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
                              <p>We're sorry to see you go! We wanted to confirm that we have received your request to delete your TRNR
                                   account and all of your personal data. Your account deletion will be completed within the next 3-4
                                   business days. <br /><br />All of your data associated with your TRNR account will be permanently deleted
                                   during this
                                   time. <br /><br />If you did not request this account deletion, or if you have changed your mind, please
                                   reach
                                   out to
                                   us immediately at <a href="mailto:hello@trnr.com">hello@trnr.com</a>. We appreciate you being a part of
                                   the TRNR community, and we wish you
                                   all the best in your fitness journey. <br /><br />Sincerely, <br /><strong>The TRNR Team</strong></p>
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
};