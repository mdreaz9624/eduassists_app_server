//controllers/galleryController.js

// const { connectDatabase } = require("../config/database");

// const getGalleryData = async (req, res) => {
//     try {
//         const db = await connectDatabase();
//         const result = await db.collection("gallery").find().toArray();
//         res.send(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ success: false, message: error.message });
//     }
// };

// const postGalleryData = async (req, res) => {
//     try {
//         const db = await connectDatabase();
//         const data = req.body;
//         const result = await db.collection("gallery").insertOne(data);
//         res.send(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ success: false, message: error.message });
//     }
// };

// module.exports = { getGalleryData, postGalleryData };


// new version 


// controllers/galleryController.js

const { connectDatabase } = require("../config/database");

const getGalleryData = async (req, res) => {
    try {
        const db = await connectDatabase();
        const result = await db.collection("gallery").find().toArray();
        
        console.log("Raw database result:", result); // Debug log
        
        // Since your data structure has one document with a 'gallery' array
        if (result && result.length > 0) {
            // Get the first document and extract its gallery array
            const galleryDoc = result[0];
            
            if (galleryDoc.gallery && Array.isArray(galleryDoc.gallery)) {
                // Return just the gallery array
                return res.send(galleryDoc.gallery);
            } else {
                // If no gallery field, return empty array
                return res.send([]);
            }
        } else {
            // No documents found
            return res.send([]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message });
    }
};

const postGalleryData = async (req, res) => {
    try {
        const db = await connectDatabase();
        const data = req.body;
        
        // Check if document already exists
        const existingDoc = await db.collection("gallery").findOne({});
        
        if (existingDoc) {
            // Update existing document by pushing to gallery array
            const result = await db.collection("gallery").updateOne(
                {},
                { $push: { gallery: data } }
            );
            res.send(result);
        } else {
            // Create new document with gallery array
            const result = await db.collection("gallery").insertOne({
                gallery: [data],
                createdAt: new Date()
            });
            res.send(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message });
    }
};

// Add endpoint for updating likes
const updateGalleryLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { likes } = req.body; // likes should be 1 or -1
        
        const db = await connectDatabase();
        
        // Update the like count for specific gallery item
        const result = await db.collection("gallery").updateOne(
            { "gallery.id": parseInt(id) },
            { $inc: { "gallery.$.likes": likes } }
        );
        
        if (result.modifiedCount === 0) {
            return res.status(404).send({ success: false, message: "Item not found" });
        }
        
        res.send({ success: true, message: "Like updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message });
    }
};

// Add endpoint for incrementing views
const incrementGalleryView = async (req, res) => {
    try {
        const { id } = req.params;
        
        const db = await connectDatabase();
        
        // Increment view count for specific gallery item
        const result = await db.collection("gallery").updateOne(
            { "gallery.id": parseInt(id) },
            { $inc: { "gallery.$.views": 1 } }
        );
        
        res.send({ success: true, message: "View incremented successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = { 
    getGalleryData, 
    postGalleryData, 
    updateGalleryLike,
    incrementGalleryView 
};