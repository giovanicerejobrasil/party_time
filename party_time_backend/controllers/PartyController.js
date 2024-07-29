const PartyModel = require("../models/Party");

const checkPartyBudget = (budget, services) => {
  const priceSum = services.reduce((sum, service) => sum + service.price, 0);

  return budget > priceSum;
};

const PartyController = {
  create: async (req, res) => {
    try {
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };

      // IF BUDGET < VALOR DOS SERVIÇOS => FESTA NÃO PODE SER CRIADA
      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(406).json({
          message: "Your budget is insufficient to create this Party",
        });
      }

      const response = await PartyModel.create(party);

      res
        .status(201)
        .json({ response, message: "Party created with success!" });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const parties = await PartyModel.find();

      res.status(200).json(parties);
    } catch (error) {
      console.log(error);
    }
  },

  get: async (req, res) => {
    try {
      const id = req.params.id;

      const party = await PartyModel.findById(id);

      if (!party) {
        res.status(404).json({ message: `No Party ID: ${id} found` });
        return;
      }

      res.status(200).json(party);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const deletedParty = await PartyModel.findByIdAndDelete(id);

      if (!deletedParty) {
        res.status(404).json({ message: `No Party ID: ${id} found` });
        return;
      }

      res.status(200).json({
        deletedParty,
        message: `Party ID: ${id} deleted with success`,
      });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };

      // IF BUDGET < VALOR DOS SERVIÇOS => FESTA NÃO PODE SER CRIADA
      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(406).json({
          message: "Your new budget is insufficient to updated this Party",
        });
        return;
      }

      const updatedParty = await PartyModel.findByIdAndUpdate(id, party);

      if (!updatedParty) {
        res.status(404).json({ message: `No Party ID: ${id} found` });
        return;
      }

      res.status(200).json({
        party,
        message: `Party ID: ${id} updated with success`,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = PartyController;
