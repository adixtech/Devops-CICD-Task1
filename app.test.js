
const { test } = require("node:test");
const assert = require("node:assert/strict");
const server = require("./app");

test("app returns a successful response", async () => {
  await new Promise((resolve) => server.listen(0, resolve));

  try {
    const port = server.address().port;
    const response = await fetch(`http://127.0.0.1:${port}`);

    assert.equal(response.status, 200);
    assert.equal(
      await response.text(),
      "Hello! My DevOps CI/CD pipeline is working.\n"
    );
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve())
    );
  }
});
