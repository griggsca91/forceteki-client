// Players.tsx
import React from "react";
import { Card, Box, Typography } from "@mui/material";
import LeaderBaseBoard from "../../LeaderBaseBoard/LeaderBaseBoard";

const Players: React.FC<PlayersProps> = ({ participant, isLobbyView }) => {
	return (
		<Card
			sx={{
				borderRadius: "1.11vw",
				borderColor: "rgba(255, 255, 255, 0.0)",
				height: "90vh",
				width: "80%",
				display: "flex",
				flexDirection: isLobbyView ? "column" : "row",
				justifyContent: isLobbyView ? "flex-start" : "center",
				paddingTop: "1vh",
				marginTop: "4vh",
				backgroundColor: "rgba(0, 0, 0, 0.9)",
			}}
		>
			<Box
				sx={{
					marginBottom: isLobbyView ? "10.78vh" : "0",
					marginLeft: isLobbyView ? "0" : "1.11vw",
					marginRight: isLobbyView ? "0" : "1.11vw",
					width: "100%",
				}}
			>
				<Typography
					sx={{
						fontSize: "1.67vw",
						fontWeight: "bold",
						color: "white",
						marginLeft: "1vw",
						paddingBottom: ".9vh",
					}}
				>
					Players
				</Typography>
				<LeaderBaseBoard participant={participant} isLobbyView={isLobbyView} />
			</Box>
		</Card>
	);
};

export default Players;
