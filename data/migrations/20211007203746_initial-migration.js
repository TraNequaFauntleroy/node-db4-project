
exports.up = async function(knex) {
  await knex.schema
    .createTable('recipes', recipes => {
        recipes.increments('recipe_id')
        recipes.string('recipe_name', 200).notNullable().unique()
    })
    .createTable('ingredients', ing => {
        ing.increments('ingredients_id')
        ing.string('ingredient_name', 200).notNullable().unique()
        ing.string('ingredient_unit', 50)
    })
    .createTable('steps', steps => {
        steps.increments('step_id')
        steps.string('step_instructions', 200).notNullable()
        steps.integer('step_number').notNullable()
        steps.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('recipe_id')
            .inTable('recipes')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
    })
    .createTable('step_ingredients', step_ing => {
        step_ing.increments('step_ing_id')
        
    })
};

exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('step_ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes')
};
