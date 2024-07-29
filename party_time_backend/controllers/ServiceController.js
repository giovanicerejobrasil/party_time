const { Service: ServiceModel } = require("../models/Service");

const ServiceController = {
  create: async (req, res) => {
    try {
      const service = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const response = await ServiceModel.create(service);

      res
        .status(201)
        .json({ response, message: "Service created with success!" });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const services = await ServiceModel.find();

      res.status(200).json(services);
    } catch (error) {
      console.log(error);
    }
  },

  get: async (req, res) => {
    try {
      const id = req.params.id;

      const service = await ServiceModel.findById(id);

      if (!service) {
        res.status(404).json({ message: `No Service ID: ${id} found` });
        return;
      }

      res.status(200).json(service);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const service = await ServiceModel.findById(id);

      if (!service) {
        res.status(404).json({ message: `No Service ID: ${id} found` });
        return;
      }

      const deletedService = await ServiceModel.findByIdAndDelete(id);

      res.status(200).json({
        deletedService,
        message: `Service ID: ${id} deleted with success`,
      });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const service = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const updatedService = await ServiceModel.findByIdAndUpdate(id, service);

      if (!updatedService) {
        res.status(404).json({ message: `No Service ID: ${id} found` });
        return;
      }

      res.status(200).json({
        service,
        message: `Service ID: ${id} updated with success`,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = ServiceController;
