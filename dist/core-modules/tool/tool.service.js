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
    async getTools(toolList) {
        let query = this.toolsCollection;
        if (toolList.lat !== null || toolList.lng !== null) {
            const hasLocation = this.isLocationProvided(toolList.lat, toolList.lng);
            if (hasLocation) {
                query = query
                    .where('_geoloc.lat', '==', toolList.lat)
                    .where('_geoloc.lng', '==', toolList.lng);
            }
            else {
                throw new common_1.BadRequestException('Both lat and lng must be provided together.');
            }
        }
        if (toolList.name) {
            query = query.where('name', '==', toolList.name);
        }
        if (toolList.category1) {
            query = query.where('category1', '==', toolList.category1);
        }
        if (toolList.category2) {
            query = query.where('category2', '==', toolList.category2);
        }
        if (toolList.category3) {
            query = query.where('category3', '==', toolList.category3);
        }
        const toolsSnapshot = await query.get();
        if (toolsSnapshot.empty) {
            throw new common_1.NotFoundException('Tools not found');
        }
        const totalTools = toolsSnapshot.size;
        const paginatedQuery = query
            .limit(toolList.limit)
            .offset(toolList.offset);
        const paginatedSnapshot = await paginatedQuery.get();
        const toolsList = paginatedSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return {
            data: toolsList,
            pagination: {
                limit: toolList.limit,
                offset: toolList.offset,
                count: totalTools,
            },
        };
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
    isLocationProvided(lat, lng) {
        console.log('xxx');
        if (lat !== null && lng !== null) {
            console.log('1');
            return true;
        }
        if (lat === null && lng !== null) {
            console.log('2');
            return false;
        }
        if (lat !== null && lng === null) {
            console.log('3');
            return false;
        }
    }
};
exports.ToolService = ToolService;
exports.ToolService = ToolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ToolService);
//# sourceMappingURL=tool.service.js.map