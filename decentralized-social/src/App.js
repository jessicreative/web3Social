import { React, useEffect, useState } from "react";
import {
  urlClient,
  LENS_HUB_CONTRACT_ADDRESS,
  queryRecommendedProfiles,
  queryExplorePublications,
} from "./queries";
import LENSHUB from "./lenshub";
import { ethers } from "ethers";
import { Box, Button, Image } from "@chakra-ui/react";
import { WorldIDWidget } from '@worldcoin/id'
import { visit } from "graphql";

function App() {
  const [account, setAccount] = useState(null);
  const [profiles, setProfiles] = useState([]);
  console.log('~ profiles', profiles)
  const [posts, setPosts] = useState([]);
  console.log('~ posts', posts)

  async function signIn() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  }

  async function getRecommendedProfiles() {
    const response = await urlClient
      .query(queryRecommendedProfiles)
      .toPromise();
    const profiles = response.data.recommendedProfiles.slice(0, 5);
    setProfiles(profiles);
  }

  async function getPosts() {
    const response = await urlClient
      .query(queryExplorePublications)
      .toPromise();

    const posts = response.data.explorePublications.items.filter((post) => {
      if (post.profile) return post;
      return "";
    });
    setPosts(posts);
  }

  async function follow(id) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      LENS_HUB_CONTRACT_ADDRESS,
      LENSHUB,
      provider.getSigner()
    );
    const tx = await contract.follow([parseInt(id)], [0x0]);
    await tx.wait();
  }

  useEffect(() => {
    getRecommendedProfiles();
    getPosts();
  }, []);

  const parseImageUrl = (profile) => {
    if (profile) {
      const url = profile.picture?.original?.url;
      if (url && url.startsWith("ipfs:")) {
        const ipfsHash = url.split("//")[1];
        return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      }

      return url;
    }

    return "/default-avatar.png";
  };

  return (
    
    <div className="app">

      {/* NAVBAR */}
      <Box width="100%" backgroundColor="rgb(250,240,230)">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="80%"
          margin="auto"
          color="black"
          padding="10px 0"
        >
          <Button
              onClick={event => window.location.replace('http://xmtp.vercel.app')}
              color="rgba(5,32,64)"
              _hover={{ backgroundColor: "#808080" }}
            >
            Chat
          </Button>

          

          <Box>
            <Box
              fontFamily="DM Serif Display"
              fontSize="45px"
              fontStyle="italic"
            >
              Dora
            </Box>
            <Box> Seek the Truths </Box>
          </Box>

          <Box>
          <WorldIDWidget
            actionId="wid_staging_2703190b67977db2eb8258018b1510e4" // obtain this from developer.worldcoin.org
            signal="my_signal"
            enableTelemetry
            onSuccess={(verificationResponse) => console.log(verificationResponse)} // you'll actually want to pass the proof to the API or your smart contract
            onError={(error) => console.error(error)}
          />
          </Box>
          
          {account ? (
            <Box backgroundColor="#000" padding="15px" borderRadius="6px">
              Connected
            </Box>
          ) : (
            <Button
              onClick={signIn}
              color="rgba(5,32,64)"
              _hover={{ backgroundColor: "#808080" }}
            >
              Connect
            </Button>
          )}
        </Box>
      </Box>

      {/* CONTENT */}
      <Box
        display="flex"
        justifyContent="space-between"
        width="75%"
        margin="85px"
        color="black"
      >
        {/* POSTS */}
        <Box width = "10px">
        </Box>
        <Box width="80%" maxWidth="65%" minWidth="65%">
          {posts.map((post) => (
            <Box
              width="100%"
              key={post.id}
              marginBottom="25px"
              backgroundColor="rgb(255,235,205)"
              padding="40px 30px 40px 25px"
              borderRadius="50px"
            >
              <Box display="flex">
                {/* PROFILE IMAGE */}
                <Box width="75px" height="75px" marginTop="8px">
                  <img
                    alt="profile"
                    src={parseImageUrl(post.profile)}
                    width="75px"
                    height="75px"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/default-avatar.png";
                    }}
                  />
                </Box>

                {/* POST CONTENT */}
                <Box flexGrow={1} marginLeft="20px">
                  <Box display="flex" justifyContent="space-between">
                    <Box fontFamily="DM Serif Display" fontSize="24px">
                      {post.profile?.handle}
                    </Box>
                    <Box>
                      Vote
                    </Box>
                  </Box>
                  <Box overflowWrap="anywhere" fontSize="14px">
                    {post.metadata?.content}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Box width = "5px">
        </Box>
        {/* favorite
        <Box
          width="50%"
          backgroundColor="rgb(227,218,201)"
          padding="40px 25px"
          borderRadius="20px"
          height="fit-content"
          justifyContent="space-between"
        >
          <Box fontFamily="DM Serif Display">Favorites</Box>
          <Box>
            {profiles.map((profile, i) => (
              <Box
                key={profile.id}
                margin="30px 0"
                display="flex"
                alignItems="center"
                height="40px"
                _hover={{ color: "#808080", cursor: "pointer" }}
              >
                <img
                  alt="profile"
                  src={parseImageUrl(profile)}
                  width="40px"
                  height="40px"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/default-avatar.png";
                  }}
                />
                <Box marginLeft="25px">
                  <h4>{profile.name}</h4>
                  <p>{profile.handle}</p>
                </Box>
              </Box>
            ))}
          </Box>
        </Box> */}
      </Box>
    </div>
  );
}

export default App;