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
const firebase_config_1 = require("../../config/firebase-config");
let ToolService = class ToolService {
    constructor() {
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
            query = query
                .where('name', '>=', toolList.name)
                .where('name', '<', toolList.name + 'z');
        }
        if (toolList.category) {
            const category = toolList.category;
            const categoryQueries = [
                query.where('category1', '==', category),
                query.where('category2', '==', category),
                query.where('category3', '==', category),
            ];
            const queryResults = await Promise.all(categoryQueries.map((q) => q.get()));
            const allDocs = queryResults.flatMap((snapshot) => snapshot.docs);
            const uniqueDocs = Array.from(new Set(allDocs.map((doc) => doc.id))).map((id) => allDocs.find((doc) => doc.id === id));
            const totalCount = uniqueDocs.length;
            const limit = toolList.limit ? toolList.limit : 10;
            const offset = toolList.offset ? toolList.offset : 0;
            const paginatedDocs = uniqueDocs.slice(offset, offset + limit);
            const toolsList = paginatedDocs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return {
                data: toolsList,
                pagination: {
                    limit: toolList.limit,
                    offset: toolList.offset,
                    count: totalCount,
                },
            };
        }
        const limit = toolList.limit ? toolList.limit : 10;
        const offset = toolList.offset ? toolList.offset : 0;
        const countSnapshot = await query.get();
        const totalCount = countSnapshot.size;
        const toolsSnapshot = await query.limit(limit).offset(offset).get();
        if (toolsSnapshot.empty) {
            return {
                data: [],
                pagination: {
                    limit: toolList.limit,
                    offset: toolList.offset,
                    count: 0,
                },
            };
        }
        const toolsList = toolsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return {
            data: toolsList,
            pagination: {
                limit: toolList.limit,
                offset: toolList.offset,
                count: totalCount,
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
        if (lat !== null && lng !== null) {
            return true;
        }
        if (lat === null && lng !== null) {
            return false;
        }
        if (lat !== null && lng === null) {
            return false;
        }
    }
};
exports.ToolService = ToolService;
exports.ToolService = ToolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ToolService);
//# sourceMappingURL=tool.service.js.map