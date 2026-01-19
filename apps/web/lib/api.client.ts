export const apiClient = {
    fetch: async (slug: string, options: RequestInit = {}) => {
      const token = {
        accessToken: "",
      };
      
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token.accessToken}` }),
        ...options.headers,
      };

      console.log(process.env.API_BASE_URL)
      const finalEndPoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${slug}`;

      try {
        const response = await fetch(finalEndPoint, {
          ...options,
          headers,
          credentials: "include"
        });
        
        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ message: `HTTP error! Status: ${response.status}` }));
  
          throw new Error(
            errorData?.message ||
              `An error occurred while fetching ${slug}. Status: ${response.status}`
          );
        }

        const contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")) {
          return (await response.json());
        } else {
          return null;
        }
      }catch(err) {
        throw err;
      }
    }
}