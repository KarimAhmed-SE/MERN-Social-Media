import React, { useState, useEffect, useReducer, useContext } from "react";
import logo from "./Logo.png";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import ProfileSection from "./components/ProfileSection";
import CreatePost from "./components/CreatePost";
import AdSection from "./components/AdSection";
import DisplayPost from "./components/DisplayPost";
import FriendsList from "./components/FriendsList";
import LoopIcon from "@mui/icons-material/Loop";
import axios from "axios";
import { userContext } from "../userContext";
function Home() {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState();
  const [loading, setLoading] = useState(true);
  const { userInfo, setUserInfo } = useContext(userContext);
  const [friends, setFriends] = useState([]);
  const [isFriend, setIsFriend] = useState(); //initial state

  useEffect(() => {
    axios
      .get(`http://localhost:6001/api/displayPosts`)
      .then((response) => {
        setPosts(response.data);

        setLoading(false);
        console.log("friends array: ", friends);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  return (
    <>
      <Header />

      {/*main body  */}

      <div className="block mt-32 md:flex md:w-full md:mt-32 md:mx-auto md:justify-center md:space-x-10 ">
        <div className="hidden md:block md:w-1/4">
          {/* Profile section */}
          {userInfo && <ProfileSection />}
        </div>
        {/* Make post section */}

        <div className="w-full block mx-auto space-y-6 px-7 md:flex-col md:justify-center md:items-center md:h-full md:w-1/3 md:space-y-6">
          <CreatePost key={posts._id} posts={posts} setPosts={setPosts} />
          {loading ? (
            <div>
              <LoopIcon fontSize="large" />
            </div>
          ) : (
            <div className="">
              {posts &&
                posts.slice().reverse().map((post) => {
                  return (
                    <div>
                      <DisplayPost key={post._id} {...post} friends={friends} setFriends={setFriends}/>;
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/*Ad Section */}

        <div className="hidden md:flex md:flex-col md:h-fit md:w-1/4 md:space-y-10">
          <AdSection />
          {userInfo && (
            <div>
              <FriendsList/>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
