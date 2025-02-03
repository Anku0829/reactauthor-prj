import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, Pagination, TextField, Dialog, DialogActions, DialogContent, DialogTitle, TextField as MuiTextField } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from 'react-router-dom';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [openDialog, setOpenDialog] = useState(false); 
  const [openCreateDialog, setOpenCreateDialog] = useState(false);  // New state for Create Dialog
  const [currentPost, setCurrentPost] = useState(null); 
  const [newPost, setNewPost] = useState({ title: '', description: '', numLikes: 0, numComments: 0, datePublished: '' }); // New post state
  const postsPerPage = 6;
  const navigate = useNavigate();

  // Fetch posts data 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        if (!response.ok) {
          throw new Error('Error fetching posts');
        }
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data); 
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter posts based on search query
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );

    setFilteredPosts(filtered); // Update the filtered posts list
    setCurrentPage(1); // Reset to the first page after searching
  };

  // Calculate the index range for the current page
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;

  // Get the posts for the current page
  const currentPosts = filteredPosts.slice(firstIndex, lastIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleViewProfile = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleEditPost = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    setCurrentPost(postToEdit); 
    setOpenDialog(true); 
  };

  const handleUpdatePost = async () => {
    if (currentPost) {
      try {
        const response = await fetch(`http://localhost:3000/posts/${currentPost.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentPost),
        });

        if (response.ok) {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === currentPost.id ? currentPost : post
            )
          );
          setFilteredPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === currentPost.id ? currentPost : post
            )
          );
          setOpenDialog(false); 
        } else {
          alert('Failed to update post.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
          setFilteredPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } else {
          alert('Failed to delete post.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Handle dialog input change for Edit and Create
  const handleDialogInputChange = (event) => {
    const { name, value } = event.target;
    if (currentPost) {
      setCurrentPost((prevPost) => ({ ...prevPost, [name]: value }));
    } else {
      setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
    }
  };

  // Handle create post
  const handleCreatePost = async () => {
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const createdPost = await response.json();
        setPosts((prevPosts) => [createdPost, ...prevPosts]);
        setFilteredPosts((prevPosts) => [createdPost, ...prevPosts]);
        setOpenCreateDialog(false); 
        setNewPost({ title: '', description: '', numLikes: 0, numComments: 0, datePublished: '' }); // Reset new post form
      } else {
        alert('Failed to create post.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box padding={2} marginTop={8}>
      {/* Create Post Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCreateDialog(true)} // Open Create Post Dialog
        sx={{ marginBottom: 3 }}
      >
        Create Post
      </Button>

      {/* Search Input */}
      <TextField
        label="Search by Post Title"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: 3, marginRight: 50 }}
      />

      {/* No results found message */}
      {filteredPosts.length === 0 ? (
        <Typography variant="h6" color="error" align="center">
          No posts found
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {currentPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} lg={2.8} key={post.id}>
              <Card
                sx={{
                  marginTop: 3,
                  backgroundColor: 'lightblue',
                  textAlign: 'center',
                  height: '300px',
                  borderRadius: 9,
                  border: '4px solid blue',
                  boxShadow: 20,
                }}
              >
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2">{post.datePublished}</Typography>
                  <Typography>
                    <ThumbUpIcon /> Likes: {post.numLikes}
                  </Typography>
                  <Typography>
                    <CommentIcon /> Comments: {post.numComments}
                  </Typography>

                  {/* Post Details Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewProfile(post.id)}
                    sx={{ marginTop: 2 }}
                  >
                    Post Details
                  </Button>

                  {/* Edit Button */}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEditPost(post.id)}
                    sx={{ marginLeft: 3, marginTop: 2 }}
                  >
                    Edit
                  </Button>

                  {/* Delete Button */}
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeletePost(post.id)}
                    sx={{ marginLeft: 3, marginTop: 2 }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {filteredPosts.length > 0 && (
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Pagination
            count={totalPages} // Total pages to render
            page={currentPage} // Current page
            color="secondary"
            onChange={handlePageChange} // Handle page change
          />
        </Box>
      )}

      {/* Edit Post Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          {currentPost && (
            <>
              <MuiTextField
                label="Title"
                variant="outlined"
                fullWidth
                value={currentPost.title}
                onChange={handleDialogInputChange}
                name="title"
                sx={{ marginBottom: 2 }}
              />
              <MuiTextField
                label="Date Published"
                variant="outlined"
                fullWidth
                value={currentPost.datePublished}
                onChange={handleDialogInputChange}
                name="datePublished"
                sx={{ marginBottom: 2 }}
              />
              <MuiTextField
                label="Number of Likes"
                variant="outlined"
                fullWidth
                type="number"
                value={currentPost.numLikes}
                onChange={handleDialogInputChange}
                name="numLikes"
                sx={{ marginBottom: 2 }}
              />
              <MuiTextField
                label="Number of Comments"
                variant="outlined"
                fullWidth
                type="number"
                value={currentPost.numComments}
                onChange={handleDialogInputChange}
                name="numComments"
                sx={{ marginBottom: 2 }}
              />
              <MuiTextField
                label="Description"
                variant="outlined"
                fullWidth
                value={currentPost.description}
                onChange={handleDialogInputChange}
                name="description"
                multiline
                rows={4}
                sx={{ marginBottom: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdatePost} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Post Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <MuiTextField
            label="Title"
            variant="outlined"
            fullWidth
            value={newPost.title}
            onChange={handleDialogInputChange}
            name="title"
            sx={{ marginBottom: 2 }}
          />
          <MuiTextField
            label="Date Published"
            variant="outlined"
            fullWidth
            value={newPost.datePublished}
            onChange={handleDialogInputChange}
            name="datePublished"
            sx={{ marginBottom: 2 }}
          />
          <MuiTextField
            label="Number of Likes"
            variant="outlined"
            fullWidth
            type="number"
            value={newPost.numLikes}
            onChange={handleDialogInputChange}
            name="numLikes"
            sx={{ marginBottom: 2 }}
          />
          <MuiTextField
            label="Number of Comments"
            variant="outlined"
            fullWidth
            type="number"
            value={newPost.numComments}
            onChange={handleDialogInputChange}
            name="numComments"
            sx={{ marginBottom: 2 }}
          />
          <MuiTextField
            label="Description"
            variant="outlined"
            fullWidth
            value={newPost.description}
            onChange={handleDialogInputChange}
            name="description"
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreatePost} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PostsList;















































































































// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, Typography, Grid, Box, Button, Pagination, TextField, Dialog, DialogActions, DialogContent, DialogTitle, TextField as MuiTextField } from '@mui/material';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import CommentIcon from '@mui/icons-material/Comment';
// import { useNavigate } from 'react-router-dom';

// const PostsList = () => {
//   const [posts, setPosts] = useState([]);
//   const [filteredPosts, setFilteredPosts] = useState([]); 
//   const [searchQuery, setSearchQuery] = useState(''); 
//   const [currentPage, setCurrentPage] = useState(1); 
//   const [openDialog, setOpenDialog] = useState(false); 
//   const [currentPost, setCurrentPost] = useState(null); 
//   const postsPerPage = 6;
//   const navigate = useNavigate();

//   // Fetch posts data 
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/posts');
//         if (!response.ok) {
//           throw new Error('Error fetching posts');
//         }
//         const data = await response.json();
//         setPosts(data);
//         setFilteredPosts(data); 
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchPosts();
//   }, []);

  
//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

  
//   const handleSearchChange = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);

//     // Filter posts based on search query
//     const filtered = posts.filter((post) =>
//       post.title.toLowerCase().includes(query)
//     );

//     setFilteredPosts(filtered); // Update the filtered posts list
//     setCurrentPage(1); // Reset to the first page after searching
//   };

//   // Calculate the index range for the current page
//   const lastIndex = currentPage * postsPerPage;
//   const firstIndex = lastIndex - postsPerPage;

//   // Get the posts for the current page
//   const currentPosts = filteredPosts.slice(firstIndex, lastIndex);

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

//   // Navigate to post details page
//   const handleViewProfile = (postId) => {
//     navigate(`/post/${postId}`);
//   };

//   // Handle edit post
//   const handleEditPost = (postId) => {
//     const postToEdit = posts.find((post) => post.id === postId);
//     setCurrentPost(postToEdit); 
//     setOpenDialog(true); 
//   };

  
//   const handleUpdatePost = async () => {
//     if (currentPost) {
//       try {
//         const response = await fetch(`http://localhost:3000/posts/${currentPost.id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(currentPost),
//         });

//         if (response.ok) {
//           setPosts((prevPosts) =>
//             prevPosts.map((post) =>
//               post.id === currentPost.id ? currentPost : post
//             )
//           );
//           setFilteredPosts((prevPosts) =>
//             prevPosts.map((post) =>
//               post.id === currentPost.id ? currentPost : post
//             )
//           );
//           setOpenDialog(false); 
//         } else {
//           alert('Failed to update post.');
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   // Handle delete post
//   const handleDeletePost = async (postId) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this post?');
//     if (confirmDelete) {
//       try {
//         const response = await fetch(`http://localhost:3000/posts/${postId}`, {
//           method: 'DELETE',
//         });

//         if (response.ok) {
//           setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
//           setFilteredPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
//         } else {
//           alert('Failed to delete post.');
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   // Handle dialog input change
//   const handleDialogInputChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentPost((prevPost) => ({ ...prevPost, [name]: value }));
//   };

//   return (
//     <Box padding={2} marginTop={8}>
//       {/* Search Input */}
//       <TextField
//         label="Search by Post Title"
//         variant="outlined"
//         fullWidth
//         value={searchQuery}
//         onChange={handleSearchChange}
//         sx={{ marginBottom: 3, marginRight: 50 }}
//       />

//       {/* No results found message */}
//       {filteredPosts.length === 0 ? (
//         <Typography variant="h6" color="error" align="center">
//           No posts found
//         </Typography>
//       ) : (
//         <Grid container spacing={2} justifyContent="center">
//           {currentPosts.map((post) => (
//             <Grid item xs={12} sm={6} md={4} lg={2.8} key={post.id}>
//               <Card
//                 sx={{
//                   marginTop: 3,
//                   backgroundColor: 'lightblue',
//                   textAlign: 'center',
//                   height: '300px',
//                   borderRadius: 9,
//                   border: '4px solid blue',
//                   boxShadow: 20,
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6">{post.title}</Typography>
//                   <Typography variant="body2">{post.datePublished}</Typography>
//                   <Typography>
//                     <ThumbUpIcon /> Likes: {post.numLikes}
//                   </Typography>
//                   <Typography>
//                     <CommentIcon /> Comments: {post.numComments}
//                   </Typography>

//                   {/* Post Details Button */}
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleViewProfile(post.id)}
//                     sx={{ marginTop: 2 }}
//                   >
//                     Post Details
//                   </Button>

//                   {/* Edit Button */}
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => handleEditPost(post.id)}
//                     sx={{ marginLeft: 3, marginTop: 2 }}
//                   >
//                     Edit
//                   </Button>

//                   {/* Delete Button */}
//                   <Button
//                     variant="contained"
//                     color="error"
//                     onClick={() => handleDeletePost(post.id)}
//                     sx={{ marginLeft: 3, marginTop: 2 }}
//                   >
//                     Delete
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* Pagination */}
//       {filteredPosts.length > 0 && (
//         <Box display="flex" justifyContent="center" marginTop={2}>
//           <Pagination
//             count={totalPages} // Total pages to render
//             page={currentPage} // Current page
//             color="secondary"
//             onChange={handlePageChange} // Handle page change
//           />
//         </Box>
//       )}

//       {/* Edit Post Dialog */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Edit Post</DialogTitle>
//         <DialogContent>
//           {currentPost && (
//             <>
//               <MuiTextField
//                 label="Title"
//                 variant="outlined"
//                 fullWidth
//                 value={currentPost.title}
//                 onChange={handleDialogInputChange}
//                 name="title"
//                 sx={{ marginBottom: 2 }}
//               />
//               <MuiTextField
//                 label="Date Published"
//                 variant="outlined"
//                 fullWidth
//                 value={currentPost.datePublished}
//                 onChange={handleDialogInputChange}
//                 name="datePublished"
//                 sx={{ marginBottom: 2 }}
//               />
//               <MuiTextField
//                 label="Number of Likes"
//                 variant="outlined"
//                 fullWidth
//                 type="number"
//                 value={currentPost.numLikes}
//                 onChange={handleDialogInputChange}
//                 name="numLikes"
//                 sx={{ marginBottom: 2 }}
//               />
//               <MuiTextField
//                 label="Number of Comments"
//                 variant="outlined"
//                 fullWidth
//                 type="number"
//                 value={currentPost.numComments}
//                 onChange={handleDialogInputChange}
//                 name="numComments"
//                 sx={{ marginBottom: 2 }}
//               />
//               <MuiTextField
//                 label="Description"
//                 variant="outlined"
//                 fullWidth
//                 value={currentPost.description}
//                 onChange={handleDialogInputChange}
//                 name="description"
//                 multiline
//                 rows={4}
//                 sx={{ marginBottom: 2 }}
//               />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleUpdatePost} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default PostsList;






















