//******************sendMessage controller***********************************
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
  try {
    //get the receiverId from request param
    const receiverId = req.params.id;
    //get the message from request body
    const message = req.body.message;
    //get the senderId from the request user key (added by the middleware  : protectRoute)
    const senderId = req.user._id;
    console.log(receiverId, message, senderId);
    //$all : search for all documents where participants contain both user1 and user2 (order does not matter)
    // possibilites : [user1,user2], [user2,user1],[user1,user2,user3]
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    //insert conversation if it's not existing
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    //create new message
    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
      //Manage two promises in parallel => if one of promises is rejected => all promises will be rejected
      await Promise.all([conversation.save(), newMessage.save()]);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sending message controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//******************receiveMessage controller***********************************

export const receiveMessage = async (req, res) => {
  try {
    //get the user to chat with id from the req params
    const userToChatId = req.params.id;
    //get the user id from the request user key (added by the middleware  : protectRoute)
    const receiverId = req.user._id;
    //get the conversation infos between those users and get the messages texts by using populate(similar to join in sql)
    const conversation = await Conversation.findOne({
      participants: { $all: [userToChatId, receiverId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getting message controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
