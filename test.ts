async function batchPostRequest() {
  const response = await fetch("http://localhost:3001/api/auth/profile", {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjAxOWFmZTczLTU4NTQtNzAwMC04MDJiLTY5ZjIyM2I4MTE2OSJ9.eyJlbWFpbCI6InhpbmF3b2wyNDBAaXhvc3BhY2UuY29tIiwiY3JlYXRlZEF0IjoiMjAyNi0wMS0wOVQwNjozMjo0Mi43NzFaIiwiaXNBY3RpdmUiOnRydWUsImxhc3RMb2dpbkF0IjoiMjAyNi0wMS0wOVQwNjozMjo0Mi43NTRaIiwidXBkYXRlZEF0IjoiMjAyNi0wMS0wOVQwNjozMjo0Mi43NTRaIiwic3ViIjoiNmZhZDI2ZDAtMzFjMS00ODg3LWI0OTYtODNkODcwZTA2MzdjIiwiaWF0IjoxNzY3OTUzNjAyLCJleHAiOjE3Njc5NTQyMDJ9.aN-FaCHBsBZ4THkouJ_F3KV2CN_j1V7VVoUr83HxDLH2qj4o__h6hdQ-Ax7R6bkIXbJzZ0KloFnWsP5fayAArknme311eaGF0L-HzmbEKnpK-mwVpY0ca_wLKDFb6NkKI0BtQGBDtl6l9XumXvGQI_2PzPsZA_punDbpfPjSr_-zNCUUTbfltvgZR_WBSWmM-g6SgdhrhKX_PBTN-zubj_jMqrJal4MgfpfvRK6labD3BBoOZR89VztwSz87zOAb4mJW_R5TH-F1efcsrFMdqosSlDE2gKQXA3P-MpR814WIl-q8CT9Lq143enJxR6n-mJtayEhq4cwlLcy2CxK4lw",
      "x-refresh-token": "e605ca9b7a77f6bf412dde870fbe1bb77102515d9583db39348f0e3b35f3851c9536ba2325e5588d12b72c007ca3ea55a9612999918638d4db960546d9c7abac",
    },
  });

  console.log(response)

  if (!response.ok) {
    console.error(await response.text());
    return;
  }

  console.log(await response.json());
}

batchPostRequest();

// async function run() {
//   const requests = Array.from({ length: 10000 }, () => batchPostRequest());

//   const start = performance.now();
//   const times = await Promise.all(requests);
//   const totalTime = performance.now() - start;

//   console.log("Total time:", totalTime.toFixed(2), "ms");
//   console.log("Avg response:", (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2), "ms");
// }

// run();