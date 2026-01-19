async function getJwtToken() {
  const response = await fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "xinawol240@ixospace.com",
      password: "Test@123"
    })
  });

  if(!response.ok) {
    console.error(response.status);
    return;
  } 

  return await response.json();
}


async function createLink() {
  const result = await getJwtToken();

  const response = await fetch("http://localhost:3001/api/link/create", {
     body: JSON.stringify({
      originalUrl: "https://example.com/blog-post",
      slug: "my-blog-post",
      title: "My Blog Post",
      description: "A detailed blog post about web development tips and tricks",
      image: "https://example.com/images/blog-post-preview.png",
      isPreviewEnabled: true,
      expiresAt: "2026-06-30T23:59:59.000Z"
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${result.accessToken}`
    }
  });

  console.log(await response.json());
}


// createLink()



// async function updateLink() {
//   const result = await getJwtToken();
//   console.log(result)

//   const response = await fetch("http://localhost:3001/api/link/update", {
//     body: JSON.stringify({
//       linkId: "9b8a0e3b-b3c3-44c5-b4b9-900f6b3a1110",
//       userId: "6fad26d0-31c1-4887-b496-83d870e0637c",
//       originalUrl: "https://example.com/my-portfolio",
//       title: "My Portfolioooo",
//       description: "Lood Personal Portfolio",
//       image: "https://example.com/images/portfolio-preview.png",
//       isPreviewEnabled: true,
//       isActive: true,
//       expiresAt: "2026-12-31T23:59:59.000Z",
//     }),
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${result.accessToken}`
//     }
//   });

//   console.log(await response.json());
// }


// async function getLinkById() {
//   const result = await getJwtToken();

//   const query = "M";
//   const page = 1;
//   const limit = 20;

//   const response = await fetch(
//     `http://localhost:3001/api/link?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
//     {
//       method: "GET",
//       headers: {
//         "Authorization": `Bearer ${result.accessToken}`,
//       },
//     }
//   );


//   console.log(await response.json());
// }

async function me() {
  const result = await getJwtToken();

  const response = await fetch(
    `http://localhost:3001/api/auth/me`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${result.accessToken}`,
      },
    }
  );

  console.log(await response.json());
}

me()


// xinawol240@ixospace.com

// {
//   linkId: "9b8a0e3b-b3c3-44c5-b4b9-900f6b3a1110",
//   userId: "6fad26d0-31c1-4887-b496-83d870e0637c",
//   slug: "my-portfolio",
//   originalUrl: "https://example.com/my-portfolio",
//   title: "My Portfolio",
//   description: "Personal portfolio showcasing my projects and experience",
//   image: "https://example.com/images/portfolio-preview.png",
//   isPreviewEnabled: true,
//   isActive: true,
//   expiresAt: "2026-12-31T23:59:59.000Z",
//   clickCount: 0,
//   createdAt: "2026-01-16T17:08:55.788Z",
//   updatedAt: "2026-01-16T17:08:55.779Z",
// }