import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("DROP SCHEMA public cascade; CREATE SCHEMA public;");
});

test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toBe(201);
  const respose1Body = await response1.json();
  console.log(respose1Body);
  expect(Array.isArray(respose1Body)).toBe(true);
  expect(respose1Body.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);
  const respose2Body = await response2.json();
  console.log(respose2Body);
  expect(Array.isArray(respose2Body)).toBe(true);
  expect(respose2Body.length).toBe(0);
});
