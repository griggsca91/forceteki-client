import React, { useEffect } from 'react';
import { Typography, Box, Tab, Tabs, Card, CardContent, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import CreateGameForm from '../_sharedcomponents/CreateGameForm/CreateGameForm';
import { useUser } from '@/app/_contexts/User.context';
import QuickGameForm from '@/app/_components/_sharedcomponents/QuickGameForm/QuickGameForm';

const HomePagePlayMode: React.FC = () => {
    const router = useRouter();
    const [value, setValue] = React.useState(0);
    const [testGameList, setTestGameList] = React.useState([]);
    const { user } = useUser();
    const showTestGames = process.env.NODE_ENV === 'development' && (user?.id === 'exe66' || user?.id === 'th3w4y');

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const handleStartTestGame = async (filename: string) => {
        try {
            // const payload = {
            // 	user: user,
            // 	deck: deckData
            // };
            const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/start-test-game`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ filename: filename }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to start test game');
            }

            router.push('/GameBoard');
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') return;
        const fetchGameList = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/test-game-setups`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
    
                if (!response.ok) {
                    throw new Error('Failed to get test game list');
                }
    
                const data = await response.json();
                setTestGameList(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchGameList();
    }, []);

    const styles = {
        wrapper: {
            height: '100%',
        },
        tabStyles: {
            color: 'white',
        }
    };

    return (
        <Card variant="black" sx={styles.wrapper}>
            { process.env.NEXT_PUBLIC_DISABLE_CREATE_GAMES === 'true' ? 
                <CardContent>
                    <Typography variant="h2">MAINTENANCE</Typography>
                    <Typography variant="h3" sx={{ mb: 1 }}>Karabast is currently under maintenance.</Typography>
                    <Typography variant="h3">Be back soon!</Typography>
                </CardContent>
                :
                <CardContent>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: '1rem' }}>
                        <Tabs value={value} variant="fullWidth" onChange={handleChange}>
                            {/* <Tab sx={styles.tabStyles} label="Play" /> */}
                            <Tab sx={styles.tabStyles} label="Create" />
                            {showTestGames && <Tab sx={styles.tabStyles} label="Test" />}
                        </Tabs>
                    </Box>
                    {/* <TabPanel index={0} value={value}>
                        <QuickGameForm/>
                    </TabPanel> */}
                    <TabPanel index={0} value={value}>
                        <CreateGameForm />
                    </TabPanel>
                    {showTestGames && 
                    <TabPanel index={1} value={value}>
                        <Box>
                            <Typography variant="h2">Test Game Setups</Typography>
                            {testGameList.map((filename, index) => {
                                return (
                                    <Box key={index}>
                                        <Button sx={{ marginBottom: 2 }} key={index} onClick={() => handleStartTestGame(filename)}>
                                            {filename}
                                        </Button>
                                    </Box>
                                );
                            })}
                            <Button onClick={() => router.push('/GameBoard')}>Join Test Game</Button>
                        </Box>
                    </TabPanel>
                    }
                </CardContent>
            }
        </Card>
    );
};

interface ITabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<ITabPanelProps> = (props) => {
    const { children, value, index } = props;

    return (
        <Box
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {children}
        </Box>
    );
};

export default HomePagePlayMode;
