import React from 'react';

const RecipesPage = ({ recipes }) => {
  return (
    <div>
      <h1>Liste des recettes</h1>
      <div>
        {recipes.map((recipe, index) => (
          <div key={index}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;
