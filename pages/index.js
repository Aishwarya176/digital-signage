import { useState } from 'react';
import { useRouter } from 'next/router';

// Sample player data
const players = [
  { id: "56F1496840CB4B4088EFB1668A43E2D5", name: 'Player 1' },
  { id: "6789DD19E6134C8A9A4DD44374DD15E7", name: 'Player 2' },
  // Add more player data as needed
];

export default function Home() {
  const router = useRouter();
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Function to handle player selection
  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    router.push(`/player/${player}`)
    // Perform any other actions you want to do when a player is selected
  };

  return (
    <div>
      <h1>List of Players</h1>
      <div>
        {players.map((player) => (
          <div key={player.id} onClick={() => handlePlayerClick(player.id)} style={{ cursor: 'pointer' }}>
            <h2>{player.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}



