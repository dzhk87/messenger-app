const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../constants/onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [[Message, "createdAt", "DESC"]],
      include: [
        { model: Message, order: ["createdAt", "DESC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.hasOwnProperty(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[0].text;
      // sort messages in ascending order by created time
      convoJSON.messages.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

// updates readAt when messages are read
router.patch("/:conversationId/read", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const { conversationId } = req.params;
    const conversation = await Conversation.findByPk(conversationId, {
      attributes: ["id", "user1Id", "user2Id"],
      order: [[Message, "createdAt", "DESC"]],
      include: [{ model: Message, order: ["createdAt", "DESC"] }],
    });
    // check if user is in the conversation
    const { user1Id, user2Id } = conversation;
    if (userId !== user1Id && userId !== user2Id) {
      return res.sendStatus(403);
    }
    // get unread messages
    const otherUserId = userId === user1Id ? user2Id : user1Id;
    const unreadMessages = await Message.findAll({
      where: {
        conversationId,
        senderId: otherUserId,
        readAt: null,
      },
    });
    // update readAt
    const { readAt } = req.body;
    const messageUpdates = unreadMessages.map((message) => {
      message.readAt = readAt;
      return message.save();
    });
    const updatedMessages = await Promise.all(messageUpdates);
    const updatedMessageIds = updatedMessages.map(({ id }) => id);

    // return updated messages
    res.json({ messageIds: updatedMessageIds, readAt });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
