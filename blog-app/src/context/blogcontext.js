// import { createContext, useContext, useState, useEffect } from "react";

// const BlogContext = createContext();

// export const useBlogContext = () => {
//   return useContext(BlogContext);
// };

// export const BlogProvider = ({ children }) => {
//   const host = "http://localhost:5000";
//   const [blogs, setBlogs] = useState([]);



  
 

//   //Add Blog
//   const addBlog = async (newBlog) => {
//     //API call

//     const formData = new URLSearchParams();
//     for (const [key, value] of Object.entries(newBlog)) {
//       formData.append(key, value);
//     }
//     const response = await fetch(`${host}/api/blog/addblog`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//         "auth-token":
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZGFkYTNkYTg0YjcwNTE5MGJjYjMwIn0sImlhdCI6MTY5NDM0NjY3OH0.ybdyPcVi7tA4IIPl6D23SDiVKCzHZqVZOCZ-fbIPv8w",
//       },
//       body: formData, // body data type must match "Content-Type" header
//     });
//     //return response.json(); // parses JSON response into native JavaScript objects

//     //client side code

//     setBlogs([...blogs,newBlog]);
//   };

 
//    //to fetch the blogs

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await fetch(`${host}/api/blog/fetchallblogs`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error fetching blogs: ${response.statusText}`);
//         }

//         const blogData = await response.json();
//         console.log(blogData);
//         // Update the state with the fetched blogs
//         setBlogs(blogData);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     // Call the fetchBlogs function when the component mounts
//     fetchBlogs();
//   }, []);




//   //Delete the Blog
//   const deleteBlog = (id) => {
//     //API call

//     //client side code
//     //updatedblogs will contain only the blogs that doesn't includes the id that is clicked
//     const updatedblogs = blogs.filter((blog) => blog._id !== id);
//     setBlogs(updatedblogs);
//   };

//   //update the Blog
//   const editBlog = (blog) => {
//     //API call

//     //client side code
//     const newBlog = blogs.find((item) => item._id === blog._id);
//     newBlog.title = blog.title;
//     newBlog.description = blog.description;
//   };

//   return (
//     <BlogContext.Provider
//       value={{ blogs, addBlog, deleteBlog, editBlog }}
//     >
//       {children}
//     </BlogContext.Provider>
//   );
// };



import { createContext, useContext, useState, useEffect } from "react";

const BlogContext = createContext();

export const useBlogContext = () => {
  return useContext(BlogContext);
};

export const BlogProvider = ({ children }) => {
  const host = "http://localhost:5000";
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs function
  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${host}/api/blog/fetchallblogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching blogs: ${response.statusText}`);
      }

      const blogData = await response.json();

      // Update the state with the fetched blogs
      setBlogs(blogData);
    } catch (error) {
      console.error(error);
    }
  };

  // Call the fetchBlogs function when the component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Add Blog
  const addBlog = async (newBlog) => {
    // API call to add the new blog
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(newBlog)) {
      formData.append(key, value);
    }

    const response = await fetch(`${host}/api/blog/addblog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZGNjY2QzMGZmYTRkMDVjYTM4NGE5In0sImlhdCI6MTY5NDM1NDY1MX0.kpy148zpuVDBT08e7eRmJVq-hgHVfUbWnm8yYr-9H2w",
      },
      body: formData,
    });

    if (response.ok) {
      // Fetch the updated blogs after adding the new one
      fetchBlogs();
    } else {
      console.error(`Error adding a new blog: ${response.statusText}`);
    }
  };

  // Delete the Blog
  const deleteBlog = async (id) => {
    // API call to delete the blog
    const response = await fetch(`${host}/api/blog/deleteblog/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZGNjY2QzMGZmYTRkMDVjYTM4NGE5In0sImlhdCI6MTY5NDM1NDY1MX0.kpy148zpuVDBT08e7eRmJVq-hgHVfUbWnm8yYr-9H2w",
      },
    });
    return response.json(); 
    // Client side code
    const updatedBlogs = blogs.filter((blog) => blog._id !== id);
    setBlogs(updatedBlogs);
  };

  // Update the Blog
  const editBlog = (blog) => {
    // API call to update the blog

    // Client side code
    const updatedBlogs = blogs.map((item) =>
      item._id === blog._id ? { ...item, title: blog.title, description: blog.description } : item
    );
    setBlogs(updatedBlogs);
  };

  return (
    <BlogContext.Provider
      value={{ blogs, addBlog, deleteBlog, editBlog }}
    >
      {children}
    </BlogContext.Provider>
  );
};




