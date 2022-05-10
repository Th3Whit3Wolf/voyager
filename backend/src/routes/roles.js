import { Router } from "express";
import { RoleController } from "../controllers";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: User authorization
 */

/**
 * @swagger
 * definitions:
 *   AllRoles:
 *     type: object
 *     properties:
 *       pagination:
 *         type: object
 *         properties:
 *           page:
 *             type: integer
 *             format: int32
 *           limit:
 *             type: integer
 *             format: int32
 *           total:
 *             type: integer
 *             format: int32
 *       data:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               format: int32
 *             kind:
 *               type: string
 *               enum: [SITE_ADMIN, INSTALLATION_ADMIN, COMMAND_ADMIN, DELTA_ADMIN, SQUADRON_ADMIN, TASK_APPROVER, USER]
 */

/**
 * @swagger
 * definitions:
 *   RoleAdded:
 *     type: object
 *     properties:
 *       data:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *             format: int32
 *           kind:
 *             type: string
 *             enum: [SITE_ADMIN, INSTALLATION_ADMIN, COMMAND_ADMIN, DELTA_ADMIN, SQUADRON_ADMIN, TASK_APPROVER, USER]
 *           createdAt:
 *             type: string
 *           updatedAt:
 *             type: string
 */

/**
 * @swagger
 * definitions:
 *   RolesIndvidual:
 *     type: object
 *     properties:
 *       data:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *             format: int32
 *           kind:
 *             type: string
 *             enum: [SITE_ADMIN, INSTALLATION_ADMIN, COMMAND_ADMIN, DELTA_ADMIN, SQUADRON_ADMIN, TASK_APPROVER, USER]
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     tags:
 *     - Roles
 *     description: Returns list of roles
 *     parameters:
 *     - in: query
 *       name: id
 *       type: integer
 *       format: int64
 *       description: Role ID
 *     - in: query
 *       name: kind
 *       type: string
 *       enum: [SITE_ADMIN, INSTALLATION_ADMIN, COMMAND_ADMIN, DELTA_ADMIN, SQUADRON_ADMIN, TASK_APPROVER, USER]
 *       description: Role kind
 *     - in: query
 *       name: limit
 *       type: integer
 *       description: The numbers of items to return
 *     - in: query
 *       name: page
 *       type: integer
 *       description: The page number to return
 *     responses:
 *       200:
 *         description: All roles
 *         schema:
 *           $ref: '#/definitions/AllRoles'
 *   post:
 *     tags:
 *     - Roles
 *     description: Add a new role
 *     responses:
 *       201:
 *         description: New role added
 *         schema:
 *           $ref: '#/definitions/RoleAdded'
 */
router.route("/roles").get(RoleController.list).post(RoleController.create);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     tags:
 *     - Roles
 *     description: Returns individual role
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Role ID
 *       required: true
 *       type: integer
 *       format: int64
 *     responses:
 *       200:
 *         description: role with id
 *         schema:
 *           $ref: '#/definitions/RolesIndvidual'
 *   put:
 *     tags:
 *     - Roles
 *     description: Update a current role
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Role ID
 *       required: true
 *       type: integer
 *       format: int64
 *     responses:
 *       202:
 *         description: Updated role
 *         schema:
 *           $ref: '#/definitions/RoleAdded'
 *   delete:
 *     tags:
 *     - Roles
 *     description: Delete role
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Role ID
 *       required: true
 *       type: integer
 *       format: int64
 *     responses:
 *       204:
 *         description: Deleted role
 */
router
	.route("/roles/:id")
	.get(RoleController.get)
	.put(RoleController.update)
	.delete(RoleController.delete);

export default router;
