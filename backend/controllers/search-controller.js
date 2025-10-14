import HttpError from "../models/http-error.js";
import {Search} from "../models/search.js";

const getSearchItems = async (req, res, next) => {
  try {
    const query = req.query.q?.trim();
    if (!query) {
      return next(new HttpError("Please provide a search query.", 400));
    }

    // Fetch all documents (you can filter documents if needed)
    const allItems = await Search.find({}, { category: 1, _id: 0 }); // only get the array field

    // Flatten and filter matching strings from arrays
    const matchedStrings = allItems
      .flatMap(item => item.category) // merge all category arrays into one list
      .filter(value => value.toLowerCase().includes(query.toLowerCase())); // match strings

    if (matchedStrings.length === 0) {
      return next(new HttpError("No matching items found.", 404));
    }

    res.status(200).json({ matches: matchedStrings });
  } catch (err) {
    console.error("Search error:", err);
    return next(new HttpError("Internal Server Issue. Try again later.", 500));
  }
};

export default {
    getSearchItems
};




