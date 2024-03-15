import './SearchBar.css';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#778beb',
    '&:hover': {
        backgroundColor: '#546de5',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    top: '8px',
    //alignItems: 'center', 
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'white',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch',
        },
    },
}));

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        if (event.key === 'Enter') {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=11ae441e8fe24fbd8cd764a5e2d11007&query=${searchQuery}`);
                const data = await response.json();
                const recipeIds = data.results.map(recipe => recipe.id);
                const cardPromises = recipeIds.map(async id => {
                    const cardResponse = await fetch(`https://api.spoonacular.com/recipes/${id}/card?apiKey=11ae441e8fe24fbd8cd764a5e2d11007`);
                    const cardData = await cardResponse.json();
                    return { ...cardData, id };
                });
                const recipeCards = await Promise.all(cardPromises);
                setRecipes(recipeCards);
            } catch (error) {
                console.error('Erreur lors de la recherche de recettes :', error);
            }
        }
    };

    return (
        <div className="SearchBar">
            <Search>
                <SearchIconWrapper>
                    <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="The magic ingredient..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleSearchSubmit}
                />
            </Search>
            <div className="Card">
                {recipes.length > 0 && (
                    <div className="Recipes">
                        {recipes.map((recipe, index) => (
                            <div key={index}>
                                <h2>{recipe.title}</h2>
                                <img src={recipe.url} alt={recipe.title} style={{ width: '950px', height: '1650px' }}/>
                                <a href={recipe.url} alt={recipe.title}>Link for the repice</a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
