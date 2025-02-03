// import { Typography, Box, Card, CardContent, Avatar, Grid, Button } from '@mui/material';
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import CommentIcon from '@mui/icons-material/Comment';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import DescriptionIcon from '@mui/icons-material/Description';

// const AuthorDetail = () => {
//   const [authorDetail, setAuthorDetail] = useState(null);
//   const [sortedPosts, setSortedPosts] = useState([]);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchAuthorData = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/authors/${id}`);
//         if (!res.ok) throw new Error('Author not found');
//         const data = await res.json();
//         setAuthorDetail(data);
//         console.log(data);
//       } catch (err) {
//         console.log('Error fetching author data:', err);
//       }
//     };

//     fetchAuthorData();
//   }, [id]);

//   useEffect(() => {
//     const fetchPostsData = async () => {
//       try {
//         const res = await fetch('http://localhost:3000/posts');
//         if (!res.ok) throw new Error('Posts not found');
//         const data = await res.json();
//         // Filter posts by the current author
//         const authorPosts = data.filter((post) => post.authorId === Number(id));
//         setSortedPosts(authorPosts);
//       } catch (err) {
//         console.log('Error fetching posts data:', err);
//       }
//     };

//     fetchPostsData();
//   }, [id]);

//   const handleSortPosts = (type) => {
//     const sorted = [...sortedPosts];
//     if (type === 'likes') {
//       sorted.sort((a, b) => b.numLikes - a.numLikes);
//     } else if (type === 'comments') {
//       sorted.sort((a, b) => b.numComments - a.numComments);
//     }
//     setSortedPosts(sorted.slice(0, 5)); // Show only the top 5 posts
//   };

//   if (!authorDetail) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Box padding={2}>
//       <Box>
//         <Typography variant="h4" gutterBottom>
//           Author Details
//         </Typography>
//         <Grid container spacing={2} justifyContent="center">
//           <Grid item xs={12} sm={6} md={4}>
//             <Card
//               sx={{
//                 minHeight: '250px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: '80%',
//                 maxWidth: '400px',
//                 margin: '0 auto',
//                 borderRadius: 9,
//                 border: '4px solid blue',
//                 boxShadow: 20,
//                 color: "blue",
//               }}
//             >
//               <CardContent sx={{ textAlign: 'center' }}>
//                 <Avatar
//                   sx={{ marginBottom: 2 }}
//                   alt={authorDetail.firstName}
//                   src={authorDetail.avatarUrl || '/static/images/avatar/1.jpg'}
//                 />
//                 <Typography variant="h6" color="lightred">
//                   {authorDetail.firstName} {authorDetail.lastName}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   <strong>Phone:</strong> {authorDetail.phone}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" marginTop={1}>
//                   <strong>Posts:</strong> {authorDetail.numPosts}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   <strong>Likes:</strong> {authorDetail.numLikes}
//                 </Typography>
//               </CardContent>
//             </Card>

//             {/* Button to sort by likes */}
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => handleSortPosts('likes')}
//               sx={{ marginTop: 2 }}
//             >
//               Sort by Likes
//             </Button>

//             {/* Button to sort by comments */}
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => handleSortPosts('comments')}
//               sx={{ marginTop: 2, marginLeft: 2 }}
//             >
//               Sort by Comments
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Display the sorted posts */}
//       <Box>
//         {sortedPosts.map((list) => (
//           <Card key={list.id} sx={{  marginBottom: 2,
//             marginTop: 4,
//             color: "black",
//             fontFamily: 'Arial, sans-serif',
//             border: 4,
//             borderColor: 'black',
//             borderRadius: 2,
//             backgroundColor: 'lightblue', // Adds background color
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Adds depth
//             transition: 'transform 0.3s, box-shadow 0.3s', // Smooth transition
//             '&:hover': {
//               transform: 'scale(1.05)', // Slight zoom effect on hover
//               boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Stronger shadow on hover
//                 backgroundColor: 'skyblue',}}}>
//             <CardContent>
//               <Typography variant="h6">{list.title}</Typography>
//               <Typography variant="body2">{list.datePublished}</Typography>
//               <Typography>
//                 <ThumbUpIcon /> Likes: {list.numLikes}
//               </Typography>
//               <Typography>
//                 <CommentIcon /> Comments: {list.numComments}
//               </Typography>
//               <Typography>
//                 <DescriptionIcon /> Description: {list.description}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default AuthorDetail;














import { Typography, Box, Card, CardContent, Avatar, Grid, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DescriptionIcon from '@mui/icons-material/Description';

const AuthorDetail = () => {
  const [authorDetail, setAuthorDetail] = useState(null);
  const [sortedPosts, setSortedPosts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();  // Hook to handle navigation

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/authors/${id}`);
        if (!res.ok) throw new Error('Author not found');
        const data = await res.json();
        setAuthorDetail(data);
        console.log(data);
      } catch (err) {
        console.log('Error fetching author data:', err);
      }
    };

    fetchAuthorData();
  }, [id]);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const res = await fetch('http://localhost:3000/posts');
        if (!res.ok) throw new Error('Posts not found');
        const data = await res.json();
        // Filter posts by the current author
        const authorPosts = data.filter((post) => post.authorId === Number(id));
        setSortedPosts(authorPosts);
      } catch (err) {
        console.log('Error fetching posts data:', err);
      }
    };

    fetchPostsData();
  }, [id]);

  const handleSortPosts = (type) => {
    const sorted = [...sortedPosts];
    if (type === 'likes') {
      sorted.sort((a, b) => b.numLikes - a.numLikes);
    } else if (type === 'comments') {
      sorted.sort((a, b) => b.numComments - a.numComments);
    }
    setSortedPosts(sorted.slice(0, 5)); // Show only the top 5 posts
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`); // Navigate to the post details page
  };

  if (!authorDetail) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box padding={2}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Author Details
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                minHeight: '250px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                maxWidth: '400px',
                margin: '0 auto',
                borderRadius: 9,
                border: '4px solid blue',
                boxShadow: 20,
                color: "blue",
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{ marginBottom: 2 }}
                  alt={authorDetail.firstName}
                  src={authorDetail.avatarUrl || '/static/images/avatar/1.jpg'}
                />
                <Typography variant="h6" color="lightred">
                  {authorDetail.firstName} {authorDetail.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Phone:</strong> {authorDetail.phone}
                </Typography>
                <Typography variant="body2" color="textSecondary" marginTop={1}>
                  <strong>Posts:</strong> {authorDetail.numPosts}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Likes:</strong> {authorDetail.numLikes}
                </Typography>
              </CardContent>
            </Card>

            {/* Button to sort by likes */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSortPosts('likes')}
              sx={{ marginTop: 2 }}
            >
              Sort by Likes
            </Button>

            {/* Button to sort by comments */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSortPosts('comments')}
              sx={{ marginTop: 2, marginLeft: 2 }}
            >
              Sort by Comments
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Display the sorted posts */}
      <Box>
        {sortedPosts.map((list) => (
          <Card 
            key={list.id} 
            sx={{
              marginBottom: 2,
              marginTop: 4,
              color: "black",
              fontFamily: 'Arial, sans-serif',
              border: 4,
              borderColor: 'black',
              borderRadius: 2,
              backgroundColor: 'lightblue',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                backgroundColor: 'skyblue',
              }
            }}
            onClick={() => handlePostClick(list.id)}  // Add onClick handler to navigate
          >
            <CardContent>
              <Typography variant="h6">{list.title}</Typography>
              <Typography variant="body2">{list.datePublished}</Typography>
              <Typography>
                <ThumbUpIcon /> Likes: {list.numLikes}
              </Typography>
              <Typography>
                <CommentIcon /> Comments: {list.numComments}
              </Typography>
              <Typography>
                <DescriptionIcon /> Description: {list.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AuthorDetail;

