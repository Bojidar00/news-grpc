import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import {
  getNews,
  addNews,
  updateNews,
  deleteNews,
} from "./controllers/controllers.js";
import * as dotenv from "dotenv";
dotenv.config();

var packageDefinition = protoLoader.loadSync("news.proto", {});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var newsPackage = protoDescriptor.newsPackage;

var server = new grpc.Server();

server.addService(newsPackage.News.service, {
  getNews: getNews,
  addNews: addNews,
  updateNews: updateNews,
  deleteNews: deleteNews,
});

server.bindAsync(
  `0.0.0.0:${process.env.PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    server.start();
    console.log(`listening on port ${port}`);
  },
);

export default server;
