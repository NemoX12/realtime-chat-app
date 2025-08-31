import FriendRequest from "../models/friend.model.js";
import User from "../models/user.model.js";

export const sendFriendRequest = async (req, res) => {
  try {
    const { id: receiverId } = req.body;

    const sender = await User.findById(req.user._id);
    const receiver = await User.findById(receiverId);

    if (
      sender.friendsList.includes(receiverId) ||
      receiver.friendsList.includes(req.user_id)
    ) {
      return res.status(400).json({ error: "Already friends" });
    }

    const friendRequest = await FriendRequest.findOne({
      $or: [
        { senderId: req.user._id, receiverId: receiverId },
        { senderId: receiverId, receiverId: req.user._id },
      ],
    });

    if (friendRequest) {
      return res.status(400).json({ error: "Friend request already exists" });
    }

    const newFriendRequest = new FriendRequest({
      senderId: req.user._id,
      receiverId,
    });

    if (newFriendRequest) {
      await newFriendRequest.save();

      res.status(201).json(newFriendRequest);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
};

export const manageFriendRequest = async (req, res) => {
  try {
    const { action, id: requestId } = req.body;

    switch (action) {
      case "accept":
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
          return res.status(400).json({ error: "Request doesn't exist" });
        }

        const { senderId, receiverId } = friendRequest;

        if (req.user._id.toString() !== receiverId) {
          return res.status(400).json({ error: "You aren't the receiver" });
        }

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!receiver || !sender) {
          return res.status(400).json({ error: "User not found" });
        }

        if (
          sender.friendsList.includes(receiverId) ||
          receiver.friendsList.includes(senderId)
        ) {
          return res.status(400).json({ error: "Already friends" });
        }

        await sender.updateOne({ $push: { friendsList: receiverId } });
        await receiver.updateOne({ $push: { friendsList: senderId } });

        await FriendRequest.findByIdAndDelete(requestId);

        res.status(201).json(receiver);

      case "decline":
        const request = await FriendRequest.findById(requestId);

        if (!request) {
          return res.status(400).json({ error: "Request doesn't exist" });
        }

        const { receiverID } = request;

        if (req.user._id !== receiverID) {
          return res.status(400).json({ error: "You aren't the receiver" });
        }

        await request.deleteOne();

        res.status(201).json({ message: "Successfully declined request" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
};

export const getFriends = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user.friendsList);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
};

export const deleteFriend = async (req, res) => {
  try {
    const { id: friendToDelete } = req.body;

    const myUser = await User.findById(req.user._id);
    const friendUser = await User.findById(friendToDelete);

    if (!myUser || !friendUser) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    if (
      !myUser.friendsList.includes(friendUser._id) ||
      !friendUser.friendsList.includes(myUser._id)
    ) {
      return res.status(400).json({ error: "You aren't friends" });
    }

    await myUser.updateOne({ $pull: { friendsList: friendUser._id.toString() } });
    await friendUser.updateOne({ $pull: { friendsList: myUser._id.toString() } });

    res.status(201).json({ message: "Deleted a friend successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
};
