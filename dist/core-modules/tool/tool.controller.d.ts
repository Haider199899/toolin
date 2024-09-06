import { ToolService } from './tool.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateToolDTO } from './dto/create-tool.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.response';
export declare class ToolController {
    private toolService;
    constructor(toolService: ToolService);
    createTool(createToolDto: CreateToolDTO): Promise<{
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
    getCategoriesList(): Promise<object[]>;
    getToolById(id: string): Promise<FirebaseFirestore.DocumentData>;
    getTools(category: string): Promise<{
        id: string;
    }[]>;
    createCategories(categories: CreateCategoryDto[]): Promise<SuccessMessageResponse>;
}
