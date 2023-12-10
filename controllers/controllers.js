import db from "../db/index.js";
import { ObjectId } from "mongodb";

const NEWS_COLLECTION = "news";

const internalServerError = new Error("Internal server error");

export const getNews = async (call, callback) => {
  const request = call.request;
  if (request.sortByTitle === 0) {
    request.sortByTitle = -1;
  }
  if (request.sortByDate === 0) {
    request.sortByDate = -1;
  }
  try {
    const cursor = db
      .collection(NEWS_COLLECTION)
      .find({ title: request.title, date: request.date })
      .sort({ title: request.sortByTitle, date: request.sortByDate });

    const news = await cursor.toArray();

    callback(null, { items: news });
  } catch (err) {
    callback(internalServerError, null);
  }
};

export const addNews = async (call, callback) => {
  try {
    await db.collection(NEWS_COLLECTION).insertOne(call.request);
    callback(null, {});
  } catch (err) {
    callback(internalServerError, null);
  }
};

export const updateNews = async (call, callback) => {
  const request = call.request;

  const filter = { _id: new ObjectId(request._id) };
  const updateDoc = {
    $set: {
      date: request.date,
      title: request.title,
      shortDescription: request.shortDescription,
      text: request.text,
    },
  };

  try {
    await db.collection(NEWS_COLLECTION).updateOne(filter, updateDoc);
    callback(null, {});
  } catch (err) {
    callback(internalServerError, null);
  }
};

export const deleteNews = async (call, callback) => {
  const query = { _id: new ObjectId(call.request._id) };

  try {
    await db.collection(NEWS_COLLECTION).deleteOne(query);
    callback(null, {});
  } catch (err) {
    callback(internalServerError, null);
  }
};
