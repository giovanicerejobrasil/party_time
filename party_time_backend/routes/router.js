const router = require("express").Router();

const serviceRouter = require("./services");
const partyRouter = require("./parties");

router.use("/", serviceRouter);
router.use("/", partyRouter);

module.exports = router;
