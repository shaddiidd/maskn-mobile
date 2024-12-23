const mergeTerms = async (additionalTerms) => {
    const defaultTerms = await ContractTerm.findAll({ attributes: ["term"] });
    const defaultTermsArray = defaultTerms.map((term) => term.term);
    return [...defaultTermsArray, ...(additionalTerms || [])];
};
const fetchData = async (model, id, include = [], errorMessage) => {
    const data = await model.findByPk(id, { include });
    if (!data) {
      throw new Error(errorMessage);
    }
    return data;
  };
module.exports = {mergeTerms, fetchData}
