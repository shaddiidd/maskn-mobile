'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tenant_property_feedback', [
      {
        question_text: "How clean was the property when you moved in?",
        weight: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "How satisfied are you with the condition of the furniture and appliances (if provided)?",
        weight: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "How comfortable was the property during your stay (e.g., temperature, ventilation, noise)?",
        weight: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "How reliable was the water and electricity supply during your stay?",
        weight: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "How responsive was the landlord or property manager to maintenance requests?",
        weight: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "How satisfied are you with the security and safety of the property?",
        weight: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "How well does the property’s location meet your needs (e.g., proximity to work, schools, shops)?",
        weight: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "How fair were the terms and conditions of the lease agreement?",
        weight: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "How well-maintained were shared spaces (if applicable, e.g., garden, pool, gym)?",
        weight: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "Overall, how would you rate your experience renting this property?",
        weight: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tenant_property_feedback', null, {});
  },
};
