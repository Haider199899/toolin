"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolController = void 0;
const common_1 = require("@nestjs/common");
const tool_service_1 = require("./tool.service");
const swagger_1 = require("@nestjs/swagger");
const create_tool_dto_1 = require("./dto/create-tool.dto");
const get_tools_response_type_1 = require("./types/get-tools-response.type");
const pagination_dto_1 = require("../../shared/dtos/pagination-dto");
let ToolController = class ToolController {
    constructor(toolService) {
        this.toolService = toolService;
    }
    async createTool(createToolDto) {
        return this.toolService.create(createToolDto);
    }
    async getCategoriesList() {
        return this.toolService.getCategoriesList();
    }
    async getToolById(id) {
        return this.toolService.getTool(id);
    }
    async getTools(toolList) {
        return this.toolService.getTools(toolList);
    }
};
exports.ToolController = ToolController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new tool' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The tool has been successfully created.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tool_dto_1.CreateToolDTO]),
    __metadata("design:returntype", Promise)
], ToolController.prototype, "createTool", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Get categories list' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List all categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ToolController.prototype, "getCategoriesList", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a tool by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tool found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tool not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ToolController.prototype, "getToolById", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get a list of tools' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Tools retrieved successfully.',
        type: get_tools_response_type_1.ToolListResponseType,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ToolController.prototype, "getTools", null);
exports.ToolController = ToolController = __decorate([
    (0, swagger_1.ApiTags)('Tool'),
    (0, common_1.Controller)('tool'),
    __metadata("design:paramtypes", [tool_service_1.ToolService])
], ToolController);
//# sourceMappingURL=tool.controller.js.map