const router = require("express").Router();

const PartyController = require("../controllers/PartyController");

router.route("/parties").post((req, res) => PartyController.create(req, res));

router.route("/parties").get((req, res) => PartyController.getAll(req, res));

router.route("/parties/:id").get((req, res) => PartyController.get(req, res));

router
  .route("/parties/:id")
  .delete((req, res) => PartyController.delete(req, res));

router
  .route("/parties/:id")
  .put((req, res) => PartyController.update(req, res));

module.exports = router;
