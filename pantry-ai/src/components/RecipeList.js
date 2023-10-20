const RecipeList = ({ recipes }) => {

return (
  <ol>
    {recipes.map(({title, ingredients}, i) => (
      <li key={"t" + i}>
      <h3>{title}</h3>
      <div className='ingredient-list'>
      {ingredients.map((ingredient, j) => (
        <div key={"i" + j} className='ingredient'>
          {ingredient}
        </div>
      ))}
      </div>
      </li>
    ))}
  </ol>
  )
}

export default RecipeList