import React from 'react';
import { CloseOutlined, SettingsOutlined } from '@mui/icons-material';
import { Typography, Box, Grid2 as Grid } from '@mui/material';
import Resources from '../_subcomponents/PlayerTray/Resources';
import PlayerHand from '../_subcomponents/PlayerTray/PlayerHand';
import DeckDiscard from '../_subcomponents/PlayerTray/DeckDiscard';
import { IOpponentCardTrayProps } from '@/app/_components/Gameboard/GameboardTypes';
import { useGame } from '@/app/_contexts/Game.context';
import { useRouter } from 'next/navigation';
import { s3CardImageURL } from '@/app/_utils/s3Utils';

const OpponentCardTray: React.FC<IOpponentCardTrayProps> = ({ trayPlayer, preferenceToggle }) => {
    const { gameState, connectedPlayer, getOpponent, sendMessage } = useGame();
    const router = useRouter();
    const handleExitButton = () =>{
        sendMessage('manualDisconnect');
        router.push('/');
    }

    const hasInitiative = gameState.players[connectedPlayer].hasInitiative;
    const initiativeClaimed = gameState.initiativeClaimed;

    // ---------------Styles------------------- //
    const styles = {
        leftColumn: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: '1rem 0 1rem 2rem',
            gap: '2rem',
        },
        centerColumn: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        opponentHandWrapper: {
            width: '100%',
            height: '100%',
            transform: 'translateY(-2rem)',
        },
        rightColumn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '1rem 2rem 1rem 0',
            gap: '2rem',
        },
        lastPlayed: {
            width: '4.6rem',
            height: '6.5rem',
            borderRadius: '5px',
            backgroundSize: 'cover',
            backgroundImage: gameState.clientUIProperties?.lastPlayedCard ? `url(${s3CardImageURL({ setId: gameState.clientUIProperties.lastPlayedCard, type: '', id: '' })})` : 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        menuStyles: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
        },
        initiativeWrapper: {
            borderRadius: '20px',
            borderWidth: '2px',
            borderStyle: 'solid',
            height: '2rem',
            width: 'auto',
            background: 'rgba(0, 0, 0, 0.5)',
            borderColor: hasInitiative ? 'var(--initiative-blue)' : 'var(--initiative-red)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            h4: {
                margin: '0.2rem 1rem 0', 
                textAlign: 'center', 
                display: 'block',
                fontSize: '1em', 
                fontWeight: 600,
                userSelect: 'none',
                color: hasInitiative ? 'var(--initiative-blue)' : 'var(--initiative-red)',
            }
        },
        initiativeClaimedWrapper: {
            borderRadius: '20px',
            borderWidth: '2px',
            borderStyle: 'solid',
            height: '2rem',
            width: 'auto',
            background: hasInitiative ? 'var(--initiative-blue)' : 'var(--initiative-red)',
            borderColor: hasInitiative ? 'var(--initiative-blue)' : 'var(--initiative-red)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            h4: {
                margin: '0.2rem 1rem 0', 
                textAlign: 'center', 
                display: 'block',
                fontSize: '1em', 
                fontWeight: 600,
                userSelect: 'none',
                color: 'black',
            }
        }
    };

    return (
        <Grid
            container
            sx={{
                height: '17%',
                display: 'flex',
                flexWrap: 'nowrap',
                columnGap: '2rem', // 2rem gap between columns
            }}
        >
            {/* Left column (fixed 360px) */}
            <Grid sx={{
                flex: '0 0 360px',
                ...styles.leftColumn,
            }}
            >
                <DeckDiscard trayPlayer={trayPlayer} />
                <Resources trayPlayer={trayPlayer}/>
            </Grid>

            {/* Center column (flexes to fill space) */}
            <Grid sx={{
                flex: 1,
                ...styles.centerColumn,
            }}
            >
                <Box sx={styles.opponentHandWrapper}>
                    <PlayerHand clickDisabled={true} cards={gameState?.players[getOpponent(connectedPlayer)].cardPiles['hand'] || []} />
                </Box>
            </Grid>

            {/* Right column (fixed 360px) */}
            <Grid sx={{
                flex: '0 0 360px',
                ...styles.rightColumn,
            }}
            >
                <Box sx={initiativeClaimed ? styles.initiativeClaimedWrapper : styles.initiativeWrapper}>
                    <Typography variant={'h4'}>Initiative</Typography>
                </Box>
                <Box sx={styles.lastPlayed}>
                </Box>
                <Box sx={styles.menuStyles}>
                    <CloseOutlined onClick={handleExitButton} sx={{ cursor:'pointer' }}/>
                    <SettingsOutlined onClick={preferenceToggle} sx={{ cursor:'pointer' }} />
                </Box>

            </Grid>
        </Grid>
    );
};

export default OpponentCardTray;
