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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../core-modules/auth/auth.service");
const firebase_config_1 = require("../../config/firebase-config");
let ToolService = class ToolService {
    constructor(authService) {
        this.authService = authService;
        this.categoriesCollection = firebase_config_1.db.collection('categories');
        this.toolsCollection = firebase_config_1.db.collection('tools');
    }
    async create(createToolDto) {
        const toolDoc = this.toolsCollection.doc();
        await toolDoc.set({
            ...createToolDto,
            createdOn: new Date().toISOString(),
        });
        return { id: toolDoc.id, ...createToolDto };
    }
    async getTool(id) {
        const toolDoc = await this.toolsCollection.doc(id).get();
        if (!toolDoc.exists) {
            throw new common_1.NotFoundException('Tool not found');
        }
        return toolDoc.data();
    }
    async getTools(paginationDto) {
        try {
            const toolsSnapshot = await this.toolsCollection
                .limit(paginationDto.limit)
                .offset(paginationDto.offset)
                .get();
            if (toolsSnapshot.empty) {
                throw new common_1.NotFoundException('Tools not found');
            }
            const toolsList = toolsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const totalTools = (await this.toolsCollection.get()).size;
            return {
                data: toolsList,
                pagination: {
                    limit: paginationDto.limit,
                    offset: paginationDto.offset,
                    count: totalTools,
                },
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getCategoriesList() {
        const snapshot = await this.toolsCollection.get();
        const category1Set = new Set();
        const category2Set = new Set();
        const category3Set = new Set();
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.category1)
                category1Set.add(data.category1);
            if (data.category2)
                category2Set.add(data.category2);
            if (data.category3)
                category3Set.add(data.category3);
        });
        const category1 = Array.from(category1Set);
        const category2 = Array.from(category2Set);
        const category3 = Array.from(category3Set);
        return { category1, category2, category3 };
    }
    async findTool(toolId) {
        const toolDoc = await this.toolsCollection.where('id', '==', toolId).get();
        if (toolDoc.empty) {
            throw new common_1.NotFoundException(`Tool Not found.`);
        }
        return toolDoc;
    }
};
exports.ToolService = ToolService;
exports.ToolService = ToolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ToolService);
//# sourceMappingURL=tool.service.js.map