import User from "../models/User.js";

export async function getRecommenedUsers() {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and : [
                {_id: {$ne: currentUserId}},    // exclude currentUser
                {_id: {$nin: currentUser.friends}}, // exclude current user's friends
                {isOnboarded: true}
            ]
        })

        res.status(200).json(recommendedUsers);

    } catch (error) {
        console.error("Error in fetching Recommeneded Users", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export async function getMyFriends() {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId)
        .select("friends")
        .populate("friends", "fullName profilePic nativeLanguage learningLanguage")

        res.status(200).json(user.friends);
    } catch (error) {
        console.erroe("Error in getMyfriends Controller", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
};