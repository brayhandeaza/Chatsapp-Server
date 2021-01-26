const { Users, Conversations, UsersConversation, Messages } = require('../models/')
const faker = require('faker')

// Create Users
// for (let i = 0; i < 2; i++) {
//     Users.create({
//         fullName: faker.name.findName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//         phoneNumber: faker.phone.phoneNumber(),
//         imageUrl: faker.image.image(),
//         token: faker.random.uuid(),
//         toToken: "45fgfththrtjhrtj",
//         secreKey: "hett"
//     })
// }



// Create Conversations
for (let i = 1, j = 1; i < 3; i++, j++) {
     Conversations.create({
        userIds: [1, j++]
    }).then(async (conversation) => {
         UsersConversation.create({
            userId: conversation.userIds[0],
            conversationId: conversation.id
        })

         UsersConversation.create({
            userId: conversation.userIds[1],
            conversationId: conversation.id
        })
    })
}