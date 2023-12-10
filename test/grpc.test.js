import { describe, it, expect } from "vitest";
import { news } from "./testData";
import server from "../server";
import client from "../client";

describe("News tests", async () => {
  it("Should return news", () =>
    new Promise((done) => {
      client.getNews({}, (err, response) => {
        expect(err).toBe(null);
        done();
      });
    }));

  it("Should add news", () =>
    new Promise((done) => {
      return client.addNews(news, (err, response) => {
        expect(err).toBe(null);
        client.getNews({ title: news.title }, (err, response) => {
          expect(response.items[0].title).toEqual(news.title);
          expect(response.items[0].date).toEqual(news.date);
          expect(response.items[0].shortDescription).toEqual(
            news.shortDescription,
          );
          expect(response.items[0].text).toEqual(news.text);
          done();
        });
      });
    }));

    it("Should update news", () =>
    new Promise((done) => {
      const newText = "Updated text";
      client.getNews({ title: news.title }, (err, response) => {
        expect(err).toBe(null);
       let newsToUpdate = response.items[0];
       newsToUpdate.text = newText;

        client.updateNews(newsToUpdate, (err, response) => {
          expect(err).toBe(null);
          client.getNews({ title: news.title }, (err, response) => {
            expect(response.items[0].text).toEqual(newText);
            done();
          })
        });

      });
    }));

    it("Should delete news", () =>
    new Promise((done) => {

      client.getNews({ title: news.title }, (err, response) => {
        expect(err).toBe(null);
       let newsToDelete = response.items[0];

       client.deleteNews({_id: newsToDelete._id},(err, response) => {
        expect(err).toBe(null);
        client.getNews({ title: news.title }, (err, response) => {
          console.log(response);
          expect(response).toEqual({});
          done();
        })
       });

      });

    }));
});
