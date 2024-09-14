const { query } = require('express');
const Recipe = require('../../models/recipe');

const NOTALLOWED = ['', ' ', undefined]

const getSearchQuery = async (req, res) => {
    try {
        const { cuisine, searchQuery, from = 0 } = req.query;
        let recipes;

        if (NOTALLOWED.includes(searchQuery)) {
            recipes = await getCuisineRcipes(cuisine)
        } else {
            recipes = await Recipe.find({
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for recipe title
                    { uploader_un: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for uploader username
                ]
            });
        }
        res.status(200).json({ data: recipes });

    } catch (err) {
        res.status(500).json({ message: `Internal server error: ${err}` });
    }
}

const getCuisineRcipes = async (cuisine) => {
    let query = {}

    if (cuisine !== 'undefined') {
        query = { cuisine };
    }
    const recipes = await Recipe.find(query)

    return recipes
}

module.exports = getSearchQuery