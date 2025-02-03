import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const [postDetails, setPostDetails] = useState(null);
  const [authorDetails, setAuthorDetails] = useState([]);
  const [commentDetails, setCommentDetails] = useState([]);
  const [likesDetails, setLikesDetails] = useState([]);
  const [showLikes, setShowLikes] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const { id } = useParams();

  // Fetching Post Details
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching post details: ${response.statusText}`);
        }
        const data = await response.json();
        setPostDetails(data);
      } catch (error) {
        console.log('Error fetching post:', error);
      }
    };

    fetchPostDetails();
  }, [id]);

  // Fetching Author Details
  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/authors');
        if (!response.ok) {
          throw new Error(`Error fetching author details: ${response.statusText}`);
        }
        const data = await response.json();
        setAuthorDetails(data);
      } catch (err) {
        console.log('Error fetching author:', err);
      }
    };

    fetchAuthorDetails();
  }, [id]);

  // Fetching Comment Details
  useEffect(() => {
    const fetchCommentsDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/comments');
        if (!response.ok) {
          throw new Error(`Error fetching comments details: ${response.statusText}`);
        }
        const data = await response.json();
        setCommentDetails(data);
      } catch (err) {
        console.log('Error fetching comments data', err);
      }
    };

    fetchCommentsDetails();
  }, [id]);

  // Fetching Like Details
  useEffect(() => {
    const fetchLikeDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/likes');
        if (!response.ok) {
          throw new Error(`Error fetching likes details: ${response.statusText}`);
        }
        const data = await response.json();
        setLikesDetails(data);
      } catch (err) {
        console.log('Error fetching like data', err);
      }
    };

    fetchLikeDetails();
  }, [id]);

  // Getting Author Full Name
  const getAuthorFullName = (authorId) => {
    const author = authorDetails.find((author) => author.id === String(authorId));
    return author ? `${author.firstName} ${author.lastName}` : "Unknown Author";
  };

  // Filtering comments and likes for the current post
  const postComments = commentDetails.filter((comment) => comment.postId === Number(id));
  const postLikes = likesDetails.filter((like) => like.postId === Number(id));

  if (!postDetails || !authorDetails.length || !commentDetails.length || !likesDetails.length) {
    return <Typography>Loading...</Typography>;
  }

  // Handle show likes and comments
  const handleShowLikes = () => setShowLikes((prev) => !prev);
  const handleShowComments = () => setShowComments((prev) => !prev);

  // Get list of authors who liked the post
  const likedAuthors = postLikes.map((like) => getAuthorFullName(like.authorId));
  // Get list of authors who commented on the post
  const commentedAuthors = postComments.map((comment) => getAuthorFullName(comment.authorId));

  return (
    <Box padding={2} my={5}>
      <Card>
        <CardContent>
          <Typography variant="h4">{postDetails.title}</Typography>
          <Typography variant="body1">
            <strong>Name:</strong>{getAuthorFullName(postDetails.authorId)}
          </Typography>
          <Typography variant="body2">
            <strong>Date:</strong>{postDetails.datePublished}
          </Typography>
          <Typography variant='body1' color='primary'>
            <strong>Like:</strong>{postDetails.numLikes}
          </Typography>
          <Typography variant='body1' color='primary'>
            <strong>Comment:</strong>{postDetails.numComments}
          </Typography>
          <Typography variant="body1">
            <strong>Description:</strong>{postDetails.description}
          </Typography>
        </CardContent>
      </Card>

      <Box display={'flex'} padding={2}>
        <Button variant='outlined' onClick={handleShowLikes} sx={{ml: 20}}>Like</Button>
        <Button variant='outlined' onClick={handleShowComments} sx={{ml: 70}}>Comment</Button>
      </Box>

      {/* Display Likes */}
      {showLikes && (
        <Box mt={2}>
          <Typography variant="h6">Authors who liked this post:</Typography>
          <ul>
            {likedAuthors.map((author, index) => (
              <li key={index}>{author}</li>
            ))}
          </ul>
        </Box>
      )}

      {/* Display Comments */}
      {showComments && (
        <Box mt={2}>
          <Typography variant="h6">Authors who commented on this post:</Typography>
          <ul>
            {commentedAuthors.map((author, index) => (
              <li key={index}>{author}</li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default PostDetail;









































// import { Box, Button, Card, CardContent, Typography } from '@mui/material';
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const PostDetail = () => {
//   const [postDetails, setPostDetails] = useState(null);
//   const [authorDetails, setAuthorDetails] = useState([]);
//   const [commentDetails, setCommentDetails] = useState([]);
//   const [likesDetails, setLikesDetails] = useState([]);
//   const [showLikes, setShowLikes] = useState(false);
//   const [showComments, setShowComments] = useState(false);

//   const { id } = useParams();

//   // Fetching Post Details
//   useEffect(() => {
//     const fetchPostDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/posts/${id}`);
//         if (!response.ok) {
//           throw new Error(`Error fetching post details: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setPostDetails(data);
//       } catch (error) {
//         console.log('Error fetching post:', error);
//       }
//     };

//     fetchPostDetails();
//   }, [id]);

//   // Fetching Author Details
//   useEffect(() => {
//     const fetchAuthorDetails = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/authors');
//         if (!response.ok) {
//           throw new Error(`Error fetching author details: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setAuthorDetails(data);
//       } catch (err) {
//         console.log('Error fetching author:', err);
//       }
//     };

//     fetchAuthorDetails();
//   }, [id]);

//   // Fetching Comment Details
//   useEffect(() => {
//     const fetchCommentsDetails = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/comments');
//         if (!response.ok) {
//           throw new Error(`Error fetching comments details: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setCommentDetails(data);
//       } catch (err) {
//         console.log('Error fetching comments data', err);
//       }
//     };

//     fetchCommentsDetails();
//   }, [id]);

//   // Fetching Like Details
//   useEffect(() => {
//     const fetchLikeDetails = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/likes');
//         if (!response.ok) {
//           throw new Error(`Error fetching likes details: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setLikesDetails(data);
//       } catch (err) {
//         console.log('Error fetching like data', err);
//       }
//     };

//     fetchLikeDetails();
//   }, [id]);

//   // Getting Author Full Name
//   const getAuthorFullName = (authorId) => {
//     const author = authorDetails.find((author) => author.id === String(authorId));
//     return author ? `${author.firstName} ${author.lastName}` : "Unknown Author";
//   };

//   // Filtering comments and likes for the current post
//   const postComments = commentDetails.filter((comment) => comment.postId === Number(id));
//   const postLikes = likesDetails.filter((like) => like.postId === Number(id));

//   if (!postDetails || !authorDetails.length || !commentDetails.length || !likesDetails.length) {
//     return <Typography>Loading...</Typography>;
//   }


//   return (
//     <Box padding={2} my={5}>
//       <Card>
//         <CardContent>
//         <Typography variant="h4">{postDetails.title}</Typography>
//       <Typography variant="body1">
//         <strong>Name:</strong>{getAuthorFullName(postDetails.authorId)}</Typography>
//       <Typography variant="body2">
//         <strong>Date:</strong>{postDetails.datePublished}</Typography>
//       <Typography variant='body1' color='primary'>
//         <strong>Like:</strong>{postDetails.numLikes}
//       </Typography>
//       <Typography variant='body1' color='primary'>
//         <strong>Comment:</strong>{postDetails.numComments}
//       </Typography>
//       <Typography variant="body1">
//         <strong>Description:</strong>{postDetails.description}</Typography>
//         </CardContent>
//       </Card>
      
//       <Box display={'flex'} padding={2}>
//         <Button variant='outlined' sx={{ml: 20}}>Like</Button>
//         <Button variant='outlined' sx={{ml: 70}}>Comment</Button>
//       </Box>

      
//     </Box>
//   );
// };

// export default PostDetail;























// import { Typography } from '@mui/material';
// import React, {  useState ,useEffect } from 'react'
// import { useParams } from 'react-router-dom';

// const  PostDetail=() => {
//     const[postDetails,setDetails] = useState(null);
//     const[authorDetails,seAuthortDetails] = useState([]);
//     const[commentDetails,setCommentDetails] = useState([]);
//     const[likesDetails,setLikesDetails] = useState([]);
//     const[showLikes,setShowLikes] = useState(false);
//     const[showComments,setShowComments] = useState(false);

//     const{ id } = useParams();


//     useEffect(() => {
//         const fetchPostDetails = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/posts/${id}');
//                 if (!response.ok) {
//                     throw new Error('Error fetch post details: $(response.stautsText)');
//                 }
//                 const data = await respose.json();
//                 setPostDetails(data);
//             }catch (error) {
//                 console.log('Error fetchingf post', err);
//             }
//         };

//         fetchPostDetails();
        
//     }, [id]);

//     //fetching authors
//     useEffect(() => {})
//     const fetchAuthorDetails = async () => {
//         try{
//             const response = await fetch(`http://localhost:3000/authors/`);
//             if (!response.ok){
//                 throw new Error(`Error fetching author details: $(response.stattusText)`);
//             } catch (err) {
//                 console.log('Error fetching author',err);
//             }
//             };

//             fetchAuthorDetails();
//         }, [id]);

//         //fetching comments Details
//         useEffect(() => {

//             const fetchCommentsDetails = async () => {
//                 try{
//                     const response = await fetch('http://localhost:3000/comments/');
//                     if(!response.ok) {
//                         throw new Error (`Error fetching comments details: ${response.statusText}`)
//                     }
//                     const data = await response.json();
//                     setCommentDetails(data);
//                 } catch (err) {
//                     console.log('Error fetching comments data', err);
//                 }
//             };
//             fetchCommentsDetails();
//         }, [id]);
//         };
//         //Fetching Like Details

//         useEffect(() => {
//           const fetchLikeDetails = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3000/likes/`);
//                 if (!response.ok) {
//                     throw new Error(`Error fetching comments details: ${response.statusText}`)
                
//             }
//             const data = await response.json();
//             setLikesDetails(data);

//         } catch (err){
//             console.log('Error fetching comment data', err);
//         }
//     };

//     fetchLikeDetails();
// }, [id]

// //Getting Author Name
// const getAuthorFullName = (authorId) => {
//    const author = authorDetails.find(author) => author.id === String(authorId));
//    return author ? `${author.firstName} $(author.lastName)` : " ";
// };

// //Filter comments for the current post
// const postComments = commentDetails.filter(comment => comment.postId === Number(id))

// //Filter Likes for the current post
// const postLikes = likesDetails.filter(like => like.postId === Number(id))
// console.log(postLikes);


// if (!postLikes) {
//     return <Typography>Loading.....</Typography>
// }

// return (















// )




    


    







//   return (
//     <div>PostDetail</div>
//   )
// }

// export default PostDetail