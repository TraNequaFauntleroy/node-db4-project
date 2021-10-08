
exports.up = async function(knex) {
  await knex.schema
    .createTable('recipes', recipes => {
        recipes.increments('recipe_id')
        recipes.string('recipe_name', 200).notNullable().unique()
    })
    .createTable('ingredients', ing => {
        ing.increments('ingredient_id')
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
    .createTable('step_ingredients', step_ingredients => {
        step_ingredients.increments('step_ingredient_id')
        step_ingredients.float('quantity').notNullable()
        step_ingredients.integer('step_id')
            .unsigned()
            .notNullable()
            .references('step_id')
            .inTable('steps')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
        step_ingredients.integer('ingredient_id')
            .unsigned()
            .notNullable()
            .references('ingredient_id')
            .inTable('ingredients')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
    })
};

exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('step_ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes')
};
