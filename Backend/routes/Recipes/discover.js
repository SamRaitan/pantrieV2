const { query } = require('express');
const Recipe = require('../../models/recipe');

const NOTALLOWED = ['', ' ', undefined]

const getSearchQuery = async (req, res) => {
    try {
        const { cuisine, searchQuery, from = 0, to = 30 } = req.query;
        let recipes;
        console.log(cuisine, searchQuery, from, to);

        console.log(NOTALLOWED.includes(searchQuery));

        if (NOTALLOWED.includes(searchQuery)) {
            console.log('noni');
            recipes = await getCuisineRcipes(cuisine, from, to)
        } else {
            console.log('noni222');
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

const getCuisineRcipes = async (cuisine, from, to) => {
    let query = {}

    if (cuisine !== 'undefined') {
        query = { cuisine };
    }

    const recipes = await Recipe.find(query)
        .skip(parseInt(from))
        .limit(parseInt(to) - parseInt(from));

    return recipes
}

module.exports = getSearchQuery