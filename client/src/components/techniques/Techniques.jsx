import React, { useState } from "react";
import { Typography, Button, TextField, Box, Container, InputAdornment, Paper, Fade } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import TechniqueCard from "./techniqueCard";
import newRequest from "../../utils/newRequest";

const Techniques = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);


  const handleSearch = async () => {
    try {
      const res = await newRequest.get(`/techniques/search?query=${searchTerm}`);
      setSearchResults(res.data);
      setShowResults(true);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          textAlign: "center",
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(to right, #e0f7fa, #ffffff)",
          mb: 4,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <WaterDropIcon sx={{ fontSize: 40, color: "#0288d1", mr: 1 }} />
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              color: "#0288d1",
              letterSpacing: 1,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Rainwater Harvesting
          </Typography>
        </Box>

        <Typography
          variant="h5"
          color="textSecondary"
          mb={4}
          fontFamily="'Roboto Slab', serif"
          fontWeight="light"
        >
          Sustainable techniques tailored to your needs
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "70%",
            margin: "0 auto",
            mb: 2,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search water harvesting techniques..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: "50px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                paddingRight: 14,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              backgroundColor: "#0288d1",
              color: "white",
              fontWeight: "bold",
              borderRadius: "50px",
              ml: -12,
              px: 3,
              py: 1.5,
              textTransform: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              "&:hover": { backgroundColor: "#01579b" },
              marginRight: 10,
            }}
          >
            Search
          </Button>
        </Box>
      </Paper>
      {/* <Box>
        <Button variant="contained" onClick={() => window.location.href = "/post-technique"}
          sx={{
            backgroundColor: "#0288d1", color: "white", fontWeight: "bold", borderRadius: "50px", ml: -12, px: 3, py: 1.5, textTransform: "none", boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            "&:hover": { backgroundColor: "#01579b" },
            marginRight: 10,
          }}
        >
          ADD TECHNIQUE
        </Button>
      </Box> */}

      {showResults && (
        <>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            fontWeight="medium"
            color="#01579b"
            sx={{
              position: "relative",
              display: "inline-block",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Search Results
            <Box
              sx={{
                height: 3,
                width: "40%",
                backgroundColor: "#0288d1",
                mt: 1,
                borderRadius: 2,
                position: "absolute",
                bottom: -10,
                left: "30%",
              }}
            />
          </Typography>

          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap={4}
          >
            {searchResults.length > 0 ? (
              searchResults.map((item, index) => (
                <Fade in={true} timeout={500 + index * 200} key={item._id}>
                  <Box>
                    <TechniqueCard item={item} />
                  </Box>
                </Fade>
              ))
            ) : (
              <Typography align="center" color="textSecondary" mt={4}>
                No techniques found for "{searchTerm}"
              </Typography>
            )}
          </Box>

        </>

      )}

      <Box
        onClick={() => setChatOpen(!chatOpen)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "linear-gradient(to right, #0288d1, #26c6da)",
          color: "white",
          zIndex: 1000,
          px: 3,
          py: 2,
          borderRadius: "50px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          },
        }}
      >
        <ChatBubbleOutlineIcon sx={{ fontSize: 34 }} />
        <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
          Need help? Chat with us!
        </Typography>
      </Box>

      <Fade in={chatOpen}>
        <Box
          sx={{
            position: "fixed",
            bottom: 100,
            right: 24,
            width: { xs: "90%", sm: 400 },
            height: 500,
            bgcolor: "white",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            zIndex: 999,
          }}
        >
          <iframe
            src="https://rainwaterharvestingchatbot.onrender.com/ask" // your Flask chatbot endpoint
            title="Chatbot"
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </Box>
      </Fade>



    </Container>

  );
};

export default Techniques;
