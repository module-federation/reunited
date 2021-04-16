const Button = import("federated/Button");

describe("another", function() {

  it("can run another test", function() {
    expect(true).toBe(true);
  });

  it("federated module test", async function() {
    const btn = await Button
    console.log('HERES BUTTON', btn.default);
    expect(true).toBe(true);
  });
});
