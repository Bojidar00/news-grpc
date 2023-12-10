import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import * as dotenv from "dotenv";
dotenv.config();

var packageDefinition = protoLoader.loadSync("news.proto", {});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var newsPackage = protoDescriptor.newsPackage;

const client = new newsPackage.News(
  `localhost:${process.env.PORT}`,
  grpc.credentials.createInsecure(),
);

client.addNews(
  {
    date: "01-01-2024",
    title: "Title",
    shortDescription: "News for grpc",
    text: "Content",
  },
  (err, response) => {
    console.log(err);
    console.log(response);
  },
);

client.getNews({ sortByTitle: "DESC" }, (err, response) => {
  console.log("Read all news from database " + JSON.stringify(response));
});

client.updateNews(
  {
    _id: "6574798d75435423441e9ca6",
    date: "2024-5-6",
    title: "New title",
    shortDescription: "description",
    text: "content",
  },
  (err, response) => {
    console.log(err);
    console.log(response);
  },
);

client.deleteNews(
  {
    _id: "6574798d75435423441e9ca6",
  },
  (err, response) => {
    console.log(err);
    console.log(response);
  },
);

export default client;
