import { importRecipesFromCsvBuffer, parseRecipe } from "./recipes";

describe("load an entire file", () => {
  test("the entire file", async () => {
    const buffer: Buffer = Buffer.from("blarg,\nblarg2,https://url.com/");
    const imported = await importRecipesFromCsvBuffer(buffer);
    expect(imported).toEqual([
      { name: "blarg" },
      { name: "blarg2", url: "https://url.com/" },
    ]);
  });
});

describe("each type of record import format", () => {
  test.each([
    [
      [
        "[Lemon Pea Risotto](https://docs.google.com/document/d/1IYKUu5SRdR2xtjSRBwIfGnXSp6bSytOsgOjRpcpx6To/edit?usp=sharing)",
      ],
      {
        name: "Lemon Pea Risotto",
        url: "https://docs.google.com/document/d/1IYKUu5SRdR2xtjSRBwIfGnXSp6bSytOsgOjRpcpx6To/edit?usp=sharing",
      },
    ],
    [["Pad Thai"], { name: "Pad Thai" }],
    [["Pad Thai", ""], { name: "Pad Thai" }],
    [
      [
        "Citrusy Lentil and Sweet Potato Soup",
        "https://cooking.nytimes.com/recipes/1023920-citrusy-lentil-and-sweet-potato-soup",
      ],
      {
        name: "Citrusy Lentil and Sweet Potato Soup",
        url: "https://cooking.nytimes.com/recipes/1023920-citrusy-lentil-and-sweet-potato-soup",
      },
    ],
    [
      [
        "https://cooking.nytimes.com/recipes/1014964-korean-chilled-buckwheat-noodles-with-chilled-broth-and-kimchi",
      ],
      {
        name: "https://cooking.nytimes.com/recipes/1014964-korean-chilled-buckwheat-noodles-with-chilled-broth-and-kimchi",
        url: "https://cooking.nytimes.com/recipes/1014964-korean-chilled-buckwheat-noodles-with-chilled-broth-and-kimchi",
      },
    ],
  ])(".parseRecipe(%s)", (t1, t2) => {
    expect(parseRecipe(t1)).toEqual(t2);
  });
});
