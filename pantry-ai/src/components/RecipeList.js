const RecipeList = ({ recipes, generateState }) => {

  const week_plan_display = <h5>Here are your recipe options for a <b>7-day week</b>! We won't specify which days you eat what so feel free to move them around.</h5>
  const today_display = <h5>Here are some options for what you can make <b>today</b>!</h5>
  
  return (
    <div className="recipe-page">
    {generateState === 1 && week_plan_display}
    {generateState === 2 && today_display}
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
    </div>
  )
}

export default RecipeList