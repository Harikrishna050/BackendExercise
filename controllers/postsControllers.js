const asyncHandler = require('express-async-handler');
const posts = require('../models/postsModel');

const getposts = asyncHandler(async (req, res) => {
    const post = await posts.find({ user: req.user.id })
    res.status(200).json(post);
})

const postposts = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.content || !req.body.categoryId) {
        res.status(400);
        throw new Error('please fill all fields');
    }
    const post = await posts.create({
        title: req.body.title,
        content:req.body.content,
        categoryId:req.body.categoryId,
        user: req.user.id,
    })
    res.json(post);
})

const updateposts = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.status(400);
        throw new Error('please fill both title and content');
    }
    const post = await posts.findById(req.params.id)
    if (!post) {
        res.status(400)
        throw new Error('post not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the post user
    if (post.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedposts = await posts.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedposts)
})

const delposts = asyncHandler(async (req, res) => {
    const post = await posts.findById(req.params.id)
    if (!post) {
        res.status(400)
        throw new Error('post not found');
    }


    // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  
    // await post.remove();
    await posts.deleteOne({ _id: req.params.id });
    // res.json({ message: `post ${req.params.id}` });
    res.json({ id: req.params.id });

})


// const getlatestposts = asyncHandler(async (req, res) => {
//     // Find all posts of the authenticated user
//     const userPosts = await posts.find({ user: req.user.id });

//     // Use an object to map categories to their latest posts
//     const latestPostsByCategory = {};

//     // Iterate through the user's posts to determine the latest post for each category
//     userPosts.forEach((post) => {
//         const { categoryId } = post;
//         if (!(categoryId in latestPostsByCategory) || post.created_at > latestPostsByCategory[categoryId].created_at) {
//             latestPostsByCategory[categoryId] = post;
//         }
//         console.log(post.created_at);

//     });

//     // Extract the latest posts from the object into an array
//     const latestPosts = Object.values(latestPostsByCategory);

//     res.status(200).json(latestPosts);
// });


const getlatestposts = asyncHandler(async (req, res) => {
    // Find all posts of the authenticated user
    const userPosts = await posts.find({ user: req.user.id });

    // Use an object to map categories to their latest posts
    const Map = {};

    // Iterate through the user's posts to determine the latest post for each category
    userPosts.forEach((post) => {
        const { categoryId, createdAt } = post;

        // Convert createdAt string to Date object
        const postCreatedAt = new Date(createdAt);

        if (!(categoryId in Map) || postCreatedAt > new Date(Map[categoryId].createdAt)) {
            Map[categoryId] = post;
        }
    });

    // Extract the latest posts from the object into an array
    const latestPosts = Object.values(Map);

    res.status(200).json(latestPosts);
});


module.exports = {
    getposts,
    postposts,
    delposts,
    updateposts,
    getlatestposts,
}