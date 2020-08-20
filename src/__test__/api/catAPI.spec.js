import catAPI from "../../api/catAPI.js";
describe("image", () => {
  it("findByBreedId return response", async () => {
    const breed_id = "abys";
    const response = await catAPI.images.findByBreedID({ breed_id });
    expect(response.length).toBe(1);
  });
});
