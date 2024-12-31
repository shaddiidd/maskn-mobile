const Contract = require("../models/contract");
const ContractTerm = require("../models/contractTerms"); // Model for contract_terms table
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs/promises");
const Property = require("../models/properties");
const TourRequest = require("../models/tourRequests");
const User = require("../models/users");
const VillageName = require("../models/villageName");
const NeighborhoodNumber = require("../models/neighborhoodNumber");
const BlockName = require("../models/blockName");
const AppError = require("../utils/AppError");
const cloudinary = require("cloudinary");
const { PassThrough } = require("stream");
const ContractAdditionalTerms = require("../models/contractAdditionalTerms");

const saveContractTerms = async (contractId, terms) => {
  const termsData = terms.map((term) => ({ contract_id: contractId, term }));
  await ContractAdditionalTerms.bulkCreate(termsData);
};

// Function to upload HTML to Cloudinary
const uploadHtmlToCloudinary = (htmlContent, requestId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "contracts",
        public_id: `contract-${requestId}`,
        format: "html", // Save as HTML file
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", error.message);
          return reject(
            new Error(`Cloudinary upload failed: ${error.message}`)
          );
        }
        resolve(result);
      }
    );

    const bufferStream = new PassThrough();
    bufferStream.end(Buffer.from(htmlContent, "utf8"));
    bufferStream.pipe(stream);
  });
};

// Main function to create a contract
const createContract = async (contractData, requestId) => {
  const { startDate, endDate, additionalTerms, signture } = contractData;

  try {
    // Fetch and validate the tour request
    const request = await TourRequest.findByPk(requestId, {
      include: [
        { model: User, as: "tenant", attributes: ["first_name", "last_name"] },
      ],
    });

    if (!request) throw new AppError("Tour request not found", 404);
    if (request.status !== "approved")
      throw new AppError("Tour request not approved", 403);

    const contractExists = await Contract.findOne({
      where: { property_id: request.property_id, status: "expired" },
    });
    console.log(contractExists);
    
    if (!contractExists)
      throw new AppError(
        "cant make another contract for property if one already exists",
        403
      );
    // Fetch and validate the property details
    const property = await Property.findByPk(request.property_id, {
      include: [
        { model: User, as: "user", attributes: ["first_name", "last_name"] },
        { model: VillageName, as: "village", attributes: ["village_name"] },
        { model: NeighborhoodNumber, as: "neighborhood", attributes: ["name"] },
        { model: BlockName, as: "block", attributes: ["block_name"] },
      ],
    });

    if (!property)
      throw new AppError("Property not found or not approved", 404);

    const ownerName = `${property.user.first_name} ${property.user.last_name}`;
    const tenantName = `${request.tenant.first_name} ${request.tenant.last_name}`;
    const propertyDetails = {
      block: property.block.block_name || "N/A",
      apartment: property.apartment_number || "N/A",
      building: property.building_number || "N/A",
      neighborhood: property.neighborhood.name || "N/A",
      village: property.village.village_name || "N/A",
    };

    // Fetch default terms and validate them
    const defaultTerms = await ContractTerm.findAll({ attributes: ["term"] });

    if (!Array.isArray(defaultTerms)) {
      throw new AppError("Default terms query did not return an array", 500);
    }

    const defaultTermsArray = defaultTerms.map((term) => {
      if (!term?.dataValues?.term) {
        console.error("Invalid term object:", term);
        return "";
      }
      return term.dataValues.term;
    });

    // Validate and merge additional terms
    const validatedAdditionalTerms = Array.isArray(additionalTerms)
      ? additionalTerms
      : [];
    const allTerms = [...defaultTermsArray, ...validatedAdditionalTerms];

    console.log("allTerms Array : ", allTerms);
    // Populate the HTML template
    const templatePath = path.join(
      __dirname,
      "../resources/templates/contractTemplate.html"
    );
    let contractTemplate = await fs.readFile(templatePath, "utf8");
    contractTemplate = contractTemplate
      .replace("{{landlordName}}", ownerName)
      .replace("{{tenantName}}", tenantName)
      .replace("{{blockNumber}}", propertyDetails.block)
      .replace("{{buildingNumber}}", propertyDetails.building)
      .replace("{{apartmentNumber}}", propertyDetails.apartment)
      .replace("{{rentalDuration}}", `${startDate} الى ${endDate}`)
      .replace("{{startDate}}", startDate)
      .replace("{{endDate}}", endDate)
      .replace("{{NeighborhoodNumber}}", propertyDetails.neighborhood)
      .replace("{{villageName}}", propertyDetails.village)
      .replace("{{OwnerSignature}}", signture)
      .replace(
        "{{terms}}",
        allTerms.map((term) => `<li>${term}</li>`).join("")
      );

    // Upload HTML to Cloudinary
    const uploadResult = await uploadHtmlToCloudinary(
      contractTemplate,
      requestId
    );

    // Save contract details to the database
    const newContract = await Contract.create({
      owner_id: property.owner_id,
      tenant_id: request.tenant_id,
      property_id: property.property_id,
      start_date: startDate,
      end_date: endDate,
      status: "partialy signed",
      contract_pdf: uploadResult.secure_url, // URL to the uploaded HTML file
    });

    await saveContractTerms(newContract.contract_id, allTerms);

    return {
      cloudinaryUrl: uploadResult.secure_url,
      contractInfo: newContract,
    };
  } catch (error) {
    console.error("Error generating contract:", error.message);
    console.error("Stack Trace:", error.stack);
    throw new AppError("Failed to generate contract", 500, {
      details: error.message,
    });
  }
};

module.exports = { createContract };
