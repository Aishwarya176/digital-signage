// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { motion } from 'framer-motion';

// const Player = () => {
//     const router = useRouter();
//     const playerId = router.query.id;
//     console.log(playerId,)
//     const [player, setPlayer] = useState();
//     const [playerList, setPlayerList] = useState([]);


//     const fetchPlayerData = async (playerId) => {
//         const res = await axios.post(`/api/getPlayerData?playerId=${playerId}`);
//         console.log(res.data[0].result)
//         setPlayer(res.data[0].result)
//     }



//     useEffect(() => {
//         if (playerId !== undefined) {
//             fetchPlayerData(playerId);
//         }
//     }, [playerId])

//     useEffect(() => {
//         const fetchData = async () => {
//             if (player !== undefined) {
//                 const updatedPlayerList = []; // Array to store all the data

//                 for (const frame of player.player.channel.frames) {
//                     try {
//                         const res = await axios.post(`/api/getPlaylistData?playlistId=${frame.schedule[0].playlist_id}`);
//                         updatedPlayerList.push(res.data[0].result); // Add result to the array
//                     } catch (error) {
//                         console.error(error);
//                     }
//                 }

//                 // Set state with the accumulated array
//                 setPlayerList(prevPlayerList => [...prevPlayerList, ...updatedPlayerList]);
//             }
//         };
//         fetchData();
//     }, [player]);


//     const Frame = ({ frame }) => (
//         <div
//         >
//             {/* {console.log(playerList, "playerList")} */}
//             {
//                 playerList.map((ele) => {
//                     if (ele.playlist_id === frame.schedule[0].playlist_id) {
//                         return ele.media.map((list) => {
//                             console.log(list)
//                             return (<div className="absolute border border-blue-400 bg-blue"
//                                 style={{
//                                     width: `${frame.frame_width}px`,
//                                     height: `${frame.frame_height}px`,
//                                     left: `${frame.left}px`,
//                                     top: `${frame.top}px`,
//                                     duration: `${frame.framer_duration}`
//                                 }}>
//                                 {/* <img duration src={list.file} alt="" /> */}
//                                 {/* <p>File: {list.file}</p>
//                                 <p>Name: {list.media_name}</p>
//                                 <p>File Type: {list.file_type}</p> */}
//                                 <motion.img
//                                     key={list.file} // Ensure each image has a unique key
//                                     src={list.file}
//                                     alt={list.media_name}
//                                     initial={{ opacity: 0 }} // Initial opacity set to 0
//                                     animate={{ opacity: 1 }} // Animate opacity to 1
//                                     transition={{ duration: 0.5 }} // Animation duration
//                                     whileHover={{ scale: 1.1 }} // Hover effect
//                                 />

//                             </div>)
//                         })
//                     }
//                 })
//             }
//         </div>
//     );



//     //Channel component
//     // Channel component
//     const Channel = ({ channel }) => (
//         <div className="relative w-full h-full overflow-hidden" style={{ width: channel.width, height: channel.height }}>
//             {channel.frames.map(frame => (
//                 <Frame key={frame.frame_id} frame={frame} />
//             ))}
//         </div>
//     );






//     // Player component
//     const Player = ({ player }) => (
//         <div >
//             <h2>{player?.player_name}</h2>
//             <p>Location: {player?.location}</p>
//             <Channel channel={player?.channel} />
//         </div>
//     );

//     return (
//         <div>
//             {player ? <Player player={player.player} /> : ""}
//         </div>
//     )
// }



// export default Player;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { motion } from 'framer-motion';

const Player = () => {
    const router = useRouter();
    const playerId = router.query.id;
    const [player, setPlayer] = useState();
    const [playerList, setPlayerList] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const fetchPlayerData = async (playerId) => {
        const res = await axios.post(`/api/getPlayerData?playerId=${playerId}`);
        setPlayer(res.data[0].result);
    };

    useEffect(() => {
        if (playerId !== undefined) {
            fetchPlayerData(playerId);
        }
    }, [playerId]);

    useEffect(() => {
        const fetchData = async () => {
            if (player !== undefined) {
                const updatedPlayerList = [];
                for (const frame of player.player.channel.frames) {
                    try {
                        const res = await axios.post(`/api/getPlaylistData?playlistId=${frame.schedule[0].playlist_id}`);
                        updatedPlayerList.push(res.data[0].result);
                    } catch (error) {
                        console.error(error);
                    }
                }
                setPlayerList(prevPlayerList => [...prevPlayerList, ...updatedPlayerList]);
            }
        };
        fetchData();
    }, [player]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % playerList.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, [playerList.length]);

    // Frame component with motion animation
    const Frame = ({ frame }) => (
        <div>
            {playerList.map((ele) => {
                if (ele.playlist_id === frame.schedule[0].playlist_id) {
                    return ele.media.map((list, index) => (
                        <div
                            key={list.file}
                            className="absolute border border-grey-400 bg-blue"
                            style={{
                                width: `${frame.frame_width}px`,
                                height: `${frame.frame_height}px`,
                                left: `${frame.left}px`,
                                top: `${frame.top}px`,
                                duration: `${frame.framer_duration}`
                            }}>
                            <motion.img
                                src={list.file}
                                alt={list.media_name}
                                initial={{ opacity: index === currentImageIndex ? 1 : 0 }}
                                animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.1 }}
                                style={{ width: '100%', height: '100%', objectFit: 'fill', objectFit: 'c' }}
                            />
                        </div>
                    ));
                }
            })}
        </div>
    );

    // Channel component
    const Channel = ({ channel }) => (
        <div className="relative w-full h-full overflow-hidden" style={{ width: channel.width, height: channel.height }}>
            {channel.frames.map(frame => (
                <Frame key={frame.frame_id} frame={frame} />
            ))}
        </div>
    );

    // Player component
    const Player = ({ player }) => (
        <div>
            {/* <h2>{player?.player_name}</h2>
            <p>Location: {player?.location}</p> */}
            <Channel channel={player?.channel} />
        </div>
    );

    return (
        <div>
            {player ? <Player player={player.player} /> : ""}
        </div>
    );
}

export default Player;
