async function batchPostRequest() {
  const start = performance.now();

  const response = await fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "sandip@gmail.com",
      password: "123443",
    }),
  });

  if (!response.ok) {
    throw new Error("Oops Error");
  }

  await response.json();
  return performance.now() - start;
}

async function run() {
  const requests = Array.from({ length: 10000 }, () => batchPostRequest());

  const start = performance.now();
  const times = await Promise.all(requests);
  const totalTime = performance.now() - start;

  console.log("Total time:", totalTime.toFixed(2), "ms");
  console.log("Avg response:", (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2), "ms");
}

run();