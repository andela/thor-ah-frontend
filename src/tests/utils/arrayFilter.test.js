import arrayFilter from "../../utils/arrayFilter";

describe("filters an array of articles", () => {
  it("returns the articles", () => {
    const testArticles = [
      {
        id: "1",
        description: "Sample description",
        body: "Sample body can be anything you want it to be"
      }
    ];
    expect(arrayFilter(testArticles)).toEqual([
      {
        id: "1",
        description: "Sample description",
        body: "Sample body can be anything you want it to be"
      }
    ]);
  });

  it("return articles from authored articles", () => {
    const testArticles = [
      {
        id: 10,
        username: "thorteam",
        authored: [
          {
            id: 65,
            title: "Sample Title",
            slug: "Sample slug",
            description: "Sample description",
            body: "Sample body can be anything you want it to be"
          }
        ]
      }
    ];
    expect(arrayFilter(testArticles)).toEqual([
      {
        id: 65,
        title: "Sample Title",
        slug: "Sample slug",
        description: "Sample description",
        body: "Sample body can be anything you want it to be"
      }
    ]);
  });

  it("returns an empty array if tags have no articles", () => {
    const testArticles = [
      {
        id: 1,
        tag: "walker",
        articles: []
      }
    ];
    expect(arrayFilter(testArticles).length).toEqual(0);
  }); 
});
