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
const tracking_fields_1 = require("../../shared/utils/tracking-fields");
let ToolService = class ToolService {
    constructor(authService) {
        this.authService = authService;
        this.categoriesCollection = firebase_config_1.db.collection("categories");
        this.toolsCollection = firebase_config_1.db.collection('tools');
    }
    async create(createToolDto) {
        const categorySnapShot = await this.categoriesCollection
            .where('name', '==', createToolDto.category).limit(1)
            .get();
        if (categorySnapShot.empty) {
            throw new common_1.NotFoundException('category not found!');
        }
        const doc = categorySnapShot.docs[0];
        const additionalParameters = {
            categoryId: doc.id,
            ...tracking_fields_1.trackingDates
        };
        const toolDoc = this.toolsCollection.doc();
        await toolDoc.set({ ...createToolDto, ...additionalParameters });
        return { id: toolDoc.id, ...createToolDto };
    }
    async getTool(id) {
        const toolDoc = await this.toolsCollection.doc(id).get();
        if (!toolDoc.exists) {
            throw new common_1.NotFoundException('Tool not found');
        }
        return toolDoc.data();
    }
    async getTools(category) {
        const toolsSnapshot = await this.toolsCollection.where('category', '==', category).get();
        if (toolsSnapshot.empty) {
            throw new common_1.NotFoundException('Tools not found');
        }
        return toolsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async createCategories(categories) {
        const batch = firebase_config_1.db.batch();
        for (const category of categories) {
            const existingCategory = await this.categoriesCollection
                .where('name', '==', category.name)
                .get();
            if (!existingCategory.empty) {
                continue;
            }
            const categoryRef = this.categoriesCollection.doc();
            batch.set(categoryRef, { ...category, ...tracking_fields_1.trackingDates });
        }
        await batch.commit();
    }
    async getCategoriesList() {
        const snapshot = await this.categoriesCollection.get();
        const categories = [];
        snapshot.forEach(doc => {
            categories.push({ id: doc.id, ...doc.data() });
        });
        return categories;
    }
    async findTool(toolId) {
        const toolDoc = await this.toolsCollection
            .where('id', '==', toolId)
            .get();
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