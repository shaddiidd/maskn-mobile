const Contract = require('../models/contract');
const ContractTerm = require('../models/contractTerms'); // Model for contract_terms table
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs/promises');
const Property = require('../models/properties');
const TourRequest = require('../models/tourRequests');
const User = require('../models/users');

const createContract = async (contractData, requestId, ownerId) => {
  try {
    const { startDate, endDate, additionalTerms } = contractData;

    // Fetch the tour request and associated tenant
    const request = await TourRequest.findByPk(requestId, {
      include: [
        {
          model: User,
          as: 'tenant', // Correct alias for tenant
          attributes: ['first_name', 'last_name'],
        },
      ],
    });

    if (!request) {
      return { success: false, message: 'Tour request not found' };
    }

    // Check if the tour request status is not approved
    if (request.status !== 'approved') {
      return { success: false, message: 'Cannot generate a contract for a rejected or pending tour request' };
    }

    // Fetch property details
    const property = await Property.findByPk(request.property_id);
    if (!property) {
      return { success: false, message: 'Property not found' };
    }

    // Fetch owner details
    const owner = await User.findByPk(ownerId);
    if (!owner) {
      return { success: false, message: 'Owner not found' };
    }

    // Prepare dynamic data for contract
    const ownerName = `${owner.first_name} ${owner.last_name}`;
    const tenantName = `${request.tenant.first_name} ${request.tenant.last_name}`;
    const propertyBlock = property.block_id || 'N/A';
    const propertyAptNumber = property.apartment_number || 'N/A';
    const propertyBuildingNumber = property.building_number || 'N/A';

    // Fetch default terms from the database
    const defaultTerms = await ContractTerm.findAll({ attributes: ['term'] });
    const defaultTermsArray = defaultTerms.map((terms) => terms.term);

    // Merge default terms with additional user-provided terms
    const allTerms = [...defaultTermsArray, ...(additionalTerms || [])];

    console.log("Terms:", allTerms);

    // Read the HTML contract template
    const templatePath = path.join(__dirname, '../resources/templates/contractTemplate.html');
    let contractTemplate = await fs.readFile(templatePath, 'utf8');

    // Replace placeholders with dynamic data
    contractTemplate = contractTemplate
      .replace('{{landlordName}}', ownerName)
      .replace('{{tenantName}}', tenantName)
      .replace('{{blockNumber}}', propertyBlock)
      .replace('{{buildingNumber}}', propertyBuildingNumber)
      .replace('{{apartmentNumber}}', propertyAptNumber)
      .replace('{{rentalDuration}}', `${startDate} الى ${endDate}`)
      .replace('{{startDate}}', startDate)
      .replace('{{endDate}}', endDate);

    // Generate terms as an HTML list
    const termsHtml = allTerms.map((term) => `<li>${term}</li>`).join('');
    contractTemplate = contractTemplate.replace('{{terms}}', termsHtml);

    // Optional: Save the contract to the database (commented out in your original code)
    // const newContract = await Contract.create({
    //   owner_id: property.owner_id,
    //   tenant_id: request.tenant_id,
    //   property_id: property.property_id,
    //   start_date: startDate,
    //   end_date: endDate,
    //   terms: allTerms, // Store terms as JSON or an array
    // });

    return { success: true, contract: contractTemplate }; // Return the rendered HTML contract
  } catch (error) {
    console.error('Error generating contract:', error.message);
    return { success: false, message: 'Failed to generate contract', error: error.message };
  }
};

module.exports = { createContract };
