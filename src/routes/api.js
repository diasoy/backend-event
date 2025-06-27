"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const acl_middleware_1 = __importDefault(require("../middlewares/acl.middleware"));
const constant_1 = require("../utils/constant");
const media_middleware_1 = __importDefault(require("../middlewares/media.middleware"));
const media_controller_1 = __importDefault(require("../controllers/media.controller"));
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const region_controller_1 = __importDefault(require("../controllers/region.controller"));
const event_controller_1 = __importDefault(require("../controllers/event.controller"));
const ticket_controller_1 = __importDefault(require("../controllers/ticket.controller"));
const banner_controller_1 = __importDefault(require("../controllers/banner.controller"));
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const router = express_1.default.Router();
router.post("/auth/register", auth_controller_1.default.register
/*
#swagger.tags = ['Auth']
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/RegisterRequest"
  }
}
*/
);
router.post("/auth/login", auth_controller_1.default.login
/*
#swagger.tags = ['Auth']
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/LoginRequest"
  }
}
*/
);
router.get("/auth/me", auth_middleware_1.default, auth_controller_1.default.me
/*
#swagger.tags = ['Auth']
#swagger.security = [{
  "bearerAuth": {}
}]
*/
);
router.post("/auth/activation", auth_controller_1.default.activation
/*
#swagger.tags = ['Auth']
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/ActivationRequest"
  }
}
*/
);
router.put("/auth/update-profile", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.MEMBER])], auth_controller_1.default.updateProfile
/*
#swagger.tags = ['Auth']
#swagger.security = [{
  "bearerAuth": {}
}]
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/UpdateProfileRequest"
  }
}
*/
);
router.put("/auth/update-password", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.MEMBER])], auth_controller_1.default.updatePassword
/*
#swagger.tags = ['Auth']
#swagger.security = [{
  "bearerAuth": {}
}]
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/UpdatePasswordRequest"
  }
}
*/
);
router.post("/orders", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.MEMBER])], order_controller_1.default.create
/*
#swagger.tags = ['Order']
#swagger.security = [{
  "bearerAuth": ""
}]
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/CreateOrderRequest"
  }
}
*/
);
router.get("/orders", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], order_controller_1.default.findAll
/*
#swagger.tags = ['Order']
#swagger.security = [{
  "bearerAuth": ""
}]
*/
);
router.get("/orders/:orderId", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN, constant_1.ROLES.MEMBER])], order_controller_1.default.findOne
/*
#swagger.tags = ['Order']
#swagger.security = [{
  "bearerAuth": ""
}]
*/
);
router.put("/orders/:orderId/completed", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.MEMBER])], order_controller_1.default.complete
/*
#swagger.tags = ['Order']
#swagger.security = [{
  "bearerAuth": ""
}]
*/
);
router.put("/orders/:orderId/pending", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], order_controller_1.default.pending
/*
#swagger.tags = ['Order']
#swagger.security = [{
  "bearerAuth": ""
}]
*/
);
router.put("/orders/:orderId/cancelled", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], order_controller_1.default.cancelled
/*
#swagger.tags = ['Order']
#swagger.security = [{
  "bearerAuth": ""
}]
*/
);
router.get("/orders-history", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.MEMBER])], order_controller_1.default.findAllByMember
/*
#swagger.tags = ['Order']
#swagger.security = [{
  "bearerAuth": ""
}]
*/
);
router.delete("/orders/:orderId", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], order_controller_1.default.remove
/*
#swagger.tags = ['Order']
#swagger.security = [{
  "bearerAuth": ""
}]
*/
);
router.post("/banners", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], banner_controller_1.default.create
/*
#swagger.tags = ['Banners']
#swagger.security = [{
  "bearerAuth": {}
}]
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/CreateBannerRequest"
  }
}
*/
);
router.get("/banners", banner_controller_1.default.findAll
/*
#swagger.tags = ['Banners']
*/
);
router.get("/banners/:id", banner_controller_1.default.findOne
/*
#swagger.tags = ['Banners']
*/
);
router.put("/banners/:id", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], banner_controller_1.default.update
/*
#swagger.tags = ['Banners']
#swagger.security = [{
  "bearerAuth": {}
}]
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/CreateBannerRequest"
  }
}
*/
);
router.delete("/banners/:id", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], banner_controller_1.default.remove
/*
#swagger.tags = ['Banners']
#swagger.security = [{
  "bearerAuth": {}
}]
*/
);
router.post("/tickets", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], ticket_controller_1.default.create
/*
#swagger.tags = ['Tickets']
#swagger.security = [{
  "bearerAuth": {}
}]
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/CreateTicketRequest"
  }
}
*/
);
router.get("/tickets", ticket_controller_1.default.findAll
/*
#swagger.tags = ['Tickets']
*/
);
router.get("/tickets/:id", ticket_controller_1.default.findOne
/*
#swagger.tags = ['Tickets']
*/
);
router.put("/tickets/:id", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], ticket_controller_1.default.update
/*
#swagger.tags = ['Tickets']
#swagger.security = [{
  "bearerAuth": {}
}]
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/CreateTicketRequest"
  }
}
*/
);
router.delete("/tickets/:id", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], ticket_controller_1.default.remove
/*
#swagger.tags = ['Tickets']
#swagger.security = [{
  "bearerAuth": {}
}]
*/
);
router.get("/tickets/:eventId/events", ticket_controller_1.default.findAllByEvent
/*
#swagger.tags = ['Tickets']
*/
);
router.post("/category", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], category_controller_1.default.create
/*
#swagger.tags = ['Category']
#swagger.security = [{
  "bearerAuth": {}
}]
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/CreateCategoryRequest"
  }
}
*/
);
router.get("/category", category_controller_1.default.findAll
/*
#swagger.tags = ['Category']
*/
);
router.get("/category/:id", category_controller_1.default.findOne
/*
#swagger.tags = ['Category']
*/
);
router.put("/category/:id", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], category_controller_1.default.update
/*
#swagger.tags = ['Category']
#swagger.security = [{
  "bearerAuth": {}
}]
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/CreateCategoryRequest"
  }
}
*/
);
router.delete("/category/:id", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], category_controller_1.default.remove
/*
#swagger.tags = ['Category']
#swagger.security = [{
  "bearerAuth": {}
}]
*/
);
router.post("/events", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], event_controller_1.default.create
/*
#swagger.tags = ['Events']
#swagger.security = [{
  "bearerAuth": {}
}]
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/CreateEventRequest"
  }
}
*/
);
router.get("/events", event_controller_1.default.findAll
/*
#swagger.tags = ['Events']
#swagger.parameters['limit'] = {
  in: 'query',
  type: 'number',
  default: 10
}
#swagger.parameters['page'] = {
  in: 'query',
  type: 'number',
  default: 1
}
#swagger.parameters['category'] = {
  in: 'query',
  type: 'string'
}
#swagger.parameters['isOnline'] = {
  in: 'query',
  type: 'boolean'
}
#swagger.parameters['isPublish'] = {
  in: 'query',
  type: 'boolean'
}
#swagger.parameters['isFeatured'] = {
  in: 'query',
  type: 'boolean'
}
*/
);
router.get("/events/:id", event_controller_1.default.findOne
/*
#swagger.tags = ['Events']
*/
);
router.put("/events/:id", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], event_controller_1.default.update
/*
#swagger.tags = ['Events']
#swagger.security = [{
  "bearerAuth": {}
}]
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/CreateEventRequest"
  }
}
*/
);
router.delete("/events/:id", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN])], event_controller_1.default.remove
/*
#swagger.tags = ['Events']
#swagger.security = [{
  "bearerAuth": {}
}]
*/
);
router.get("/events/:slug/slug", event_controller_1.default.findOneBySlug
/*
#swagger.tags = ['Events']
*/
);
router.get("/regions", region_controller_1.default.getAllProvinces
/*
#swagger.tags = ['Regions']
*/
);
router.get("/regions/:id/province", region_controller_1.default.getProvince
/*
#swagger.tags = ['Regions']
*/
);
router.get("/regions/:id/regency", region_controller_1.default.getRegency
/*
#swagger.tags = ['Regions']
*/
);
router.get("/regions/:id/district", region_controller_1.default.getDistrict
/*
#swagger.tags = ['Regions']
*/
);
router.get("/regions/:id/village", region_controller_1.default.getVillage
/*
#swagger.tags = ['Regions']
*/
);
router.get("/regions-search", region_controller_1.default.findByCity
/*
#swagger.tags = ['Regions']
*/
);
router.post("/media/upload-single", [
    auth_middleware_1.default,
    (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN, constant_1.ROLES.MEMBER]),
    media_middleware_1.default.single("file"),
], media_controller_1.default.single
/*
#swagger.tags = ['Media']
#swagger.security = [{
  "bearerAuth": {}
}]
#swagger.requestBody = {
  required: true,
  content: {
    "multipart/form-data": {
      schema: {
        type: "object",
        properties: {
          file: {
            type: "string",
            format: "binary"
          }
        }
      }
    }
  }
}
*/
);
router.post("/media/upload-multiple", [
    auth_middleware_1.default,
    (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN, constant_1.ROLES.MEMBER]),
    media_middleware_1.default.multiple("files"),
], media_controller_1.default.multiple
/*
#swagger.tags = ['Media']
#swagger.security = [{
  "bearerAuth": {}
}]
#swagger.requestBody = {
  required: true,
  content: {
    "multipart/form-data": {
      schema: {
        type: "object",
        properties: {
          files: {
            type: "array",
            items: {
              type: "string",
              format: "binary"
            }
          }
        }
      }
    }
  }
}
*/
);
router.delete("/media/remove", [auth_middleware_1.default, (0, acl_middleware_1.default)([constant_1.ROLES.ADMIN, constant_1.ROLES.MEMBER])], media_controller_1.default.remove
/*
#swagger.tags = ['Media']
#swagger.security = [{
  "bearerAuth": {}
}]
#swagger.requestBody = {
  required: true,
  schema: {
    $ref: "#/components/schemas/RemoveMediaRequest"
  }
}
*/
);
// Webhook endpoint for Midtrans payment notifications (no auth required)
router.post("/payment/webhook", order_controller_1.default.webhook
/*
#swagger.tags = ['Payment']
#swagger.requestBody = {
  required: true,
  schema: {
    order_id: "string",
    transaction_status: "string",
    fraud_status: "string"
  }
}
*/
);
exports.default = router;
