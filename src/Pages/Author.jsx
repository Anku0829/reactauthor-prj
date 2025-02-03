// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, Typography, Grid, Box, Button, Avatar, Stack, Pagination, TextField } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import PostAddIcon from '@mui/icons-material/PostAdd';
// import CommentIcon from '@mui/icons-material/Comment';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import PhoneIcon from '@mui/icons-material/Phone';

// const URL = 'http://localhost:3000/authors';

// const Author = () => {
//   const [authors, setAuthors] = useState([]);
//   const [filteredAuthors, setFilteredAuthors] = useState([]); // For filtered authors based on search
//   const [searchQuery, setSearchQuery] = useState(''); // Search query state
//   const [currentPage, setCurrentPage] = useState(1); // Current page state
//   const postPerPage = 12; // Number of authors per page
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(URL)
//       .then((res) => res.json())
//       .then((data) => {
//         setAuthors(data);
//         setFilteredAuthors(data); // Set initial filtered authors to all authors
//       })
//       .catch((err) => {
//         console.log('Error fetching data', err);
//       });
//   }, []);

//   // Handle page change
//   const handlePageChange = (event, value) => {
//     setCurrentPage(value); // Set the new page when the user changes it
//   };

//   // Handle search input change
//   const handleSearchChange = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);

//     // Filter authors based on search query
//     const filtered = authors.filter(
//       (author) =>
//         author.firstName.toLowerCase().includes(query) ||
//         author.lastName.toLowerCase().includes(query)
//     );

//     setFilteredAuthors(filtered); // Update the filtered authors list
//     setCurrentPage(1); // Reset to the first page after searching
//   };

//   // Calculate the index range for the current page
//   const lastIndex = currentPage * postPerPage;
//   const firstIndex = lastIndex - postPerPage;

//   // Get the authors for the current page
//   const currentAuthors = filteredAuthors.slice(firstIndex, lastIndex);

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(filteredAuthors.length / postPerPage);

//   // Navigate to author profile page
//   const handleViewProfile = (authorId) => {
//     navigate(`/author/${authorId}`);
//   };

//   return (
//     <Box padding={2} marginTop={8}>
//       {/* Search Input */}
//       <TextField
//         label="Search Author"
//         variant="outlined"
//         fullWidth
//         value={searchQuery}
//         onChange={handleSearchChange}
//         sx={{ marginBottom: 3 }}
//       />

//       {/* Check if no authors match the search */}
//       {filteredAuthors.length === 0 ? (
//         <Typography variant="h6" color="error" align="center">
//           No authors found
//         </Typography>
//       ) : (
//         <Grid container spacing={2} justifyContent="center">
//           {currentAuthors.map((author) => (
//             <Grid item xs={12} sm={6} md={4} lg={2.8} key={author.id}>
//               <Card sx={{ marginTop: 3, backgroundColor: 'lightblue', textAlign: 'center', height: '300px', borderRadius: 9, border: '4px solid blue', boxShadow: 20 }}>
//                 <CardContent>
//                   <Stack direction="row" spacing={2} marginLeft={13}>
//                     <Avatar sx={{ width: 100, height: 100 }} alt="D" src="https://img.freepik.com/free-vector/smiling-redhaired-cartoon-boy_1308-174709.jpg?ga=GA1.1.544576586.1737007720&semt=ais_hybrid" />
//                   </Stack>
//                   <Typography variant="h5" component="div" color="black" marginTop={2}>
//                     {author.firstName} {author.lastName}
//                   </Typography>
//                   <Typography variant="body2" color="text.primary">
//                     <PhoneIcon /> {author.phone}
//                   </Typography>

//                   <Box sx={{ display: 'flex' }}>
//                     <Typography variant="body2" color="text.primary" sx={{ marginLight: 2, display: 'flex' }}>
//                       <PostAddIcon /> {author.numPosts}
//                     </Typography>

//                     <Typography variant="body2" color="text.primary" sx={{ marginLeft: 5, display: 'flex' }}>
//                       <CommentIcon /> {author.numComments}
//                     </Typography>

//                     <Typography variant="body2" color="text.primary" sx={{ marginLeft: 10, display: 'flex' }}>
//                       <ThumbUpIcon /> {author.numLikes}
//                     </Typography>
//                   </Box>

//                   {/* Author Details */}
//                   <Button variant="contained" color="primary" onClick={() => handleViewProfile(author.id)} sx={{ marginTop: 2 }}>
//                     View Profile
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* Pagination */}
//       {filteredAuthors.length > 0 && (
//         <Box display="flex" justifyContent="center" marginTop={2}>
//           <Pagination
//             count={totalPages} // Total pages to render
//             page={currentPage} // Current page
//             color="secondary"
//             onChange={handlePageChange} // Handle page change
//           />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Author;



























// // import React, { useEffect, useState } from 'react';
// // import { Card, CardContent, Typography, Grid, Box, Button, Avatar, Stack, Pagination } from '@mui/material';
// // import { useNavigate } from 'react-router-dom';
// // import PostAddIcon from '@mui/icons-material/PostAdd';
// // import CommentIcon from '@mui/icons-material/Comment';
// // import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// // import PhoneIcon from '@mui/icons-material/Phone';

// // const URL = 'http://localhost:3000/authors';

// // const Author = () => {
// //   const [authors, setAuthors] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);  // Current page state
// //   const postPerPage = 12; // Number of posts per page
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetch(URL)
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setAuthors(data);
// //         console.log(data); // Log data for debugging
// //       })
// //       .catch((err) => {
// //         console.log('Error fetching data', err);
// //       });
// //   }, []);

// //   // Handle page change
// //   const handlePageChange = (event, value) => {
// //     setCurrentPage(value); // Set the new page when the user changes it
// //   };

// //   // Calculate the index range for the current page
// //   const lastIndex = currentPage * postPerPage;
// //   const firstIndex = lastIndex - postPerPage;

// //   // Get the posts for the current page
// //   const currentAuthors = authors.slice(firstIndex, lastIndex);

// //   // Calculate the total number of pages
// //   const totalPages = Math.ceil(authors.length / postPerPage);

// //   // Navigate to author profile page
// //   const handleViewProfile = (authorId) => {
// //     navigate(`/author/${authorId}`);
// //   };

// //   return (
// //     <Box>
// //       <Grid container spacing={2} justifyContent="center">
// //         {currentAuthors.map((list) => (
// //           <Grid item xs={12} sm={6} md={4} lg={2.8} key={list.id}>
// //             <Card sx={{ marginTop: 8, backgroundColor: 'lightblue', textAlign: 'center', height: '300px', borderRadius: 9, border: '4px solid blue', boxShadow: 20 }}>
// //               <CardContent>
// //                 <Stack direction="row" spacing={2} marginLeft={13}>
// //                   <Avatar sx={{ width: 100, height: 100 }} alt="D" src="https://img.freepik.com/free-vector/smiling-redhaired-cartoon-boy_1308-174709.jpg?ga=GA1.1.544576586.1737007720&semt=ais_hybrid" />
// //                 </Stack>
// //                 <Typography variant="h5" component="div" color="black" marginTop={2}>
// //                   {list.firstName} {list.lastName}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.primary">
// //                   <PhoneIcon /> {list.phone}
// //                 </Typography>

// //                 <Box sx={{ display: 'flex' }}>
// //                   <Typography variant="body2" color="text.primary" sx={{ marginLight: 2, display: 'flex' }}>
// //                     <PostAddIcon /> {list.numPosts}
// //                   </Typography>

// //                   <Typography variant="body2" color="text.primary" sx={{ marginLeft: 5, display: 'flex' }}>
// //                     <CommentIcon /> {list.numComments}
// //                   </Typography>

// //                   <Typography variant="body2" color="text.primary" sx={{ marginLeft: 10, display: 'flex' }}>
// //                     <ThumbUpIcon /> {list.numLikes}
// //                   </Typography>
// //                 </Box>

// //                 {/* Author Details */}
// //                 <Button
// //                   variant="contained"
// //                   color="primary"
// //                   onClick={() => handleViewProfile(list.id)}
// //                   sx={{ marginTop: 2 }}
// //                 >
// //                   View Profile
// //                 </Button>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>

// //       {/* Pagination */}
// //       <Box display="flex" justifyContent="center" marginTop={2}>
// //         <Pagination
// //           count={totalPages} // Total pages to render
// //           page={currentPage} // Current page
// //           color="secondary"
// //           onChange={handlePageChange} // Handle page change
// //         />
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default Author;

























// //           // import React, { useEffect, useState } from 'react';
// //           // import { Card, CardContent, Typography, Grid, CardActions, Button, Avatar, CardHeader, Box, Toolbar, TextField, Autocomplete, Stack, Pagination } from '@mui/material';
// //           // import { blue, deepOrange } from '@mui/material/colors';
// //           // import { useNavigate } from 'react-router-dom';
// //           // import PostAddIcon from '@mui/icons-material/PostAdd';
// //           // import CommentIcon from '@mui/icons-material/Comment';
// //           // import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// //           // import PhoneIcon from '@mui/icons-material/Phone';
          
          
          
          
// //           // const URL = 'http://localhost:3000/authors';
          
// //           // const Author = () => {
// //           //   const [authors, setAuthors] = useState([]);
// //           //   // const [search , setSearch]  = useState('');
// //           //   const[currentPage , setCurrentPage] = useState(1);
// //           //   const postPerPage = 12;
// //           //   const navigate = useNavigate();
          
// //           //   useEffect(() => {
// //           //     fetch(URL)
// //           //       .then((res) => res.json())
// //           //       .then((data) => {
// //           //         const auth = data.slice(0,10);
// //           //         setAuthors(auth);
// //           //         console.log(data);
// //           //       })
// //           //       .catch((err) => {
// //           //       console.log('Error fetching data', err);
// //           //       });
// //           //   }, []);
          
            
          
          
          
// //           //   const handleViewProfile = (authorId) => {
// //           //     navigate(`/author/${authorId}`);
// //           //   };
          
// //           //   const lastPage = currentPage * postPerPage;
// //           //   const firstPage = lastPage - postPerPage;
// //           //   const currentAuthor = authors.slice(firstPage,lastPage);
          
// //           //   const pagination = (event , page ) => {
// //           //     setCurrentPage(page);
// //           //   };
          
// //           //   // const handleSearchAuthor =(event , value) => {
// //           //   //   setSearch(value);
// //           //   // };
          
          
// //           //   // const filteredAuthors = search
// //           //   //  ? Author.filter(a =>
// //           //   //    (`${a.firstNmae} ${a.lastName}`).toLowerCase().startsWith(search.toLowerCase())  
// //           //   //  )
// //           //   //  : Author;
          
// //           //   //  const filterSuggestions = Author
// //           //   //  .filter( a =>
// //           //   //  (`${a.firstNmae} ${a.lastName}`).toLowerCase().startsWith(search.toLowerCase()) && search
// //           //   //  )
// //           //   //  .map(a => `${a.firstName} ${a.lastName}`);
              
// //           //      return(
          
          
          
            
// //           //       <Box>
// //           //       {/* <Toolbar width="100%" padding={2}>
// //           //         <Typography marginRight="25%" variant="h5" style={{ fontWeight: 'bold' }}>
// //           //           Author Blog
// //           //         </Typography>
          
// //           //         <Autocomplete
// //           //           freeSolo
// //           //           options={filterSuggestions}
// //           //           value={search}
// //           //           sx={{ width: '400px' }}
// //           //           onInputChange={handleSearchAuthor}
// //           //           renderInput={(params) => (
// //           //             <TextField {...params} label="Search Author Name" variant="outlined" fullWidth />
// //           //           )}
// //           //         />
// //           //       </Toolbar> */}
              
          
// //           //       <Grid container spacing={2} justifyContent="center">
// //           //         {currentAuthor.map((list) => (
// //           //           <Grid item xs={12} sm={6} md={4} lg={2.8} key={list.id}>
// //           //             <Card sx={{  marginTop: 8,backgroundColor: 'lightblue', textAlign: 'center', height: '300px' , borderRadius: 9,  border: '4px solid blue' , boxShadow: 20   }}>
// //           //               <CardContent>
// //           //                 <Stack direction="row" spacing={2} marginLeft={13}>
// //           //                   <Avatar sx={{width: 100,  height: 100, }} 
// //           //                   alt="D"
// //           //                   src="https://img.freepik.com/free-vector/smiling-redhaired-cartoon-boy_1308-174709.jpg?ga=GA1.1.544576586.1737007720&semt=ais_hybrid" />
// //           //                 </Stack>
// //           //                 <Typography variant="h5" component="div" color="black" marginTop={2}>
// //           //                   {list.firstName} {list.lastName}
// //           //                 </Typography>
// //           //                 <Typography variant="body2" color="text.primary">
// //           //                 <PhoneIcon/> {list.phone}
// //           //                 </Typography>
          
// //           //                 <Box sx={{ display: 'flex' }}>
// //           //                   <Typography variant="body2" color="text.primary" sx={{ marginLight: 2, display: 'flex' }}>
// //           //                   <PostAddIcon /> {list.numPosts}
// //           //                   </Typography>
          
// //           //                   <Typography variant="body2" color="text.primary" sx={{ marginLeft: 5, display: 'flex' }}>
// //           //                   <CommentIcon/> {list.numComments}
// //           //                   </Typography>
          
// //           //                   <Typography variant="body2" color="text.primary" sx={{ marginLeft: 10, display: 'flex' }}>
// //           //                     <ThumbUpIcon/> {list.numLikes}
// //           //                   </Typography>
          
                           
// //           //                 </Box>
                        
// //           //                {/* Author Details */}
// //           //                 <Button
// //           //                   variant="contained"
// //           //                   color="primary"
// //           //                   onClick={() => handleViewProfile(list.id)}
// //           //                   sx={{ marginTop: 2 }}
// //           //                 >
// //           //                   View Profile
// //           //                 </Button>
// //           //               </CardContent>
// //           //             </Card>
                      
// //           //           </Grid>
// //           //         ))}
                  
// //           //       </Grid>
          
// //           //       {/* Pagination */}
// //           //       <Box display="flex" justifyContent="center" marginTop={2}>
// //           //         <Pagination
// //           //           count={Math.ceil(currentAuthor.length / postPerPage)}
// //           //           page={currentPage}
// //           //           color="secondary"
// //           //           onChange={pagination}
// //           //         /> 
// //           //        </Box>
// //           //     </Box>
// //           //   );
// //           // };
          
// //           //           export default Author
          
          


import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, Avatar, Stack, Pagination, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PhoneIcon from '@mui/icons-material/Phone';

const URL = 'http://localhost:3000/authors';

const Author = () => {
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]); // For filtered authors based on search
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const postPerPage = 12; // Number of authors per page
  const navigate = useNavigate();

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setAuthors(data);
        setFilteredAuthors(data); // Set initial filtered authors to all authors
      })
      .catch((err) => {
        console.log('Error fetching data', err);
      });
  }, []);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Set the new page when the user changes it
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter authors based on search query
    const filtered = authors.filter(
      (author) =>
        author.firstName.toLowerCase().includes(query) ||
        author.lastName.toLowerCase().includes(query)
    );

    setFilteredAuthors(filtered); // Update the filtered authors list
    setCurrentPage(1); // Reset to the first page after searching
  };

  // Calculate the index range for the current page
  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;

  // Get the authors for the current page
  const currentAuthors = filteredAuthors.slice(firstIndex, lastIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredAuthors.length / postPerPage);

  // Navigate to author profile page
  const handleViewProfile = (authorId) => {
    navigate(`/author/${authorId}`);
  };

  return (
    <Box padding={2} marginTop={8}>
      {/* Search Input */}
      <TextField
        label="Search Author"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: 3 }}
      />

      {/* Check if no authors match the search */}
      {filteredAuthors.length === 0 ? (
        <Typography variant="h6" color="error" align="center">
          No authors found
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {currentAuthors.map((author) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={author.id}> {/* Adjust breakpoints here for responsiveness */}
              <Card sx={{ marginTop: 3, backgroundColor: 'lightblue', textAlign: 'center', height: 'auto', borderRadius: 9, border: '4px solid blue', boxShadow: 20 }}>
                <CardContent>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Avatar
                      sx={{ width: 100, height: 100 }}
                      alt="Author Avatar"
                      src="https://img.freepik.com/free-vector/smiling-redhaired-cartoon-boy_1308-174709.jpg?ga=GA1.1.544576586.1737007720&semt=ais_hybrid"
                    />
                  </Stack>
                  <Typography variant="h5" component="div" color="black" marginTop={2}>
                    {author.firstName} {author.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    <PhoneIcon /> {author.phone}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 1 }}>
                    <Typography variant="body2" color="text.primary" sx={{ display: 'flex', marginRight: 2 }}>
                      <PostAddIcon /> {author.numPosts}
                    </Typography>
                    <Typography variant="body2" color="text.primary" sx={{ display: 'flex', marginRight: 2 }}>
                      <CommentIcon /> {author.numComments}
                    </Typography>
                    <Typography variant="body2" color="text.primary" sx={{ display: 'flex' }}>
                      <ThumbUpIcon /> {author.numLikes}
                    </Typography>
                  </Box>

                  {/* Author Details Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewProfile(author.id)}
                    sx={{ marginTop: 2 }}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {filteredAuthors.length > 0 && (
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Pagination
            count={totalPages} // Total pages to render
            page={currentPage} // Current page
            color="secondary"
            onChange={handlePageChange} // Handle page change
          />
        </Box>
      )}
    </Box>
  );
};

export default Author;



  