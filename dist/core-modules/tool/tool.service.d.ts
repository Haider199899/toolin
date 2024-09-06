import { AuthService } from '../../core-modules/auth/auth.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateToolDTO } from './dto/create-tool.dto';
export declare class ToolService {
    private readonly authService;
    private categoriesCollection;
    private toolsCollection;
    constructor(authService: AuthService);
    create(createToolDto: CreateToolDTO): Promise<{
        brand: string;
        model: string;
        name: string;
        images: string[];
        category: string;
        condition: string;
        marketValue: string;
        priceDaily: string;
        priceMonthly: string;
        priceWeekly: string;
        id: string;
    }>;
    getTool(id: string): Promise<FirebaseFirestore.DocumentData>;
    getTools(category: string): Promise<{
        id: string;
    }[]>;
    createCategories(categories: CreateCategoryDto[]): Promise<void>;
    getCategoriesList(): Promise<object[]>;
    findTool(toolId: string): Promise<any>;
}
