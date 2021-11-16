import express from "express";
import { Violation } from "../db/model/Violation";

const router = express.Router();

router.get("/", async (req, res) => {
  const violations = await Violation.query().select().orderBy("created_at");
  res.send({ violations });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const violation = await Violation.query().findById(id).first();

  res.send({ violation });
});

router.post("/", async (req, res) => {
  const violation = req.body.violation;

  const newViolation = await Violation.query()
    .insert({
      license: violation.license,
      address: violation.address,
      violation: violation.violation,
    })
    .returning("*");

  res.send({ violation: newViolation });
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const violation = req.body.violation;

  const updateViolation = await Violation.query()
    .update({
      deleted: violation.deleted,
    })
    .where({ id })
    .returning("*")
    .first();

  res.send("Violation Deleted Successfully");
});

router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const violation = req.body.violation;

  const updateViolation = await Violation.query()
    .update({
      license: violation.license,
      address: violation.address,
      violation: violation.violation,
    })
    .where({ id })
    .returning("*")
    .first();

  res.send({ violation: updateViolation });
});

// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;
//   await Violation.query().deleteById(id);
//   res.send("Violation Deleted Successfully");
// });

export default router;
