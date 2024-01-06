const Room = require("../models/room.model");
const User = require("../models/user.model");

const createRoom = async (req, res) => {
  const { title, description } = req.body;
  let room;
  try {
    {
      room = await Room.create({
        title,
        admin: req.user.id,
        description,
        members: [req.user.id],
      });
    }
    let rooms = [...req.user.rooms, room.id];
    await User.findByIdAndUpdate(
      req.user.id,
      { rooms },
      {
        new: true,
      }
    );
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.room);
    if (!room) {
      return res
        .status(400)
        .json({ errors: [{ message: "Room doesn't exist" }] });
    } else if (
      room.members.map((member) => member.user).includes(req.user.id)
    ) {
      return res
        .status(400)
        .json({ errors: [{ message: "You are not authorized" }] });
    }
    console.log(room);
    res.status(200).json({ success: true, data: { room } });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const getUserRooms = async (req, res) => {
  try {
    console.log(req.user.rooms);
    let rooms = await Room.find({ _id: { $in: req.user.rooms } }).select(
      "title avatar lastMessage"
    );

    res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const joinRoom = async (req, res) => {
  try {
    let room = await Room.findById(req.body.room);

    if (!room) {
      return res
        .status(400)
        .json({ errors: [{ message: "Room doesn't exist" }] });
    } else if (room.members.includes(req.user.id)) {
      return res
        .status(400)
        .json({ errors: [{ message: "You are already a member" }] });
    }
    const fieldsToUpdate = {
      members: [req.user.id, ...room.members],
    };

    await room.updateOne(fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    let rooms = [...req.user.rooms, room.id];
    await User.findByIdAndUpdate(
      req.user.id,
      { rooms },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const updateInfo = async (req, res) => {
  try {
    const room = await Room.findById(req.room);
    if (!room) {
      return res
        .status(400)
        .json({ errors: [{ message: "Room doesn't exist" }] });
    } else if (room.admin.id !== req.user.id) {
      return res
        .status(400)
        .json({ errors: [{ message: "User not authorized" }] });
    }

    const fieldsToUpdate = {
      title: req.body.title,
      description: req.body.description,
    };

    await room.updateOne(fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

module.exports = { createRoom, joinRoom, getUserRooms };
