const Contract = require("../models/contract");
const ContractTerm = require("../models/contractTerms"); // Model for contract_terms table
const { Op, where } = require("sequelize");
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
const puppeteer = require("puppeteer");
const dayjs = require("dayjs");

const saveContractTerms = async (contractId, terms) => {
  const termsData = terms.map((term) => ({ contract_id: contractId, term }));
  await ContractAdditionalTerms.bulkCreate(termsData);
};

// Function to upload HTML to Cloudinary
// const uploadHtmlToCloudinary = (htmlContent, requestId) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.v2.uploader.upload_stream(
//       {
//         resource_type: "raw",
//         folder: "contracts",
//         public_id: `contract-${requestId}`,
//         format: "pdf", // Save as PDF file
//       },
//       (error, result) => {
//         if (error) {
//           console.error("Cloudinary upload failed:", error.message);
//           return reject(
//             new Error(`Cloudinary upload failed: ${error.message}`)
//           );
//         }
//         const downloadableUrl = `${result.secure_url
//           .split("/upload/")
//           .join("/upload/fl_attachment/")}`;
//         resolve({ ...result, downloadableUrl });
//       }
//     );

//     const bufferStream = new PassThrough();
//     bufferStream.end(Buffer.from(htmlContent, "utf8"));
//     bufferStream.pipe(stream);
//   });
// };

// const uploadHtmlToCloudinary = (htmlContent, requestId) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.v2.uploader.upload_stream(
//       {
//         resource_type: "raw",
//         folder: "contracts",
//         public_id: `contract-${requestId}`,
//         format: "pdf", // Save as PDF file
//         use_filename: true, // Use the original filename for better control
//         unique_filename: false, // Prevents adding random strings to the filename
//       },
//       (error, result) => {
//         if (error) {
//           console.error("Cloudinary upload failed:", error.message);
//           return reject(
//             new Error(`Cloudinary upload failed: ${error.message}`)
//           );
//         }
//         resolve(result);
//       }
//     );

//     const bufferStream = new PassThrough();
//     bufferStream.end(Buffer.from(htmlContent, "utf8"));
//     bufferStream.pipe(stream);
//   });
// };

const uploadHtmlToCloudinary = (htmlContent, requestId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: "auto", // Change to "auto" for better handling
        folder: "contracts",
        public_id: `contract-${requestId}`,
        format: "pdf", // Save as PDF file
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



const createContractPDF = async (htmlContent, outputPath) => {
  console.log("Starting Puppeteer...");
  const browser = await puppeteer.launch({
    executablePath:
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    console.log("New page created successfully.");
    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });
    console.log("HTML content set successfully.");

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    console.log("PDF Buffer Generated Successfully:", pdfBuffer.length);

    if (!Buffer.isBuffer(pdfBuffer)) {
      console.error("PDF Buffer is not a valid buffer.");
    }

    if (pdfBuffer.length === 0) {
      console.error("PDF Buffer is empty.");
    }

    // Save PDF locally
    await fs.writeFile(outputPath, pdfBuffer);
    console.log("PDF successfully written to:", outputPath);

    return pdfBuffer;
  } catch (error) {
    console.error("Error during Puppeteer operations:", error.message);
    throw new AppError("PDF generation failed", 500, {
      details: error.message,
    });
  } finally {
    await browser.close();
  }
};


const createContract = async (requestId) => {
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

    // Check if a contract already exists for the property
    const existingContract = await Contract.findOne({
      where: {
        property_id: request.property_id,
        status: { [Op.ne]: "expired" }, // Not expired contracts
      },
    });

    if (existingContract) {
      // Fetch contract terms for the existing contract
      const existingContractTerms = await ContractAdditionalTerms.findAll({
        where: { contract_id: existingContract.contract_id },
        attributes: ["term"],
      });

      // Fetch property details
      const property = await Property.findByPk(request.property_id, {
        include: [
          { model: User, as: "user", attributes: ["first_name", "last_name"] },
          { model: VillageName, as: "village", attributes: ["village_name"] },
          { model: NeighborhoodNumber, as: "neighborhood", attributes: ["name"] },
          { model: BlockName, as: "block", attributes: ["block_name"] },
        ],
      });

      if (!property) throw new AppError("Property details not found", 404);

      return {
        success: true,
        message: "Contract already exists",
        data: {
          contractInfo: existingContract,
          property,
          tenant: {
            first_name: request.tenant.first_name,
            last_name: request.tenant.last_name,
          },
          terms: existingContractTerms,
        },
      };
    }

    // Fetch and validate the property details
    const property = await Property.findByPk(request.property_id, {
      include: [
        { model: User, as: "user", attributes: ["first_name", "last_name"] },
        { model: VillageName, as: "village", attributes: ["village_name"] },
        { model: NeighborhoodNumber, as: "neighborhood", attributes: ["name"] },
        { model: BlockName, as: "block", attributes: ["block_name"] },
      ],
    });

    if (!property) throw new AppError("Property not found or not approved", 404);

    const ownerName = `${property.user.first_name} ${property.user.last_name}`;
    const tenantName = `${request.tenant.first_name} ${request.tenant.last_name}`;
    const propertyDetails = {
      block: property.block.block_name || "N/A",
      apartment: property.apartment_number || "N/A",
      building: property.building_number || "N/A",
      neighborhood: property.neighborhood.name || "N/A",
      village: property.village.village_name || "N/A",
    };
    const startDate = "غير محدد";
    const endDate = "غير محدد";

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

    // Save contract details to the database
    const newContract = await Contract.create({
      owner_id: property.owner_id,
      tenant_id: request.tenant_id,
      property_id: property.property_id,
    });

    // Save additional terms
    await saveContractTerms(newContract.contract_id, defaultTermsArray);

    // Fetch contract terms for the newly created contract
    const newContractTerms = await ContractAdditionalTerms.findAll({
      where: { contract_id: newContract.contract_id },
      attributes: ["term"],
    });

    return {
      success: true,
      message: "Contract generated successfully",
      data: {
        contractInfo: newContract,
        property,
        tenant: {
          first_name: request.tenant.first_name,
          last_name: request.tenant.last_name,
        },
        terms: newContractTerms,
      },
    };
  } catch (error) {
    console.error("Error generating contract:", error.message);
    console.error("Stack Trace:", error.stack);
    throw new AppError("Failed to generate contract", 500, {
      details: error.message,
    });
  }
};



const previewContractService = async (userId, contractId) => {
  try {
    // Fetch contract information
    const contractInfo = await Contract.findOne({
      where: {
        [Op.or]: [{ owner_id: userId }, { tenant_id: userId }],
        contract_id: contractId,
      },
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["first_name", "last_name"],
        },
        {
          model: User,
          as: "tenant",
          attributes: ["first_name", "last_name"],
        },
      ],
    });

    if (!contractInfo) {
      console.error(
        `No contract found for userId: ${userId} and contractId: ${contractId}`
      );
      throw new AppError(
        `Contract not found for userId: ${userId} and contractId: ${contractId}`,
        404
      );
    }

    const isOwner = contractInfo.owner_id === userId;

    if (!isOwner && contractInfo.status === "not signed") {
      throw new AppError(
        "Tenant is not authorized to view this contract while it's not signed by owner",
        403
      );
    }

    console.log("Fetched Contract Info:", contractInfo);

    // Fetch contract terms
    const contractTerms = await ContractAdditionalTerms.findAll({
      where: { contract_id: contractId },
      attributes: ["term"],
    });

    // Fetch property information
    const property = await Property.findOne({
      where: { property_id: contractInfo.property_id },
      include: [
        {
          model: VillageName,
          as: "village",
          attributes: ["village_name"],
        },
        {
          model: NeighborhoodNumber,
          as: "neighborhood",
          attributes: ["name"],
        },
        {
          model: BlockName,
          as: "block",
          attributes: ["block_name"],
        },
      ],
    });

    if (!property) {
      throw new AppError("Property details not found", 404);
    }

    // Populate template and generate PDF (rest of the code remains unchanged)
    const ownerName = `${contractInfo.owner?.first_name || "N/A"} ${
      contractInfo.owner?.last_name || "N/A"
    }`;
    const tenantName = `${contractInfo.tenant?.first_name || "N/A"} ${
      contractInfo.tenant?.last_name || "N/A"
    }`;

    const propertyDetails = {
      block: property.block?.block_name || "N/A",
      apartment: property.apartment_number || "N/A",
      building: property.building_number || "N/A",
      neighborhood: property.neighborhood?.name || "N/A",
      village: property.village?.village_name || "N/A",
    };

    const startDate = dayjs(contractInfo.start_date).isValid()
      ? dayjs(contractInfo.start_date).format("YYYY-MM-DD")
      : "غير محدد";

    const endDate = dayjs(contractInfo.end_date).isValid()
      ? dayjs(contractInfo.end_date).format("YYYY-MM-DD")
      : "غير محدد";

    const termsList = contractTerms
      .map((term) => `<li>${term.term}</li>`)
      .join("");

    const ownerSignature = contractInfo.owner_signature || "لا يوجد";
    const tenantSignature = contractInfo.tenant_signature || "لا يوجد";
    const ownerWitnessSignature =
      contractInfo.owner_witness_signature || "لا يوجد";
    const tenantWitnessSignature =
      contractInfo.tenant_witness_signature || "لا يوجد";
    const ownerWitnessName = contractInfo.owner_witness_name || "لا يوجد";
    const tenantWitnessName = contractInfo.tenant_witness_name || "لا يوجد";

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
      .replace("{{terms}}", termsList)
      .replace("{{OwnerSignature}}", ownerSignature)
      .replace("{{TenantSignature}}", tenantSignature)
      .replace("{{OwnerWitnessSignature}}", ownerWitnessSignature)
      .replace("{{TenantWitnessSignature}}", tenantWitnessSignature)
      .replace("{{OwnerWitnessName}}", ownerWitnessName)
      .replace("{{TenantWitnessName}}", tenantWitnessName);

    const outputPath = path.join(
      __dirname,
      "../output",
      `contract_${contractId}.pdf`
    );
    const pdfBuffer = await createContractPDF(contractTemplate, outputPath);

    return pdfBuffer;
  } catch (error) {
    console.error("Error generating contract preview:", error.message);
    throw new AppError("Failed to generate contract preview", 500, {
      details: error.message,
    });
  }
};


const signContractService = async (userId, contractId, body) => {
  try {
    const {
      witness_name,
      user_signature,
      witness_signature,
      start_date,
      end_date,
    } = body;

    // Fetch the contract
    const contract = await Contract.findOne({
      where: {
        [Op.or]: [{ owner_id: userId }, { tenant_id: userId }],
        contract_id: contractId,
      },
    });

    if (!contract) {
      throw new AppError("Contract not found", 404);
    }

    // Determine user role
    const isOwner = contract.owner_id === userId;
    const isTenant = contract.tenant_id === userId;

    if (!isOwner && contract.status === "not signed") {
      throw new AppError(
        "Tenant is not authorized to view this contract while it's not signed by the owner",
        403
      );
    }

    if (!isOwner && !isTenant) {
      throw new AppError("User is not authorized to sign this contract", 403);
    }

    // Update contract fields based on role
    if (isOwner) {
      if (!start_date || !end_date) {
        throw new AppError(
          "Start date and End date are required for owners.",
          400
        );
      }

      if (!dayjs(start_date).isValid() || !dayjs(end_date).isValid()) {
        throw new AppError("Invalid start date or end date provided.", 400);
      }

      if (dayjs(end_date).isBefore(dayjs(start_date))) {
        throw new AppError("End date must be after start date", 400);
      }

      contract.owner_signature = user_signature;
      contract.owner_witness_name = witness_name;
      contract.owner_witness_signature = witness_signature;
      contract.start_date = start_date;
      contract.end_date = end_date;
      contract.status = "partialy signed";
    } else if (isTenant) {
      contract.tenant_signature = user_signature;
      contract.tenant_witness_name = witness_name;
      contract.tenant_witness_signature = witness_signature;
      contract.status = "signed";

      // Mark property as rented and update tenant_id
      const property = await Property.findOne({
        where: { property_id: contract.property_id },
      });

      if (!property) {
        throw new AppError("Property associated with contract not found", 404);
      }

      property.mark_as_rented = 1;
      property.tenant_id = userId;
      await property.save();
    }

    await contract.save();

    // Generate PDF and upload to Cloudinary if fully signed
    if (contract.status === "signed") {
      const property = await Property.findOne({
        where: { property_id: contract.property_id },
        include: [
          { model: VillageName, as: "village", attributes: ["village_name"] },
          {
            model: NeighborhoodNumber,
            as: "neighborhood",
            attributes: ["name"],
          },
          { model: BlockName, as: "block", attributes: ["block_name"] },
        ],
      });

      if (!property) {
        throw new AppError("Property details not found", 404);
      }

      const contractTerms = await ContractAdditionalTerms.findAll({
        where: { contract_id: contractId },
        attributes: ["term"],
      });

      const termsList = contractTerms
        .map((term) => `<li>${term.term}</li>`)
        .join("");

      const ownerName = `${contract.owner_signature ? "Signed" : "Not Signed"}`;
      const tenantName = "Signed";

      const ownerSignature = contract.owner_signature || "لا يوجد";
      const tenantSignature = contract.tenant_signature || "لا يوجد";
      const ownerWitnessSignature =
        contract.owner_witness_signature || "لا يوجد";
      const tenantWitnessSignature =
        contract.tenant_witness_signature || "لا يوجد";
      const ownerWitnessName = contract.owner_witness_name || "لا يوجد";
      const tenantWitnessName = contract.tenant_witness_name || "لا يوجد";

      const propertyDetails = {
        block: property.block?.block_name || "N/A",
        apartment: property.apartment_number || "N/A",
        building: property.building_number || "N/A",
        neighborhood: property.neighborhood?.name || "N/A",
        village: property.village?.village_name || "N/A",
      };

      const startDate = dayjs(contract.start_date).isValid()
        ? dayjs(contract.start_date).format("YYYY-MM-DD")
        : "غير محدد";

      const endDate = dayjs(contract.end_date).isValid()
        ? dayjs(contract.end_date).format("YYYY-MM-DD")
        : "غير محدد";

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
        .replace("{{terms}}", termsList)
        .replace("{{OwnerSignature}}", ownerSignature)
        .replace("{{TenantSignature}}", tenantSignature)
        .replace("{{OwnerWitnessSignature}}", ownerWitnessSignature)
        .replace("{{TenantWitnessSignature}}", tenantWitnessSignature)
        .replace("{{OwnerWitnessName}}", ownerWitnessName)
        .replace("{{TenantWitnessName}}", tenantWitnessName);

      const outputPath = path.join(
        __dirname,
        "../output",
        `contract_${contractId}.pdf`
      );

      const pdfBuffer = await createContractPDF(contractTemplate, outputPath);

      const cloudinaryResult = await uploadHtmlToCloudinary(
        pdfBuffer,
        contractId
      );
      const secureUrl = cloudinaryResult.secure_url;
      const downloadableUrl = `${secureUrl}?attachment=true`;

      contract.contract_pdf = downloadableUrl;
      await contract.save();
    }

    return {
      message: "Contract signed successfully",
      updatedFields: {
        owner_signature: contract.owner_signature,
        owner_witness_name: contract.owner_witness_name,
        owner_witness_signature: contract.owner_witness_signature,
        tenant_signature: contract.tenant_signature,
        tenant_witness_name: contract.tenant_witness_name,
        tenant_witness_signature: contract.tenant_witness_signature,
        status: contract.status,
        contract_pdf: contract.contract_pdf || null,
      },
    };
  } catch (error) {
    throw new AppError("Failed to sign contract", 500, {
      details: error.message,
    });
  }
};

const getContractTermsService = async (ownerId, contractId) => {
  try {
    const contract = await Contract.findOne({
      where: {
        contract_id: contractId,
        owner_id: ownerId,
      },
    });

    if (!contract) {
      throw new AppError("Contract not found", 404);
    }

    const contractTerms = await ContractAdditionalTerms.findAll({
      where: { contract_id: contractId },
    });

    return { contract, contractTerms };
  } catch (error) {
    throw new AppError("Failed to generate contract preview", 500, {
      details: error.message,
    });
  }
};

const updateContractTerm = async (ownerId, contractId, termId, term) => {
  try {
    let result;

    // Validate and fetch the contract
    const contract = await Contract.findOne({
      where: {
        contract_id: contractId,
        owner_id: ownerId,
      },
    });

    if (contract.status != "partialy signed") {
      throw new AppError("Signed contract cant be changed", 404);
    }
    if (!contract) {
      throw new AppError("Contract not found", 404);
    }

    if (termId) {
      // Check if the term exists before updating
      const existingTerm = await ContractAdditionalTerms.findOne({
        where: { id: termId, contract_id: contractId },
      });

      if (!existingTerm) {
        throw new AppError("Term not found with the specified ID.", 404);
      }

      // Update the existing term
      const [rowsUpdated] = await ContractAdditionalTerms.update(
        { term },
        { where: { id: termId, contract_id: contractId } }
      );

      if (rowsUpdated === 0) {
        throw new AppError("Update failed for the specified term.", 500);
      }

      result = { message: "Term updated successfully", termId };
    } else {
      // If no termId is provided, create a new term
      const newTerm = await ContractAdditionalTerms.create({
        contract_id: contractId,
        term: term,
      });

      result = { message: "New term added successfully", newTerm };
    }

    return result;
  } catch (error) {
    throw new AppError("Failed to update contract term", 500, {
      details: error.message,
    });
  }
};

const deleteContractService = async (contractId, userId) => {
  try {
    // Fetch the contract
    const contract = await Contract.findOne({ where: { contract_id: contractId } });

    if (!contract) {
      throw new AppError("Contract not found", 404);
    }

    // Verify that the user is the owner of the contract
    if (contract.owner_id !== userId) {
      throw new AppError("Only the owner can delete the contract", 403);
    }

    // Check if the contract is signed
    if (contract.status === "signed") {
      // Reset tenant_id and mark_as_rented in the Property table
      await Property.update(
        { tenant_id: null, mark_as_rented: 0 },
        { where: { property_id: contract.property_id } }
      );
      }

    // Delete the contract
    await Contract.destroy({ where: { contract_id: contractId } });

    return {
      success: true,
      message: "Contract deleted successfully, and property updated",
    };
  } catch (error) {
    throw new AppError("Failed to delete contract", 500, {
      details: error.message,
    });
  }
};


module.exports = {
  createContract,
  previewContractService,
  signContractService,
  getContractTermsService,
  updateContractTerm,
  deleteContractService
};
